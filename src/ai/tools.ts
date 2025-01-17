import { tool as createTool } from 'ai';
import { z } from 'zod';

export const askMCQ = createTool({
    description: 'Ask a multiple-choice question',
    parameters: z.object({
        question: z.string().describe('The question to ask'),
        options: z.array(z.string()).describe('The options for the question'),
        correctAnswer: z.number().describe('The index of the correct answer'),
    }),
    execute: async function ({ question, options, correctAnswer }) {
        return {
            question,
            options,
            correctAnswer,
        };
    }
});

export const showResult = createTool({
    description: 'Show the result at the end of the quiz',
    parameters: z.object({
        score: z.number().describe('The user\'s score'),
        maxScore: z.number().describe('The maximum possible score'),
    }),
    execute: async function ({ score, maxScore }) {
        return {
            score,
            maxScore,
        }
    }
});

export const tools = {
    askMCQ: askMCQ,
    showResult: showResult,
};