import fs from 'node:fs';
import path from 'node:path';
import { ensureArray, ensurePlainObject } from 'ensure-type';
import { Document } from 'langchain/document';

const getIsDirectory = x => fs.existsSync(x) && fs.lstatSync(x).isDirectory();

const mapFileExtensionToCodeBlockLanguage = (filepath) => {
  const ext = path.extname(filepath).slice(1);
  return ext;
};

const matchRenderExpressions = (content) => {
  const regex = /{render\(['"]\.\/([^'"]+)['"]\)}/ig;
  const matches = ensureArray(content.match(regex));

  return matches.map((match) => {
    const regex = /{render\(['"]\.\/([^'"]+)['"]\)}/i;
    const r = match.match(regex);
    if (!r || !r[1]) {
      return null;
    }
    return {
      importPath: r[1],
      raw: match,
    };
  }).filter((match) => !!match);
};

const splitMarkdownSections = (markdownText, options) => {
  options = {
    min: 1,
    max: 1,
    ...ensurePlainObject(options),
  };
  const sections = [];
  const lines = markdownText.split('\n');

  let sectionContent = '';
  const re = new RegExp(`^#{${options.min},${options.max}}\\s+.+`, 'igm');

  for (const line of lines) {
    const headingMatch = line.match(re);
    if (headingMatch) {
      if (sectionContent) {
        sections.push(sectionContent);
        sectionContent = '';
      }
    }

    sectionContent = sectionContent ? `${sectionContent}\n${line}` : line;
  }

  if (sectionContent) {
    sections.push(sectionContent);
  }

  return sections;
}

class TonicUITextSplitter {
  rootdir = '';

  constructor(options) {
    this.rootdir = options?.rootdir || this.rootdir;
  }

  splitMDXDocuments(docs) {
    const rootdir = this.rootdir;
    let accmulatedDocs = [];

    for (const doc of ensureArray(docs)) {
      if (!doc.pageContent) {
        continue;
      }

      const sourcePath = path.resolve(rootdir, doc.metadata.source);

      // Split markdown into sections by heading level 2
      const splittedSections = splitMarkdownSections(doc.pageContent, { min: 2, max: 2 })
        .reduce((acc, section) => {
          const excludeSections = [
            '## Import',
            '## Props',
          ];
          if (section.startsWith('## ') && !excludeSections.some((excludeSection) => section.startsWith(excludeSection))) {
            // Split usage section into subsections by heading level 3
            const subsections = splitMarkdownSections(section, { min: 3, max: 3 });
            return acc.concat(subsections);
          }
          return acc.concat(section);
        }, []);

      const splittedSectionDocuments = splittedSections.map((section) => {
        const renderExpressions = matchRenderExpressions(section);
        const metadata = {
          type: 'markdown',
          source: doc.metadata.source,
          imports: renderExpressions.map((renderExpression) => {
            const filepath = (() => {
              const sourceDirectory = path.dirname(sourcePath);
              const relativeImportPath = renderExpression.importPath;
              const isDirectory = getIsDirectory(path.resolve(sourceDirectory, relativeImportPath));
              if (isDirectory) {
                return path.resolve(sourceDirectory, relativeImportPath, 'index.js');
              }
              if (path.extname(relativeImportPath) === '') {
                return path.resolve(sourceDirectory, relativeImportPath + '.js');
              }
              return path.resolve(sourceDirectory, relativeImportPath);
            })();
            const filedir = path.dirname(filepath);
            return {
              path: path.relative(rootdir, filepath),
              raw: renderExpression.raw,
            };
          }),
        };

        // Replace render expressions with code blocks
        let pageContent = section;
        metadata.imports.forEach(({ path: importPath, raw: rawString }) => {
          const filepath = path.resolve(rootdir, importPath);
          if (!fs.existsSync(filepath)) {
            return;
          }
          const content = fs.readFileSync(filepath, 'utf8');
          const codeBlock = '```' + mapFileExtensionToCodeBlockLanguage(filepath) + '\n' + content + '\n```';
          pageContent = pageContent.replace(rawString, codeBlock);
        });

        const sectionDocument = new Document({
          pageContent,
          metadata,
        });
        return sectionDocument;
      });

      accmulatedDocs = accmulatedDocs.concat(splittedSectionDocuments);
    };

    return accmulatedDocs;
  }
}

export {
  TonicUITextSplitter,
};
