import * as fs from "fs";
import dotenv from "dotenv";
import { MemoryVectorStore } from "langchain/vectorstores/memory";
import { GooglePaLMEmbeddings } from "langchain/embeddings/googlepalm";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
import { PromptTemplate } from "langchain/prompts";
import { formatDocumentsAsString } from "langchain/util/document";
import { GooglePaLM } from "langchain/llms/googlepalm";
// import { GoogleVertexAI } from "langchain/llms/googlevertexai";
import { AgentExecutor, initializeAgentExecutorWithOptions } from "langchain/agents";
import { GoogleCustomSearch, SerpAPI } from "langchain/tools";
import { Calculator } from "langchain/tools/calculator";
import { RunnableSequence } from "langchain/schema/runnable";
import { BufferMemory } from "langchain/memory";
import { formatLogToString } from "langchain/agents/format_scratchpad/log";
import { renderTextDescription } from "langchain/tools/render";
import { ReActSingleInputOutputParser } from "langchain/agents/react/output_parser";
import { ChatOpenAI } from "langchain/chat_models/openai";
import { StringOutputParser } from "langchain/schema/output_parser";
import { ChatGoogleGenerativeAI } from "@langchain/google-genai";


dotenv.config();

const memory = new BufferMemory({ memoryKey: "chat_history" });


const Farmerbot = async (req, res) => {
    if (!req.params.prompt) {
        res.send({ result: "Please enter a question" })
    }
    const currentQuestion = req.params.prompt;
    /** Define your chat model */
    const model = new ChatGoogleGenerativeAI({ temperature: 0.5, verbose: true });

    model.bind({ stop: ["\nObservation"] })
    /** Bind a stop token to the model */
    const modelWithStop = model.bind({
        stop: ["\nObservation"],
    });
    /** Define your list of tools */
    const tools = [
        new GoogleCustomSearch(),
        // new SerpAPI(process.env.SERPAPI_API_KEY, {
        //     location: "India",
        //     hl: "en",
        //     gl: "in",
        // }),
    ];

    /** Add input variables to prompt */
    let prompt = `
            Assistant is a large language model trained by Google WHICH MUST ALWAYS GIVE ANSWERS WITH RESPECT TO YEAR 2023 ( the latest data ) and Indian database ( Rupee as currency ).

            Assistant is designed to be able to assist with a wide range of doubts related to farming, from answering simple questions to providing in-depth explanations and discussions on a wide range of topics related to farming alone. As a language model, Assistant is able to generate human-like text based on the input it receives, allowing it to engage in natural-sounding conversations and provide responses that are coherent and relevant to the only farming and finance related questions to farming at hand.

            Assistant is constantly learning and improving, and its capabilities are constantly evolving. It is able to process and understand large amounts of text, and can use this knowledge to provide accurate and informative responses to a wide range of questions. Additionally, Assistant is able to generate its own text based on the input it receives, allowing it to engage in discussions and provide explanations and descriptions on a wide range of farming information.

            Overall, Assistant is a powerful tool that can help with a wide range of questions on farming and finance and provide valuable insights and information on a wide range of farming topics. Whether you need help with a specific question or just want to have a conversation about a particular topic, Assistant is here to assist.
            
            TOOLS:
            ------

            Assistant has access to the following tools  :

            {tools}

            To use a tool , MUST use the following format , NEVER USE IT FOR ANYTHING ELSE:

            \\
            Thought: Do I need to use a tool? Yes
            Action: the action to take, should be one of [{tool_names}]
            Action Input: the input to the action
            Observation: the result of the action
            \\

            When you have a response to say to the Human, or if you do not need to use a tool, you MUST use this format ALONE and NO OTHER FORMAT MUST BE USED WITH IT OR ALONE FOR FINAL ANSWER :

            \\
            Thought: Do I need to use a tool? No
            Final Answer: [your response here]
            \\
            ------

            Begin!

            Previous conversation history:
            {chat_history}

            New input: {input}
            {agent_scratchpad}`

    prompt = prompt.replace(/\\/g, "```");
    const promptTemp = PromptTemplate.fromTemplate(prompt);

    const toolNames = tools.map((tool) => tool.name);
    const promptWithInputs = await promptTemp.partial({
        tools: renderTextDescription(tools),
        tool_names: toolNames.join(","),
    });


    const runnableAgent = RunnableSequence.from([
        {
            input: (i) => i.input,
            agent_scratchpad: (i) => formatLogToString(i.steps),
            chat_history: (i) => i.chat_history,
        },
        promptWithInputs,
        modelWithStop,
        new ReActSingleInputOutputParser({ toolNames, outputKey: 'key1' }),
    ]);
    /**
     * Define your memory store
     * @important The memoryKey must be "chat_history" for the chat agent to work
     * because this is the key this particular prompt expects.
     */

    /** Define your executor and pass in the agent, tools and memory */
    const executor = AgentExecutor.fromAgentAndTools({
        agent: runnableAgent,
        tools,
        handleParsingErrors: (e) => {
            console.log(e)
            return "";
        }
    });

    const result = await executor.call({ input: currentQuestion });
    res.send({ result });
}


export { Farmerbot }