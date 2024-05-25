import {renderToStream} from '@react-pdf/renderer';
import {ReactPDFDocument} from "@/components/ReactPDFDocument";
import {interactiveInterview, summarizeContent} from "@/components/GlobalContext";
import {openai} from "@/lib/OpenAI";
import {dropZonePrompt, skillsPrompt} from "@/lib/prompts";

export async function POST(request: Request) {
    const {summarizeContent, interviewSelectionTypeState, jobSelection, skills}: {
        summarizeContent: summarizeContent,
        jobSelection: string,
        interviewSelectionTypeState: string,
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
                    content: skills.length > 1 ? skillsPrompt(jobSelection, interviewSelectionTypeState, true) : dropZonePrompt(jobSelection, interviewSelectionTypeState, true)
                },
                {
                    role: 'user',
                    content: JSON.stringify(summarizeContent)
                }
            ],
        });

        const interview: interactiveInterview = JSON.parse(result.choices[0].message.content ?? '{}')

        const pdfStream = await renderToStream(
            <ReactPDFDocument
                jobSelection={jobSelection}
                interviewSelectionTypeState={interviewSelectionTypeState}
                steps={interview.steps}
            />
        );

        const readableStream = new ReadableStream({
            start(controller) {
                pdfStream.on('data', chunk => controller.enqueue(chunk));
                pdfStream.on('end', () => controller.close());
                pdfStream.on('error', err => controller.error(err));
            }
        });

        return new Response(readableStream, {
            headers: {
                'Content-Type': 'application/pdf',
                'Content-Disposition': `attachment; filename="interview-questions-${jobSelection}.pdf"`
            }
        });
    } catch (error) {
        console.error(error);
        return new Response(JSON.stringify({error: 'Failed to generate PDF'}), {status: 500});
    }
}