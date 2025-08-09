import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

/**
 * Extracts a string error message from any thrown value.
 */
export function getErrorMessage(error: unknown): string {
  return error instanceof Error ? error.message : String(error);
}

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

/**
 * Load content from a file path with proper error handling.
 * If the filePath points to a directory, try resolving to "index.page.mdx".
 */
async function loadFromFilePath(filePath: string): Promise<string> {
  try {
    const stats = await fs.stat(filePath);
    if (stats.isDirectory()) {
      filePath = path.join(filePath, 'index.page.mdx');
    }

    return await fs.readFile(filePath, 'utf-8');
  } catch (err) {
    throw new Error(`Failed to load content from file path: ${filePath}\n${getErrorMessage(err)}`);
  }
}

/**
 * Common method to process multiple URLs and combine content
 */
export async function processUrls(
  urls: string[],
  { allowedDomains, rootPath }: { allowedDomains: string[], rootPath: string }
): Promise<{ contents: string[]; errors: string[] }> {
  const contents = [];
  const errors = [];

  const _processUrl = (url: string) => {
    const normalizedUrl = url.toLowerCase().trim();

    if (normalizedUrl.startsWith('http://') || normalizedUrl.startsWith('https://')) {
      if (!isAllowedDomain(url, allowedDomains)) {
        throw new Error(`Domain not allowed: ${new URL(url).hostname}`);
      }
      return fetchFromUrl(url);
    }

    if (normalizedUrl.startsWith('file://')) {
      const filePath = fileURLToPath(url);
      return loadFromFilePath(filePath);
    }

    const normalizedPath = path.normalize(url);
    const filePath = path.isAbsolute(normalizedPath)
      ? normalizedPath
      : path.resolve(rootPath, normalizedPath);
    return loadFromFilePath(filePath);
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
