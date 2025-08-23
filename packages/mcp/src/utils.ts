import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

// Define resource type
type ResourceType = 'doc' | 'page' | 'code';

/**
 * Validate if a URL is from an allowed domain
 */
function isAllowedDomain(urlString: string, allowedDomains: string[]): boolean {
  try {
    const urlObj = new URL(urlString);
    return allowedDomains.some((domain: string) => {
      return urlObj.hostname === domain || urlObj.hostname.endsWith('.' + domain);
    });
  } catch {
    return false;
  }
}

/**
 * Fetch content from URL with proper error handling
 */
async function fetchFromUrl(urlString: string): Promise<string> {
  try {
    const response = await fetch(urlString);
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }

    const content = await response.text();
    return content;
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    throw new Error(`Failed to fetch ${urlString}: ${errorMessage}`);
  }
}

async function exists(path: string): Promise<boolean> {
  try {
    await fs.stat(path);
    return true;
  } catch {
    return false;
  }
}

/**
 * Loads file content based on the resource type:
 * - For "doc": reads the file at the given path as plain text.
 * - For "page": if the path is a file, reads it; if a directory, reads "index.page.mdx" inside.
 * - For "code": tries appending common code file extensions to the path and reads the first existing file.
 *
 * Throws an error if no matching file is found or if the resource type is unsupported.
 */
async function loadFromFilePath(
  filePath: string,
  resourceType: ResourceType = 'doc',
): Promise<string> {
  const extensions = ['.js', '.jsx', '.ts', '.tsx'];

  if (resourceType === 'doc') {
    if (await exists(filePath)) {
      return await fs.readFile(filePath, 'utf-8');
    }
    throw new Error(`doc not found: ${filePath}`);
  }

  if (resourceType === 'page') {
    if (await exists(filePath)) {
      const stats = await fs.stat(filePath);
      if (stats.isFile()) {
        return await fs.readFile(filePath, 'utf-8');
      }
      if (stats.isDirectory()) {
        const indexPagePath = path.join(filePath, 'index.page.mdx');
        if (await exists(indexPagePath)) {
          return await fs.readFile(indexPagePath, 'utf-8');
        }
      }
    }
    throw new Error(`page not found: ${filePath}`);
  }

  if (resourceType === 'code') {
    if (await exists(filePath)) {
      return await fs.readFile(filePath, 'utf-8');
    }
    for (const ext of extensions) {
      const candidate = filePath + ext;
      // eslint-disable-next-line no-await-in-loop
      if (await exists(candidate)) {
        // eslint-disable-next-line no-await-in-loop
        return await fs.readFile(candidate, 'utf-8');
      }
    }
    throw new Error(`code not found: ${filePath} with extensions ${extensions.join(', ')}`);
  }

  throw new Error(`Unsupported resourceType: ${resourceType}`);
}

/**
 * Trims trailing slashes and whitespace from a URL.
 * @param url The URL to trim.
 * @returns The trimmed URL.
 */
export function trimTrailingSlashAndWhitespace(url: string | undefined): string {
  if (typeof url !== 'string') {
    return '';
  }
  return url.trimEnd().replace(/\/+$/, '').trimEnd();
}

/**
 * Extracts a string error message from any thrown value.
 * @param error The error to extract the message from.
 * @returns The extracted error message.
 */
export function getErrorMessage(error: unknown): string {
  return error instanceof Error ? error.message : String(error);
}

/**
 * Processes multiple URLs and retrieves their contents, supporting HTTP(S), file URLs,
 * and relative/absolute file paths. Results are aggregated into a single response.
 *
 * @param urls - List of URLs or paths to process.
 * @param [options] - Optional processing settings.
 * @param [options.resourceType] - Type of resource to fetch or load
 * @param [options.allowedDomains] - List of allowed domains
 * @param [options.rootPath] - Root directory for resolving relative file paths.
 * @returns An object containing:
 *   - contents: Array of successfully retrieved contents.
 *   - errors: Array of error messages for failed URLs.
 */
export async function processUrls(
  urls: string[],
  options: {
    resourceType?: ResourceType;
    allowedDomains?: string[];
    rootPath?: string;
  } = {}
): Promise<{ contents: string[]; errors: string[] }> {
  const resourceType = options?.resourceType ?? 'doc';
  const allowedDomains = Array.isArray(options?.allowedDomains) ? options.allowedDomains : [];
  const rootPath = (typeof options?.rootPath === 'string') ? options?.rootPath : '';
  const contents = [];
  const errors = [];

  const _processUrl = async (url: string) => {
    const normalizedUrl = url.toLowerCase().trim();

    if (normalizedUrl.startsWith('http://') || normalizedUrl.startsWith('https://')) {
      if (!isAllowedDomain(url, allowedDomains)) {
        throw new Error(`Domain not allowed: ${new URL(url).hostname}`);
      }
      return await fetchFromUrl(url);
    }

    if (normalizedUrl.startsWith('file://')) {
      const filePath = fileURLToPath(url);
      return await loadFromFilePath(filePath, resourceType);
    }

    const normalizedPath = path.normalize(url);
    const filePath = path.isAbsolute(normalizedPath)
      ? normalizedPath
      : path.resolve(rootPath, normalizedPath);
    return await loadFromFilePath(filePath, resourceType);
  };

  for (const url of urls) {
    let content;
    let error;

    try {
      // eslint-disable-next-line no-await-in-loop
      content = await _processUrl(url);
    } catch (err) {
      error = err;
    }

    if (error) {
      errors.push(`Error processing ${url}: ${getErrorMessage(error)}`);
      continue;
    }

    if (content) {
      contents.push(content);
    }
  }

  return { contents, errors };
}
