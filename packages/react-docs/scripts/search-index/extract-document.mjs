import { fromMarkdown } from 'mdast-util-from-markdown';
import { toString } from 'mdast-util-to-string';
import GithubSlugger from 'github-slugger';
import { SKIP, visit } from 'unist-util-visit';
import { SEARCH_SNIPPET_LENGTH } from '../../search/config.mjs';

/** Headings at this depth or shallower start a new search section. */
const MAX_SECTION_HEADING_DEPTH = 3;

/** Maximum number of characters stored per searchable chunk. */
const MAX_CHUNK_LENGTH = 3000;

const normalizeWhitespace = (value) => {
  return String(value ?? '').replace(/\s+/g, ' ').trim();
};

/**
 * Remove MDX module syntax so the document can be parsed as plain Markdown.
 *
 * Plain Markdown is deliberately used instead of the MDX parser: the docs
 * contain raw HTML that is not always balanced (for example `<dl>` blocks), and
 * search only needs prose. JSX and HTML blocks are skipped during extraction.
 *
 * @param {string} markdown
 * @returns {string}
 */
const stripMdxModuleSyntax = (markdown) => {
  const isImportStart = /^\s*import\s/;
  const isSideEffectImport = /^\s*import\s+['"][^'"]+['"];?\s*$/;
  const hasFromClause = /\bfrom\s+['"]/;
  const lines = [];
  let insideImport = false;

  for (const line of markdown.split('\n')) {
    if (insideImport) {
      if (hasFromClause.test(line)) {
        insideImport = false;
      }
      continue;
    }

    if (isImportStart.test(line)) {
      if (isSideEffectImport.test(line) || hasFromClause.test(line)) {
        continue;
      }
      insideImport = true;
      continue;
    }

    lines.push(line);
  }

  return lines.join('\n');
};

/**
 * Parse an MDX document into an mdast tree.
 *
 * @param {string} markdown
 */
export const parseMdx = (markdown) => {
  return fromMarkdown(stripMdxModuleSyntax(markdown));
};

const collectText = (node) => {
  const parts = [];

  visit(node, (child) => {
    switch (child.type) {
      case 'text':
      case 'inlineCode':
        parts.push(child.value);
        break;
      case 'code':
      case 'html':
      case 'yaml':
      case 'mdxjsEsm':
      case 'mdxFlowExpression':
      case 'mdxTextExpression':
        // Code samples, raw HTML and MDX expressions are not prose.
        return SKIP;
      default:
        break;
    }
    return undefined;
  });

  return normalizeWhitespace(parts.join(' '));
};

const splitIntoChunks = (parts) => {
  const chunks = [];
  let current = '';

  for (const part of parts) {
    if (!part) {
      continue;
    }
    if (current && (current.length + part.length + 1 > MAX_CHUNK_LENGTH)) {
      chunks.push(current);
      current = '';
    }
    if (part.length > MAX_CHUNK_LENGTH) {
      // Extremely long paragraphs are split on word boundaries.
      const words = part.split(' ');
      for (const word of words) {
        if (current && (current.length + word.length + 1 > MAX_CHUNK_LENGTH)) {
          chunks.push(current);
          current = '';
        }
        current = current ? `${current} ${word}` : word;
      }
      continue;
    }
    current = current ? `${current} ${part}` : part;
  }

  if (current) {
    chunks.push(current);
  }

  return chunks;
};

const collectKeywords = ({ title, pageTitle, path, headings, inlineCodeTerms }) => {
  const keywords = new Set();
  const add = (value) => {
    const keyword = normalizeWhitespace(value);
    if (keyword && keyword.length <= 80) {
      keywords.add(keyword);
    }
  };

  add(title);
  add(pageTitle);

  for (const segment of path.split('/')) {
    for (const part of segment.split('-')) {
      add(part);
    }
  }
  for (const term of inlineCodeTerms) {
    add(term);
  }
  for (const heading of headings) {
    add(heading);
  }

  return Array.from(keywords).join(' ');
};

/**
 * Split a parsed MDX document into searchable sections.
 *
 * @param {object} tree
 * @param {{ title: string, path: string, category: string }} metadata
 * @returns {object[]}
 */
export const extractSections = (tree, metadata) => {
  const slugger = new GithubSlugger();
  const headingSlugs = new Map();
  const headings = [];
  const inlineCodeTerms = new Set();
  let pageTitle = '';

  visit(tree, (node) => {
    if (node.type === 'heading') {
      const headingText = normalizeWhitespace(toString(node));
      headingSlugs.set(node, slugger.slug(headingText));
      if (headingText) {
        headings.push(headingText);
      }
    }
    if (node.type === 'inlineCode') {
      inlineCodeTerms.add(node.value);
    }
  });

  const sections = [];
  let current = {
    heading: '',
    anchor: '',
    parts: [],
  };

  const flush = () => {
    const content = normalizeWhitespace(current.parts.join(' '));
    if (!current.heading && !content) {
      return;
    }
    sections.push({
      heading: current.heading,
      anchor: current.anchor,
      chunks: splitIntoChunks(current.parts),
    });
  };

  for (const node of tree.children) {
    if (node.type === 'heading') {
      const headingText = normalizeWhitespace(toString(node));
      if (node.depth === 1) {
        // The page title is rendered by the docs layout, not as a section.
        pageTitle = pageTitle || headingText;
        continue;
      }
      if (node.depth <= MAX_SECTION_HEADING_DEPTH) {
        flush();
        current = {
          heading: headingText,
          anchor: headingSlugs.get(node) ?? '',
          parts: [],
        };
        continue;
      }
      if (headingText) {
        current.parts.push(headingText);
      }
      continue;
    }

    if (node.type === 'paragraph') {
      const raw = normalizeWhitespace(toString(node));
      if (/^\{[\s\S]*\}$/.test(raw) || /^(import|export)\b/.test(raw)) {
        continue;
      }
    }

    const text = collectText(node);
    if (text) {
      current.parts.push(text);
    }
  }
  flush();

  const resolvedTitle = pageTitle || metadata.title;
  const keywords = collectKeywords({
    title: metadata.title,
    pageTitle: resolvedTitle,
    path: metadata.path,
    headings,
    inlineCodeTerms,
  });

  const documents = [];

  for (const section of sections) {
    const baseId = section.anchor
      ? `${metadata.path}#${section.anchor}`
      : metadata.path;
    const url = section.anchor
      ? `/${metadata.path}/#${section.anchor}`
      : `/${metadata.path}/`;
    const chunks = section.chunks.length > 0 ? section.chunks : [''];

    chunks.forEach((content, index) => {
      documents.push({
        id: index === 0 ? baseId : `${baseId}~${index + 1}`,
        title: resolvedTitle,
        heading: section.heading,
        content,
        text: content.slice(0, SEARCH_SNIPPET_LENGTH),
        keywords,
        category: metadata.category,
        path: metadata.path,
        url,
      });
    });
  }

  return documents;
};

/**
 * Extract searchable sections from an MDX source string.
 *
 * @param {string} markdown
 * @param {{ title: string, path: string, category: string }} metadata
 * @returns {object[]}
 */
export const extractDocument = (markdown, metadata) => {
  return extractSections(parseMdx(markdown), metadata);
};
