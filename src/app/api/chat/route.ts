import { streamText } from "ai";
import { google } from "@ai-sdk/google";
import { tools } from "@/ai/tools";


export async function POST(req: Request) {
    const { messages } = await req.json();
    const result = streamText({
        model: google('gemini-2.0-flash-exp'),
        system: "You are an intelligent assistant who curates quizzes. Use the provided topic and question count to generate a quiz. If reference material is provided, curate the quiz based on the material. Provide explanations for user's answers. Provide hints for questions if user requests.",
        messages,
        tools: tools,
        maxSteps: 1,
    });

    return result.toDataStreamResponse();
}