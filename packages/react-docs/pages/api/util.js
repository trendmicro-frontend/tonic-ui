import { OpenAI } from 'langchain/llms/openai';
import { ChatOpenAI } from 'langchain/chat_models/openai';
import {
  StuffDocumentsChain,
  ConversationalRetrievalQAChain,
  RetrievalQAChain,
  VectorDBQAChain,
  LLMChain,
} from 'langchain/chains';
import { HNSWLib } from 'langchain/vectorstores/hnswlib';
import {
  PromptTemplate,
  ChatPromptTemplate,
  SystemMessagePromptTemplate,
  HumanMessagePromptTemplate,
} from 'langchain/prompts';
import { AIChatMessage, HumanChatMessage } from 'langchain/schema';
import { BufferMemory } from 'langchain/memory';

const DEFAULT_QA_PROMPT = new PromptTemplate({
  template: `Use the following pieces of context to answer the users question. If you don't know the answer, just say that you don't know, don't try to make up an answer.\n\n{context}\n\nQuestion: {question}\nHelpful Answer:`,
  inputVariables: ['context', 'question'],
});

const TONIC_ONE_SYSTEM_MESSAGE_PROMPT_TEMPLATE = `Your name is Tonic One, an innovative AI companion designed to empower frontend developers in mastering the Tonic UI component library. You provide instant guidance, real-time examples, and AI-powered enhancements.
You are given the following extracted parts of a long document and a question. You can return the corresponding path of the metadata that matches the response message from the given context. If you cannot find the path, don't try to make up a path that you don't know.
----------------
{context}`;
const TONIC_ONE_HUMAN_MESSAGE_PROMPT_TEMPLATE = '{question}';

const TONIC_ONE_CHAT_PROMPT = ChatPromptTemplate.fromPromptMessages([
  SystemMessagePromptTemplate.fromTemplate(TONIC_ONE_SYSTEM_MESSAGE_PROMPT_TEMPLATE),
  HumanMessagePromptTemplate.fromTemplate(TONIC_ONE_HUMAN_MESSAGE_PROMPT_TEMPLATE),
]);

const QUESTION_GENERATOR_CHAIN_PROMPT_TEMPLATE = `Given the following conversation and a follow up question, rephrase the follow up question to be a standalone question.

Chat history:
{chat_history}
Follow up input: {question}
Standalone question:
`;

class CustomStuffDocumentsChain extends StuffDocumentsChain {
  // @see langchain/dist/chains/combine_docs_chain.js
  _prepInputs(values) {
    if (!(this.inputKey in values)) {
      throw new Error(`Document key ${this.inputKey} not found.`);
    }
    const { [this.inputKey]: docs, ...rest } = values;
    const texts = docs.map(({ pageContent, metadata }) => {
      const { source: path } = metadata;
      return `Metadata\n---\npath: ${path}\n---\n${pageContent}`;
    });
    const text = texts.join("\n\n");

    return {
      ...rest,
      [this.documentVariableName]: text,
    };
  }
};

/**
 * https://js.langchain.com/docs/modules/chains/popular/vector_db_qa/
 */
export const makeRetrievalQAChain = (
  vectorStore,
  onTokenStream,
) => {
  const retriever = vectorStore.asRetriever();

  const llmChain = new LLMChain({
    llm: new ChatOpenAI({
      azureOpenAIApiDeploymentName: process.env.AZURE_OPENAI_API_DEPLOYMENT_NAME_GPT,
      temperature: 0.7,
      streaming: Boolean(onTokenStream),
      callbacks: [
        {
          handleLLMNewToken: (token) => {
            onTokenStream?.(token);
          },
        },
      ],
    }),
    prompt: TONIC_ONE_CHAT_PROMPT, // One of: DEFAULT_QA_PROMPT, TONIC_ONE_CHAT_PROMPT
    verbose: false,
  });
  const combineDocumentsChain = new CustomStuffDocumentsChain({ llmChain, verbose: false });

  /**
   * The RetrievalQAChain is a chain that combines a Retriever and a QA chain. It is used to retrieve documents from a Retriever
   * and then use a QA chain to answer a question based on the retrieved documents.
   */
  return new RetrievalQAChain({
    retriever,
    combineDocumentsChain,
    returnSourceDocuments: true,
    verbose: true,
  });
};

/**
 * https://js.langchain.com/docs/modules/chains/popular/chat_vector_db
 *
 * @see https://github.com/hwchase17/langchainjs/blob/main/langchain/src/chains/conversational_retrieval_chain.ts
 */
export const makeConversationalRetrievalQAChain = (vectorStore, onTokenStream) => {
  const retriever = vectorStore.asRetriever();

  const llmChain = new LLMChain({
    llm: new ChatOpenAI({
      azureOpenAIApiDeploymentName: process.env.AZURE_OPENAI_API_DEPLOYMENT_NAME_GPT,
      temperature: 0.7,
      streaming: Boolean(onTokenStream),
      callbacks: [
        {
          handleLLMNewToken: (token) => {
            onTokenStream?.(token);
          },
        },
      ],
    }),
    prompt: TONIC_ONE_CHAT_PROMPT, // One of: DEFAULT_QA_PROMPT, TONIC_ONE_CHAT_PROMPT
    verbose: false,
  });
  const combineDocumentsChain = new CustomStuffDocumentsChain({ llmChain, verbose: false });

  const questionGeneratorChain = new LLMChain({
    llm: new ChatOpenAI({
      azureOpenAIApiDeploymentName: process.env.AZURE_OPENAI_API_DEPLOYMENT_NAME_GPT,
      temperature: 0,
    }),
    prompt: PromptTemplate.fromTemplate(QUESTION_GENERATOR_CHAIN_PROMPT_TEMPLATE),
  });

  /**
   * The ConversationalRetrievalQA chain builds on RetrievalQAChain to provide a chat history component.
   *
   * It first combines the chat history (either explicitly passed in or retrieved from the provided memory)
   * and the question into a standalone question, then looks up relevant documents from the retriever,
   * and finally passes those documents and the question to a question answering chain to return a response.
   */
  return new ConversationalRetrievalQAChain({
    retriever,
    combineDocumentsChain,
    questionGeneratorChain,
    returnSourceDocuments: true,
    verbose: true, 

    // The chat history can be provided either explicitly from the UI or retrieved from the provided memory
    /*
    memory: new BufferMemory({
      memoryKey: 'chat_history', // The key used to store the chat history in memory
      inputKey: 'question', // The key used to access the input for the chain
      outputKey: 'text', // The key used to retrieve the final conversational output of the chain
      returnMessages: true, // Set to true if using with a chat model
    }),
    */
  });
};

export const makeVectorDBQAChain = (vectorStore, onTokenStream) => {
  const llm = new ChatOpenAI({
    azureOpenAIApiDeploymentName: process.env.AZURE_OPENAI_API_DEPLOYMENT_NAME_GPT,
    temperature: 0,
    streaming: Boolean(onTokenStream),
    callbacks: [
      {
        handleLLMNewToken: (token) => {
          onTokenStream?.(token);
        },
      },
    ],
  });

  const chain = VectorDBQAChain.fromLLM(llm, vectorStore, {
    returnSourceDocuments: true,
    verbose: true,
  });

  return chain;
}

export const formatHistory = (history) => 
  history.flatMap(([q, a]) => [new HumanChatMessage(q), new AIChatMessage(a)]);
