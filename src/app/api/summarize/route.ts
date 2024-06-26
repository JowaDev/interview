import {openai} from "@/lib/OpenAI";
import OpenAI from "openai";
import {TextContent} from "pdfjs-dist/types/web/text_layer_builder";
// @ts-ignore
import * as pdfjs from 'pdfjs-dist/legacy/build/pdf';
import '../../../../public/pdf/pdf.worker.min.mjs';

export const dynamic = 'force-dynamic';
export const maxDuration = 60;

export async function POST(request: Request) {
    const formData = await request.formData();
    const jobSelection = formData.get('jobSelection');
    const interviewSelectionTypeState = formData.get('interviewSelectionTypeState');
    const pdfFile = formData.get('pdf') as File;
    const pdfBuffer = await pdfFile.arrayBuffer();
    const pdf = await pdfjs.getDocument({data: pdfBuffer}).promise;
    let content = '';
    for (let i = 1; i <= pdf.numPages; i++) {
        const page = await pdf.getPage(i);
        const textContent = await page.getTextContent();
        const pageText = textContent.items.map((item: TextContent) => ('str' in item ? item.str : '')).join(' ');
        content += pageText + '\n';
    }
    try {
        const result = await openai.chat.completions.create({
            model: 'gpt-4o',
            stream: false,
            response_format: {type: 'json_object'},
            messages: [
                {
                    role: 'system',
                    content: `Tu es un expert dans le domaine des ressources humaines, tu vas devoir aider une application web conçue pour aider les futurs diplômés de bachelors dans divers domaines tels que l'informatique, l'économie, le social ou encore les soins infirmiers. L'objectif de cette application est de préparer les utilisateurs aux entretiens d'embauche en travaillant sur leurs compétences techniques et relationnelles. Les utilisateurs peuvent importer un document PDF décrivant les compétences attendues à la fin de leur cursus de bachelor ou spécifier les exigences et compétences requises dans les offres d'emploi auxquelles ils aspirent. Le rôle de l'application à cet instant est d'extraire les informations pertinentes de ce document pour les présenter de manière concise et efficace. L'application va maintenant extraire les informations brutes du document PDF et te les donner ainsi tu pourras fournir les informations qui sont uniquement nécessaires pour préparer l'entretien/job interview comme par exemple (les compétences et mots clés). L'utilisateur voudra postuler pour ce domaine/type d'emploi : ${jobSelection}. Il souhaite avoir un scénario d'interview qui sera ${interviewSelectionTypeState}. Le message suivant est le contenu brut que tu dois traiter. Retourne dans le format JSON les informations pertinentes pour préparer l'entretien d'embauche. Le format JSON doit avoir cette structure : {results: [{skill: string, keywords: [string]}]}`
                },
                {
                    role: 'user',
                    content
                }
            ],
        });
        return new Response(JSON.stringify(result), {status: 200});
    } catch (error) {
        if (error instanceof OpenAI.APIError) {
            const {name, status, headers, message} = error;
            return new Response(JSON.stringify({name, status, headers, message}), {status});
        } else {
            throw error;
        }
    }
}