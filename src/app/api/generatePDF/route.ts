// @ts-ignore
import PDFDocument from "pdfkit-next";
import {openai} from "@/lib/OpenAI";
import {interactiveInterview, summarizeContent} from "@/components/GlobalContext";

export async function POST(request: Request) {
    const {summarizeContent, interviewSelectionTypeState, jobSelection}: {
        summarizeContent: summarizeContent,
        jobSelection: string,
        interviewSelectionTypeState: string
    } = await request.json();
    try {
        const result = await openai.chat.completions.create({
            model: 'gpt-3.5-turbo-0125',
            stream: false,
            response_format: {type: 'json_object'},
            messages: [
                {
                    role: 'system',
                    content: `Tu es un expert dans le domaine des ressources humaines, tu vas communiquer avec une application web conçue pour aider les futurs diplômés de bachelors dans divers domaines tels que l'informatique, l'économie, le social ou encore les soins infirmiers à se préparer aux entretiens d'embauche. L'application a extrait les informations pertinentes des documents PDF décrivant les compétences attendues à la fin de leur cursus de bachelor ou les exigences et compétences requises dans les offres d'emploi auxquelles ils aspirent. À présent, Tu vas utiliser ces informations pour générer un scénarios d'entretiens d'embauche réalistes. Le scénario sera basé sur les compétences techniques et relationnelles nécessaires pour le postes visés par les utilisateurs. L''application va te donner au prochain message, les différentes compétences/skills visés ainsi que des mots clés, tu vas donc générer par ces informations, le scénario qui doit contenir autant de questions que de compétences visées mais au minimum 20, il faut au moins deux questions par skill. Pour informations, l'utilisateur va postuler pour ce domaine/métier : ${jobSelection}. Il souhaite avoir un scénario d'interview qui sera ${interviewSelectionTypeState}. Le format de ta réponse sera en JSON et sera structuré de cette manière, tu ne devras pas remplir la propriété 'answer' : {steps: {fromSkill: string, fromKeyword: string, question: string, answer: string}[]}.`
                },
                {
                    role: 'user',
                    content: JSON.stringify(summarizeContent)
                }
            ],
        })
        const doc = new PDFDocument();
        doc.fontSize(25).text('Interview Questions', 100, 100);
        doc.fontSize(15).text(`Job Selection: ${jobSelection}`, 100, 150);
        doc.fontSize(15).text(`Interview Type: ${interviewSelectionTypeState}`, 100, 200);
        doc.fontSize(15).text('Questions:', 100, 250);
        const interview = JSON.parse(result.choices[0].message.content!) as interactiveInterview;
        // @ts-ignore
        interview.steps.forEach((step, index) => {
            doc.fontSize(12).text(`Question ${index + 1}: ${step.question}`, 100, 300 + (index * 50));
        });
        doc.end();

        const streamToBuffer = async (stream: any) => {
            const chunks = [];
            for await (const chunk of stream) {
                chunks.push(chunk);
            }
            return Buffer.concat(chunks);
        };

        const pdfBuffer = await streamToBuffer(doc);

        return new Response(pdfBuffer, {
            headers: {
                'Content-Type': 'application/pdf',
                'Content-Disposition': `attachment; filename="interview-questions-${jobSelection}.pdf"`
            }
        });
    } catch (error) {
        console.error(error);
        return new Response(JSON.stringify({error: "Failed to generate PDF"}), {status: 500});
    }
}
