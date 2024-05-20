// @ts-ignore
import PDFDocument from "pdfkit-next";
import {openai} from "@/lib/OpenAI";
import {summarizeContent} from "@/components/GlobalContext";

export async function POST(request: Request) {
    const {summarizeContent, interviewSelectionTypeState, jobSelection, skills}: {
        summarizeContent: summarizeContent,
        jobSelection: string,
        interviewSelectionTypeState: string,
        skills: string[]
    } = await request.json();
    try {
        const skillsPrompt = `Tu es un expert dans le domaine des ressources humaines, tu vas communiquer avec une application web conçue pour aider les futurs diplômés de bachelors dans divers domaines tels que l'informatique, l'économie, le social ou encore les soins infirmiers à se préparer aux entretiens d'embauche. L'application a les informations pertinentes (skills) décrivant les compétences attendues à la fin de leur cursus de bachelor ou les exigences et compétences requises dans les offres d'emploi auxquelles ils aspirent. À présent, Tu vas utiliser ces informations pour générer un scénarios d'entretiens d'embauche réalistes. Le scénario sera basé sur les compétences techniques et relationnelles nécessaires pour le postes visés par les utilisateurs. L''application va te donner au prochain message, les différentes compétences/skills visés, tu vas donc générer par ces informations, le scénario qui doit contenir autant de questions que de compétences visées mais au minimum 20, il faut au moins deux questions par skill. Pour informations, l'utilisateur va postuler pour ce domaine/métier : ${jobSelection}. Il souhaite avoir un scénario d'interview qui sera ${interviewSelectionTypeState}. Le format de ta réponse sera en JSON et sera structuré de cette manière, tu ne devras pas remplir la propriété 'answer' : {steps: {fromSkill: string, fromKeyword: string, question: string, answer: string}[]}.`
        const dropZonePrompt = `Tu es un expert dans le domaine des ressources humaines, tu vas communiquer avec une application web conçue pour aider les futurs diplômés de bachelors dans divers domaines tels que l'informatique, l'économie, le social ou encore les soins infirmiers à se préparer aux entretiens d'embauche. L'application a extrait les informations pertinentes des documents PDF décrivant les compétences attendues à la fin de leur cursus de bachelor ou les exigences et compétences requises dans les offres d'emploi auxquelles ils aspirent. À présent, Tu vas utiliser ces informations pour générer un scénarios d'entretiens d'embauche réalistes. Le scénario sera basé sur les compétences techniques et relationnelles nécessaires pour le postes visés par les utilisateurs. L''application va te donner au prochain message, les différentes compétences/skills visés ainsi que des mots clés, tu vas donc générer par ces informations, le scénario qui doit contenir autant de questions que de compétences visées mais au minimum 20, il faut au moins deux questions par skill. De plus, tu réponderas égalment aux questions de manières précises et détaillées. Pour informations, l'utilisateur va postuler pour ce domaine/métier : ${jobSelection}. Il souhaite avoir un scénario d'interview qui sera ${interviewSelectionTypeState}. Le format de ta réponse sera en JSON et sera structuré de cette manière : {steps: {fromSkill: string, fromKeyword: string, question: string, answer: string}[]}.`
        const result = await openai.chat.completions.create({
            model: 'gpt-3.5-turbo-0125',
            stream: false,
            response_format: {type: 'json_object'},
            messages: [
                {
                    role: 'system',
                    content: skills?.length > 0 ? skillsPrompt : dropZonePrompt
                },
                {
                    role: 'user',
                    content: JSON.stringify(summarizeContent)
                }
            ],
        });
        const doc = new PDFDocument({margin: 40});

        doc.image('public/logo/HES.png', 50, 45, {width: 50})
            .fontSize(10)
            .text(new Date().toLocaleDateString(), 200, 50, {align: 'right'});

        doc.fontSize(25)
            .text("Questions d'interview", 100, 100);

        doc.fontSize(15)
            .text(`Sélection d'emploi: ${jobSelection}`, 100, 150)
            .text(`Type d'interview: ${interviewSelectionTypeState}`, 100, 180);

        let yPosition = 230;
        const interview = JSON.parse(<string>result.choices[0].message.content);

        interview.steps.forEach((step: { question: any; }, index: number) => {
            if (yPosition + 20 + doc.heightOfString(step.question, {width: 400}) > doc.page.height - doc.page.margins.bottom) {
                doc.addPage({margin: 40});
                yPosition = doc.page.margins.top;
            }
            doc.fontSize(12).text(`Question ${index + 1}: ${step.question}`, 100, yPosition);
            yPosition += 20 + doc.heightOfString(step.question, {width: 400});
        });

        yPosition += 20; // Ajoute un espace avant de commencer les réponses

        interview.steps.forEach((step: { answer: any; }, index: number) => {
            if (yPosition + 20 + doc.heightOfString(step.answer, {width: 400}) > doc.page.height - doc.page.margins.bottom) {
                doc.addPage({margin: 40});
                yPosition = doc.page.margins.top;
            }
            doc.fontSize(12).text(`Réponse ${index + 1}: ${step.answer}`, 100, yPosition);
            yPosition += 20 + doc.heightOfString(step.answer, {width: 400});
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
