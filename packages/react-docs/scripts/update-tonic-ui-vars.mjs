import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import _ from 'lodash';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const args = process.argv.slice(2);
const source = args[0];
const target = args[1];

const vars = _.reduce(process.env, (acc, value, key) => {
  if (key.startsWith('TONIC_UI_')) {
    acc[key] = value;
  }
  return acc;
}, {});

// Load version config
const versionConfigPath = path.resolve(__dirname, '../../../tonic-ui-version.config.js');
const versionConfig = await import(`file://${versionConfigPath}`).then(m => m.default);

// Generate released versions (all versions, checkmark only for stable)
const generateReleasedVersions = () => {
  const rows = versionConfig.versions
    .map(({ label, stable }) => {
      const TONIC_UI_VERSION_PREFIX = `TONIC_UI_${label.toUpperCase()}`;
      const stableIndicator = stable ? ' ✓' : '';
      return `    <TableRow>
      <TableCell>
        <Text><Link href="__${TONIC_UI_VERSION_PREFIX}_SOURCE_URL__" target="_blank">__${TONIC_UI_VERSION_PREFIX}_LABEL__</Link>${stableIndicator}</Text>
      </TableCell>
      <TableCell>
        <Link href="__${TONIC_UI_VERSION_PREFIX}_DOCUMENTATION__" target="_blank">Documentation</Link>
      </TableCell>
      <TableCell>
        <Link href="__${TONIC_UI_VERSION_PREFIX}_CHANGELOG__" target="_blank">Changelog</Link>
      </TableCell>
    </TableRow>`;
    }).join('\n');

  return `<Table>
  <TableBody>
${rows}
  </TableBody>
</Table>`;
};

try {
  const originalContent = fs.readFileSync(source, 'utf8');
  let output = originalContent;

  // Replace placeholders
  output = output.replace('__RELEASED_VERSIONS__', generateReleasedVersions());

  // Replace standard variables
  for (const [key, value] of Object.entries(vars)) {
    const pattern = new RegExp(`__${key}__`, 'g');
    output = output.replace(pattern, value);
  }

  if (target) {
    fs.writeFileSync(target, output, 'utf8');
  } else {
    console.log(output);
  }
} catch (err) {
  console.error(err);
}
