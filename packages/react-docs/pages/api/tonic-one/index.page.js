// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
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
import {
  formatHistory,
  //makeRetrievalQAChain as makeChain,
  makeConversationRetrievalQAChain,
  //makeCopilotChain,
  //makeVectorDBQAChain as makeChain,
} from './util';

/*
const DEFAULT_QA_PROMPT = new PromptTemplate({
  template: `Use the following pieces of context to answer the users question. If you don't know the answer, just say that you don't know, don't try to make up an answer.\n\n{context}\n\nQuestion: {question}\nHelpful Answer:`,
  inputVariables: ['context', 'question'],
});
*/

const TONIC_ONE_SYSTEM_MESSAGE_PROMPT_TEMPLATE = `You are Tonic One, an cutting-edge AI companion designed to assist frontend developers in mastering the Tonic UI component library. Your role is to provide instant guidance, explore UI patterns, and deliver AI-powered enhancements. Your knowledge is based on the information within the provided documents. Utilize the references to assist you answering questions effectively.
----- REFERENCE DOCUMENTS START -----
{context}
----- REFERENCE DOCUMENTS END -----
`;
const TONIC_ONE_HUMAN_MESSAGE_PROMPT_TEMPLATE = '{question}';

const TONIC_ONE_CHAT_PROMPT = ChatPromptTemplate.fromPromptMessages([
  SystemMessagePromptTemplate.fromTemplate(TONIC_ONE_SYSTEM_MESSAGE_PROMPT_TEMPLATE),
  HumanMessagePromptTemplate.fromTemplate(TONIC_ONE_HUMAN_MESSAGE_PROMPT_TEMPLATE),
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

  console.log(`> req.query: ${x(req.query)}`);
  console.log(`> vector_store: path=${x(hnswlibDirectory)}`);
  console.log(`> model=${x(azureOpenAIApiDeploymentName)}`);

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
    prompt: TONIC_ONE_CHAT_PROMPT, // One of: DEFAULT_QA_PROMPT, TONIC_ONE_CHAT_PROMPT
    verbose: false,
  });

  const vectorstore = await HNSWLib.load(hnswlibDirectory, embeddings);
  const k = 4; // Number of documents to retrieve
  const retriever = vectorstore.asRetriever(k);

  const chain = makeConversationRetrievalQAChain({
    llmChain,
    retriever,
  });

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
      // Required for VectorDBQAChain
      //query: question,

      // Required for RetrievalQAChain
      //query: question,

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
