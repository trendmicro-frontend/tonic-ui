// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import fs from 'fs';
import path from 'path';
import { HNSWLib } from 'langchain/vectorstores/hnswlib'; // https://js.langchain.com/docs/api/vectorstores_hnswlib/classes/HNSWLib
import { OpenAIEmbeddings } from 'langchain/embeddings/openai';
import { ChatOpenAI } from 'langchain/chat_models/openai';
import {
  LLMChain,
} from 'langchain/chains';
import {
  ChatPromptTemplate,
  SystemMessagePromptTemplate,
  HumanMessagePromptTemplate,
} from 'langchain/prompts';
import x from '@/utils/json-stringify';
import log from '@/utils/log';
import {
  formatHistory,
  makeConversationRetrievalQAChain,
  makeRetrievalQAChain,
} from './util';

const DEFAULT_SYSTEM_MESSAGE_PROMPT_TEMPLATE = `You are Tonic One, an cutting-edge AI companion designed to assist frontend developers in mastering the Tonic UI component library. Your mission is to provide instant guidance from the provided documents. Your knowledge is based on the information within the provided documents. Utilize the references to assist you answering questions effectively. The generated code should stay within a line width of 100 characters.
----- REFERENCE DOCUMENTS START -----
{context}
----- REFERENCE DOCUMENTS END -----
`;
const DEFAULT_HUMAN_MESSAGE_PROMPT_TEMPLATE = '{question}';
const DEFAULT_PROMPT = ChatPromptTemplate.fromPromptMessages([
  SystemMessagePromptTemplate.fromTemplate(DEFAULT_SYSTEM_MESSAGE_PROMPT_TEMPLATE),
  HumanMessagePromptTemplate.fromTemplate(DEFAULT_HUMAN_MESSAGE_PROMPT_TEMPLATE),
]);

const COPILOT_SYSTEM_MESSAGE_PROMPT_TEMPLATE = `You are Tonic One, an cutting-edge AI companion designed to assist frontend developers in mastering the Tonic UI component library. Your mission is to bring AI-powered enhancements to the provided code snippets. Your knowledge is based on the information within the provided documents. Utilize the references to assist you answering questions effectively.
===== REFERENCE DOCUMENTS START =====
{context}
===== REFERENCE DOCUMENTS END =====
`;
const TONIC_UI_GUIDELINES = fs.readFileSync(path.resolve(process.cwd(), 'pages/api/tonic-one/tonic-ui-guidelines.mdx'), 'utf8');
const COPILOT_HUMAN_MESSAGE_PROMPT_TEMPLATE = `Next, you will try to enhance the code with recommended style and component gidelines. The generated code should stay within a line width of 100 characters.
===== GUIDELINES START =====
${TONIC_UI_GUIDELINES.replace(/{/g, '{{').replace(/}/g, '}}')}
===== GUIDELINES END =====

===== CODE START =====
{query}
===== CODE END =====
`;
const COPILOT_PROMPT = ChatPromptTemplate.fromPromptMessages([
  SystemMessagePromptTemplate.fromTemplate(COPILOT_SYSTEM_MESSAGE_PROMPT_TEMPLATE),
  HumanMessagePromptTemplate.fromTemplate(COPILOT_HUMAN_MESSAGE_PROMPT_TEMPLATE),
]);

export default async function handler(req, res) {
  const body = req.body;
  const hnswlibDirectory = path.resolve(process.cwd(), 'embeddings/hnswlib');
  const embeddings = new OpenAIEmbeddings({
    azureOpenAIApiDeploymentName: process.env.AZURE_OPENAI_API_DEPLOYMENT_NAME_TEXT_EMBEDDING,
  });
  const azureOpenAIApiDeploymentName = (() => {
    if (req.query?.model === 'gpt-35') {
      return process.env.AZURE_OPENAI_API_DEPLOYMENT_NAME_GPT_35;
    }
    if (req.query?.model === 'gpt-4') {
      return process.env.AZURE_OPENAI_API_DEPLOYMENT_NAME_GPT_4;
    }
    // Fallback
    return process.env.AZURE_OPENAI_API_DEPLOYMENT_NAME_GPT_35;
  })();

  log.debug(`> req.query: ${x(req.query)}`);
  log.debug(`> req.body: ${x(req.body)}`);
  log.debug(`> vector_store: path=${x(hnswlibDirectory)}`);
  log.debug(`> model=${x(azureOpenAIApiDeploymentName)}`);

  const llmChain = new LLMChain({
    llm: new ChatOpenAI({
      azureOpenAIApiDeploymentName,
      temperature: 0.7,
      streaming: true,
      callbacks: [
        {
          handleLLMNewToken: (token) => {
            sendData(JSON.stringify({ data: token }));
          },
        },
      ],
    }),
    prompt: (req.query?.type === 'copilot') ? COPILOT_PROMPT : DEFAULT_PROMPT,
    verbose: false,
  });

  const vectorstore = await HNSWLib.load(hnswlibDirectory, embeddings);
  const k = (req.query?.type === 'copilot') ? 8 : 4; // Number of documents to retrieve
  const retriever = vectorstore.asRetriever(k);

  const chain = (req.query?.type === 'copilot')
    ? makeRetrievalQAChain({ llmChain, retriever })
    : makeConversationRetrievalQAChain({ llmChain, retriever });

  res.writeHead(200, {
    //'Access-Control-Allow-Origin': '*',
    //'Access-Control-Allow-Headers': '*',
    'Content-Type': 'text/event-stream',
    // Important to set no-transform to avoid compression, which will delay
    // writing response chunks to the client.
    // See https://github.com/vercel/next.js/issues/9965
    'Cache-Control': 'no-cache, no-transform',
    Connection: 'keep-alive',
  });

  const sendData = (data) => {
    res.write(`data: ${data}\n\n`);
  };

  sendData(JSON.stringify({ data: '' }));

  try {
    const {
      question,
      history: chatHistory,
    } = body;

    await chain.call({
      // Required for RetrievalQAChain
      query: question,

      // Required for ConversationalRetrievalQAChain
      question: question,

      chat_history: formatHistory(chatHistory),
    });
  } catch (err) {
    console.error(err);
    // Ignore error
  } finally {
    sendData('[DONE]');
    res.end();
  }
}
