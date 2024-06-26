import OpenAI from 'openai';
import {OpenAIStream, StreamingTextResponse} from 'ai';
import {openai} from "@/lib/OpenAI";

export const dynamic = 'force-dynamic';
export const maxDuration = 60;

export async function POST(req: Request) {
    try {
        const {messages} = await req.json();

        const response = await openai.chat.completions.create({
            model: 'gpt-3.5-turbo-0125',
            stream: true,
            messages
        });

        const stream = OpenAIStream(response);

        return new StreamingTextResponse(stream);
    } catch (error) {
        if (error instanceof OpenAI.APIError) {
            const {name, status, headers, message} = error;
            return Response.json({name, status, headers, message}, {status});
        } else {
            throw error;
        }
    }
}