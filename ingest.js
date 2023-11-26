import fs from 'node:fs';
import path from 'node:path';
import dotenv from 'dotenv';
import { HNSWLib } from 'langchain/vectorstores/hnswlib';
import { OpenAIEmbeddings } from 'langchain/embeddings/openai';
import {
  MarkdownTextSplitter,
  RecursiveCharacterTextSplitter,
  SupportedTextSplitterLanguages,
} from 'langchain/text_splitter';
import { DirectoryLoader } from 'langchain/document_loaders/fs/directory';
import { JSONLoader } from 'langchain/document_loaders/fs/json';
import { TextLoader } from 'langchain/document_loaders/fs/text';
import { Document } from 'langchain/document';
import { BaseDocumentLoader } from 'langchain/document_loaders/base';
import micromatch from 'micromatch';
import { TonicUITextSplitter } from './tonic-ui-text-splitter.js';

dotenv.config({
  path: path.join(process.cwd(), '.env'),
});

const baseDir = 'packages/react-docs/';

async function processFile(filePath) {
  return await new Promise((resolve, reject) => {
    fs.readFile(filePath, 'utf8', (err, data) => {
      if (err) {
        reject(err);
      } else {
        const pageContent = data;
        const metadata = {
          source: filePath.slice(baseDir.length),
        };
        const doc = new Document({
          pageContent,
          metadata,
        });
        resolve(doc);
      }
    });
  });
}

async function processDirectory(directoryPath, patterns, options) {
  const docs = [];
  let files = [];
  try {
    files = fs.readdirSync(directoryPath);
  } catch (err) {
    console.error(err);
    throw new Error(
      `Could not read directory: ${directoryPath}. Did you run \`sh download.sh\`?`
    );
  }
  for (const file of files) {
    const filePath = path.join(directoryPath, file);
    const stat = fs.statSync(filePath);
    if (stat.isDirectory()) {
      const newDocs = processDirectory(filePath, patterns);
      const nestedDocs = await newDocs;
      docs.push(...nestedDocs);
    } else {
      const isMatched = micromatch(filePath, patterns, options).length > 0;
      if (isMatched) {
        const newDoc = processFile(filePath);
        const doc = await newDoc;
        docs.push(doc);
      }
    }
  }
  return docs;
}

class ReadTheDocsLoader extends BaseDocumentLoader {
  async load(directoryPath, patterns, options) {
    return await processDirectory(directoryPath, patterns, options);
  }
}

export const run = async () => {
  // https://github.com/hwchase17/langchainjs/blob/main/langchain/src/text_splitter.ts
  // https://js.langchain.com/docs/api/text_splitter/interfaces/RecursiveCharacterTextSplitterParams
  let docs = [];

  // config/**/*.js
  /*
  docs = docs.concat(
    await (async () => {
      const splitter = new RecursiveCharacterTextSplitter({
        chunkSize: 1000,
        chunkOverlap: 200,
        keepSeparator: true,
        separators: RecursiveCharacterTextSplitter.getSeparatorsForLanguage('js'),
      });
      const loader = new ReadTheDocsLoader();
      const docs = await loader.load(path.join(baseDir, 'config'), [
        '*.js',
      ]);
      return await splitter.splitDocuments(docs);
    })()
  );
  */

  // pages/**/*.js
  const parseJavaScriptFiles = false;
  if (parseJavaScriptFiles) {
    docs = docs.concat(
      await (async () => {
        const splitter = new RecursiveCharacterTextSplitter({
          chunkSize: 1000,
          chunkOverlap: 0,
          keepSeparator: true,
          separators: RecursiveCharacterTextSplitter.getSeparatorsForLanguage('js'),
        });
        const loader = new ReadTheDocsLoader();
        const docs = await loader.load(path.join(baseDir, 'pages'),
          [
            '**/*.js',
            '!**/api/*.js',
            '!**/index.page.js',
            '!**/_app.page.js',
            '!**/_document.page.js',
            '!**/404.page.js',
          ]
        );
        return await splitter.splitDocuments(docs);
      })()
    );
  }

  // pages/**/*.mdx
  docs = docs.concat(
    await (async () => {
      const splitter = new TonicUITextSplitter({
        rootdir: `./${baseDir}`,
      });
      const loader = new ReadTheDocsLoader();
      const docs = await loader.load(path.join(baseDir, 'pages'), [
        '**/*.mdx',
      ]);
      return splitter.splitMDXDocuments(docs);
    })()
  );

  const metadata = docs.reduce((acc, doc) => {
    const source = doc.metadata.source;
    acc[source] = acc[source] ?? { pageContents: [] };
    acc[source].pageContents.push(doc.pageContent);
    return acc;
  }, {});

  const entries = Object.entries(metadata);
  for (const [source, { pageContents }] of entries) {
    const count = pageContents.length;
    const size = pageContents.reduce((acc, pageContent) => acc + pageContent.length, 0);
    console.log(`${source}: count=${count}, size=${size}`);
  }

  const embeddings = new OpenAIEmbeddings({
    azureOpenAIApiDeploymentName: process.env.AZURE_OPENAI_API_DEPLOYMENT_NAME_TEXT_EMBEDDING,
  });

  console.log(`Creating vector store: docs=${docs.length}, model='${process.env.AZURE_OPENAI_API_DEPLOYMENT_NAME_TEXT_EMBEDDING}'`);
  const vectorStore = await HNSWLib.fromDocuments(docs, embeddings);

  console.log('Saving vector store to disk...');
  await vectorStore.save('data-final');
};

(async () => {
  await run();
})();
