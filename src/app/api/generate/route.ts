import {summarizeContent} from "@/components/GlobalContext";
import {openai} from "@/lib/OpenAI";
import OpenAI from "openai";
import {dropZonePrompt, skillsPrompt} from "@/lib/prompts";

export const dynamic = 'force-dynamic';

export const config = {
    maxDuration: 60
}

export async function POST(request: Request) {
    const {summarizeContent, interviewSelectionTypeState, jobSelection, skills}: {
        summarizeContent: summarizeContent,
        jobSelection: string,
        interviewSelectionTypeState: string
        skills: string[]
    } = await request.json();
    try {
        const result = await openai.chat.completions.create({
            model: 'gpt-3.5-turbo-0125',
            stream: false,
            response_format: {type: 'json_object'},
            messages: [
                {
                    role: 'system',
                    content: summarizeContent.results.length > 0 ? dropZonePrompt(jobSelection, interviewSelectionTypeState) : skillsPrompt(jobSelection, interviewSelectionTypeState)
                },
                {
                    role: 'user',
                    content: summarizeContent.results.length > 0 ? JSON.stringify(summarizeContent) : skills.join(', ')
                }
            ],
        })
        return Response.json(result, {status: 200});
    } catch (error) {
        if (error instanceof OpenAI.APIError) {
            const {name, status, headers, message} = error;
            return Response.json({name, status, headers, message}, {status});
        } else {
            throw error;
        }
    }
}