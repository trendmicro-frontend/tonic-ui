import { spawn } from 'node:child_process';
import { createHash } from 'node:crypto';
import fs from 'node:fs';
import { createRequire } from 'node:module';
import net from 'node:net';
import os from 'node:os';
import path from 'node:path';

// Two Next.js dev servers that share one dist directory corrupt each other's
// webpack cache. The result is a Fast Refresh full-reload loop after any file
// edit. Hold a lock for the lifetime of this server so a second `yarn dev`
// fails with a clear message instead of silently sharing `build/`.
const require = createRequire(import.meta.url);
const args = process.argv.slice(2);
const getPortArgValue = (argv) => {
  for (let index = 0; index < argv.length; index++) {
    const arg = argv[index];
    if (arg === '--port' || arg === '-p') {
      return argv[index + 1];
    }
    if (arg.startsWith('--port=')) {
      return arg.slice('--port='.length);
    }
  }
  return undefined;
};
const explicitPort = getPortArgValue(args);
const hasPortFlag = args.some(arg => arg === '--port' || arg === '-p' || arg.startsWith('--port='));
const hasExplicitPort = explicitPort !== undefined || process.env.PORT !== undefined;
const requestedPort = Number(explicitPort ?? process.env.PORT ?? 3000);

if (hasPortFlag && explicitPort === undefined) {
  console.error('Missing value for --port. Pass --port with a number between 1 and 65535.');
  process.exit(1);
}
const distDir = process.env.TONIC_UI_REACT_DOCS_DIST_DIR || 'build';
const lockDir = path.join(os.tmpdir(), 'tonic-ui-react-docs-dev');
const lockName = createHash('sha256').update(path.resolve(distDir)).digest('hex').slice(0, 12);
const lockFile = path.join(lockDir, `${lockName}.lock`);

const isPortInUse = (port) => new Promise((resolve) => {
  const server = net.createServer();
  server.once('error', () => resolve(true));
  server.once('listening', () => server.close(() => resolve(false)));
  server.listen(port, '0.0.0.0');
});

const findAvailablePort = async (startPort) => {
  for (let candidate = startPort; candidate <= 65535; candidate++) {
    if (!await isPortInUse(candidate)) {
      return candidate;
    }
  }
  throw new Error(`No available port found at or above ${startPort}.`);
};

if (!Number.isInteger(requestedPort) || requestedPort <= 0 || requestedPort > 65535) {
  console.error(`Invalid port "${explicitPort ?? process.env.PORT}". Pass --port with a number between 1 and 65535.`);
  process.exit(1);
}

let port = requestedPort;

if (await isPortInUse(port)) {
  if (hasExplicitPort) {
    console.error(`Port ${port} is already in use. Stop the existing server or pass a different --port.`);
    process.exit(1);
  }

  port = await findAvailablePort(port + 1);
  console.log(`Port ${requestedPort} is in use; using port ${port} instead.`);
}

// Next.js reads the port from argv. Remove any user-supplied port so the
// resolved port (including an auto-selected one) is authoritative.
const getNextArgs = (argv, port) => {
  const nextArgs = [];

  for (let index = 0; index < argv.length; index++) {
    const arg = argv[index];
    if (arg === '--port' || arg === '-p') {
      index++;
      continue;
    }
    if (arg.startsWith('--port=')) {
      continue;
    }
    nextArgs.push(arg);
  }

  nextArgs.push('--port', String(port));
  return nextArgs;
};

const readLockPid = () => {
  try {
    return Number(fs.readFileSync(lockFile, 'utf8'));
  } catch {
    return null;
  }
};

const isProcessAlive = (pid) => {
  if (!Number.isInteger(pid) || pid <= 0) {
    return false;
  }
  try {
    process.kill(pid, 0);
    return true;
  } catch (error) {
    // EPERM means the process exists but belongs to another user.
    return error.code === 'EPERM';
  }
};

fs.mkdirSync(lockDir, { recursive: true });
const existingPid = readLockPid();
if (existingPid && existingPid !== process.pid && isProcessAlive(existingPid)) {
  console.error(`Another Next.js dev server (pid ${existingPid}) is using the "${distDir}" directory.`);
  console.error('Stop it, or set TONIC_UI_REACT_DOCS_DIST_DIR to a unique directory.');
  process.exit(1);
}
fs.writeFileSync(lockFile, String(process.pid));

const cleanup = () => {
  if (readLockPid() === process.pid) {
    fs.rmSync(lockFile, { force: true });
  }
};

const nextCli = require.resolve('next/dist/bin/next');
const child = spawn(process.execPath, [nextCli, 'dev', '--hostname', '0.0.0.0', ...getNextArgs(args, port)], {
  env: { ...process.env, NODE_ENV: 'development' },
  stdio: 'inherit',
});

const forwardSignal = (signal) => {
  if (!child.killed) {
    child.kill(signal);
  }
};
process.once('SIGINT', () => forwardSignal('SIGINT'));
process.once('SIGTERM', () => forwardSignal('SIGTERM'));
process.once('exit', cleanup);

child.once('error', (error) => {
  console.error(error);
  cleanup();
  process.exit(1);
});
child.once('exit', (code, signal) => {
  cleanup();
  process.exit(code ?? (signal ? 1 : 0));
});
