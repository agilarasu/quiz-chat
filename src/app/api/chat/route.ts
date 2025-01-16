import { streamText } from "ai";
import { google } from "@ai-sdk/google";
import { tools } from "@/ai/tools";


export async function POST(req: Request) {
    const { messages } = await req.json();

    const result = streamText({
        model: google('gemini-2.0-flash-exp'),
        system: "You are a quiz maker, Make quizzess based on the user's topic of interest. Explain/ give hints for the answers if the user asks for it.",
        messages,
        tools: tools,
        maxSteps: 1,
        // onFinish: async (result) => {
        //     // cls then print the result
        //     console.log('\x1Bc');
        //     console.log(messages);
        //     console.log(result);
        // }
    }
    );

    return result.toDataStreamResponse();
}