import {summarizeContent} from "@/components/GlobalContext";
import {openai} from "@/lib/OpenAI";
import OpenAI from "openai";

export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
    const {summarizeContent, interviewSelectionTypeState, jobSelection, skills}: {
        summarizeContent: summarizeContent,
        jobSelection: string,
        interviewSelectionTypeState: string
        skills: string[]
    } = await request.json();
    try {
        const skillsPrompt = `Tu es un expert dans le domaine des ressources humaines, tu vas communiquer avec une application web conçue pour aider les futurs diplômés de bachelors dans divers domaines tels que l'informatique, l'économie, le social ou encore les soins infirmiers à se préparer aux entretiens d'embauche. L'application a les informations pertinentes (skills) décrivant les compétences attendues à la fin de leur cursus de bachelor ou les exigences et compétences requises dans les offres d'emploi auxquelles ils aspirent. À présent, Tu vas utiliser ces informations pour générer un scénarios d'entretiens d'embauche réalistes. Le scénario sera basé sur les compétences techniques et relationnelles nécessaires pour le postes visés par les utilisateurs. L''application va te donner au prochain message, les différentes compétences/skills visés, tu vas donc générer par ces informations, le scénario qui doit contenir autant de questions que de compétences visées mais au minimum 20, il faut au moins deux questions par skill. Pour informations, l'utilisateur va postuler pour ce domaine/métier : ${jobSelection}. Il souhaite avoir un scénario d'interview qui sera ${interviewSelectionTypeState}. Le format de ta réponse sera en JSON et sera structuré de cette manière, tu ne devras pas remplir la propriété 'answer' : {steps: {fromSkill: string, fromKeyword: string, question: string, answer: string}[]}.`
        const dropZonePrompt = `Tu es un expert dans le domaine des ressources humaines, tu vas communiquer avec une application web conçue pour aider les futurs diplômés de bachelors dans divers domaines tels que l'informatique, l'économie, le social ou encore les soins infirmiers à se préparer aux entretiens d'embauche. L'application a extrait les informations pertinentes des documents PDF décrivant les compétences attendues à la fin de leur cursus de bachelor ou les exigences et compétences requises dans les offres d'emploi auxquelles ils aspirent. À présent, Tu vas utiliser ces informations pour générer un scénarios d'entretiens d'embauche réalistes. Le scénario sera basé sur les compétences techniques et relationnelles nécessaires pour le postes visés par les utilisateurs. L''application va te donner au prochain message, les différentes compétences/skills visés ainsi que des mots clés, tu vas donc générer par ces informations, le scénario qui doit contenir autant de questions que de compétences visées mais au minimum 20, il faut au moins deux questions par skill. Pour informations, l'utilisateur va postuler pour ce domaine/métier : ${jobSelection}. Il souhaite avoir un scénario d'interview qui sera ${interviewSelectionTypeState}. Le format de ta réponse sera en JSON et sera structuré de cette manière, tu ne devras pas remplir la propriété 'answer' : {steps: {fromSkill: string, fromKeyword: string, question: string, answer: string}[]}.`
        const result = await openai.chat.completions.create({
            model: 'gpt-3.5-turbo-0125',
            stream: false,
            response_format: {type: 'json_object'},
            messages: [
                {
                    role: 'system',
                    content: skills.length > 1 ? skillsPrompt : dropZonePrompt
                },
                {
                    role: 'user',
                    content: skills.length > 1 ? skills.join(', ') : JSON.stringify(summarizeContent)
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