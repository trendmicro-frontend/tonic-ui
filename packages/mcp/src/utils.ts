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
  resourceType: 'doc' | 'page' | 'code' = 'doc',
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
 * Common method to process multiple URLs and combine content
 */
export async function processUrls(
  urls: string[],
  { resourceType, allowedDomains, rootPath }: { resourceType: string, allowedDomains: string[], rootPath: string }
): Promise<{ contents: string[]; errors: string[] }> {
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
