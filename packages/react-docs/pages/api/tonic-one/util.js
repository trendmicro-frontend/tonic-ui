import fs from 'node:fs';
import path from 'node:path';
import { ensureArray, ensureString } from 'ensure-type';
import { ChatOpenAI } from 'langchain/chat_models/openai';
import {
  StuffDocumentsChain,
  ConversationalRetrievalQAChain,
  RetrievalQAChain,
  LLMChain,
} from 'langchain/chains';
import {
  PromptTemplate,
} from 'langchain/prompts';
import { AIChatMessage, HumanChatMessage } from 'langchain/schema';
import log from '@/utils/log';
import x from '@/utils/json-stringify';

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
    const inputDocs = ensureArray(docs);
    const sources = [];

    const matchedDocs = inputDocs.map(({ pageContent, metadata }, index) => {
      if (metadata && metadata.source && !sources.includes(metadata.source)) {
        sources.push(metadata.source);
      }
      return pageContent;
    });

    const sourceDocs = sources.map((source, index) => {
      const filepath = path.resolve(process.cwd(), 'embeddings/data', source);
      if (!fs.existsSync(filepath)) {
        return '';
      }
      const sourceContent = fs.readFileSync(filepath, 'utf8');
      return sourceContent;
    }).filter((sourceContent) => !!sourceContent);

    const stuffDocuments = [
      ...sourceDocs, // Add source documents first to increase the likelihood of them being used
      ...matchedDocs, // Add matched documents for reference
    ];

    for (let i = 0; i < sources.length; ++i) {
      log.debug(`> stuff_documents_chain:source_docs_${i}: source=${x(sources[i])}, len=${x(ensureString(sourceDocs[i]).length)}`);
    }
    for (let i = 0; i < inputDocs.length; ++i) {
      log.debug(`> stuff_documents_chain:matched_docs_${i}: metadata=${x(inputDocs[i].metadata)}, len=${x(ensureString(inputDocs[i].pageContent).length)}`);
    }

    return {
      ...rest,
      [this.documentVariableName]: stuffDocuments.map((docContent, docIndex) => {
        return 'Reference ' + (docIndex + 1) + ':\n' + docContent;
      }).join("\n-----\n"),
    };
  }
}

/**
 * https://js.langchain.com/docs/modules/chains/popular/vector_db_qa/
 */
export const makeRetrievalQAChain = ({
  llmChain,
  retriever,
}) => {
  log.debug(`> retrieval_qa_chain: api_version=${x(llmChain?.llm?.azureOpenAIApiVersion)}, deployment_name=${x(llmChain?.llm?.azureOpenAIApiDeploymentName)}, instance_name=${x(llmChain?.llm?.azureOpenAIApiInstanceName)}`);

  const combineDocumentsChain = new CustomStuffDocumentsChain({ llmChain, verbose: false });

  /**
   * The RetrievalQAChain is a chain that combines a Retriever and a QA chain. It is used to retrieve documents from a Retriever
   * and then use a QA chain to answer a question based on the retrieved documents.
   */
  return new RetrievalQAChain({
    retriever,
    combineDocumentsChain,
    returnSourceDocuments: true,
    verbose: false,
  });
};

/**
 * https://js.langchain.com/docs/modules/chains/popular/chat_vector_db
 *
 * @see https://github.com/hwchase17/langchainjs/blob/main/langchain/src/chains/conversational_retrieval_chain.ts
 */
export const makeConversationRetrievalQAChain = ({
  llmChain,
  retriever,
}) => {
  log.debug(`> retrieval_qa_chain: api_version=${x(llmChain?.llm?.azureOpenAIApiVersion)}, deployment_name=${x(llmChain?.llm?.azureOpenAIApiDeploymentName)}, instance_name=${x(llmChain?.llm?.azureOpenAIApiInstanceName)}`);

  const combineDocumentsChain = new CustomStuffDocumentsChain({ llmChain, verbose: false });

  const deploymentName = llmChain?.llm?.azureOpenAIApiDeploymentName ?? process.env.AZURE_OPENAI_API_DEPLOYMENT_NAME_GPT_35;
  const questionGeneratorChain = new LLMChain({
    llm: new ChatOpenAI({
      azureOpenAIApiDeploymentName: deploymentName,
      temperature: 0.7,
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
    verbose: false,

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

export const formatHistory = (history) => 
  history.flatMap(([q, a]) => [new HumanChatMessage(q), new AIChatMessage(a)]);
