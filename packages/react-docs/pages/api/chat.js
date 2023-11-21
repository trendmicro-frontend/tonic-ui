// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import path from 'path';
import { HNSWLib } from 'langchain/vectorstores/hnswlib'; // https://js.langchain.com/docs/api/vectorstores_hnswlib/classes/HNSWLib
import { OpenAIEmbeddings } from 'langchain/embeddings/openai';
import {
  formatHistory,
  //makeRetrievalQAChain as makeChain,
  makeConversationalRetrievalQAChain as makeChain,
  //makeVectorDBQAChain as makeChain,
} from './util';

export default async function handler(req, res) {
  const body = req.body;
  const dir = path.resolve(process.cwd(), 'data');
  const embeddings = new OpenAIEmbeddings({
    azureOpenAIApiDeploymentName: process.env.AZURE_OPENAI_API_DEPLOYMENT_NAME_TEXT_EMBEDDING,
  });
  const vectorstore = await HNSWLib.load(dir, embeddings);

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

  const chain = makeChain(vectorstore, (token) => {
    sendData(JSON.stringify({ data: token }));
  });

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
