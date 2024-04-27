'use client'

import {createContext, FC, ReactNode, useState} from "react";

interface content {
    skill: string;
    keywords: string[];
}

export interface summarizeContent {
    results: content[];
}

interface interviewStep {
    fromSkill: string;
    fromKeyword: string;
    question: string;
    answer: string;
}

export interface interactiveInterview {
    steps: interviewStep[];
}

export const globalContext = createContext({
    jobSelection: "",
    setJobSelection: (state: string) => {
    },
    interviewSelectionTypeState: "",
    setInterviewSelectionTypeState: (state: string) => {
    },
    summarizeContent: {} as summarizeContent,
    setSummarizeContent: (state: summarizeContent) => {
    },
    interactiveInterview: {} as interactiveInterview,
    setInteractiveInterview: (state: interactiveInterview) => {
    },
    isLoading: false,
    setIsLoading: (state: boolean) => {
    },
});

interface GlobalContextProps {
    children: ReactNode;
}

export const GlobalContext: FC<GlobalContextProps> = ({children}) => {
    const [jobSelection, setJobSelection] = useState<string>("IT Developer");
    const [interviewSelectionTypeState, setInterviewSelectionTypeState] = useState("");
    const [summarizeContent, setSummarizeContent] = useState<summarizeContent>({
        "results": [
            {
                "skill": "Paradigme objet",
                "keywords": [
                    "Définition de classes",
                    "Composition/Encapsulation",
                    "Héritage",
                    "Classes abstraites et interfaces",
                    "Polymorphisme",
                    "Exceptions"
                ]
            },
            {
                "skill": "Structures de données",
                "keywords": [
                    "Types de données abstraites"
                ]
            },
            {
                "skill": "Algorithmique",
                "keywords": [
                    "Récursivité",
                    "Algorithmes de tri",
                    "Backtracking",
                    "Heuristique"
                ]
            },
            {
                "skill": "Modalités d'évaluation et de validation",
                "keywords": [
                    "Projets à réaliser en groupe",
                    "Évaluation orale"
                ]
            }
        ]
    } as summarizeContent);
    const [interactiveInterview, setInteractiveInterview] = useState<interactiveInterview>({
        "steps": [
            {
                "fromSkill": "Paradigme objet",
                "fromKeyword": "Définition de classes",
                "question": "Pouvez-vous expliquer ce qu'est une classe en programmation orientée objet et donner un exemple ?"
            },
            {
                "fromSkill": "Paradigme objet",
                "fromKeyword": "Composition/Encapsulation",
                "question": "En quoi consiste la composition et l'encapsulation dans le paradigme objet ? Pouvez-vous donner un exemple de chaque ?"
            },
            {
                "fromSkill": "Paradigme objet",
                "fromKeyword": "Héritage",
                "question": "Pouvez-vous expliquer le concept d'héritage en programmation orientée objet et donner un exemple ?"
            },
            {
                "fromSkill": "Paradigme objet",
                "fromKeyword": "Classes abstraites et interfaces",
                "question": "Quelle est la différence entre une classe abstraite et une interface en Java ? Pouvez-vous fournir un exemple de chaque ?"
            },
            {
                "fromSkill": "Paradigme objet",
                "fromKeyword": "Polymorphisme",
                "question": "Pouvez-vous expliquer ce qu'est le polymorphisme en Java et donner un exemple concret ?"
            },
            {
                "fromSkill": "Paradigme objet",
                "fromKeyword": "Exceptions",
                "question": "En quoi consistent les exceptions en Java et comment gérez-vous les exceptions dans votre code ?"
            },
            {
                "fromSkill": "Structures de données",
                "fromKeyword": "Types de données abstraites",
                "question": "Pouvez-vous expliquer ce qu'est une structure de données abstraite et donner un exemple d'une utilisation concrète ?"
            },
            {
                "fromSkill": "Algorithmique",
                "fromKeyword": "Récursivité",
                "question": "Pouvez-vous expliquer le concept de récursivité en algorithmique et donner un exemple d'algorithme récursif que vous avez implémenté ?"
            },
            {
                "fromSkill": "Algorithmique",
                "fromKeyword": "Algorithmes de tri",
                "question": "Quels sont les principaux algorithmes de tri que vous connaissez et pouvez-vous expliquer comment fonctionne l'un d'entre eux ?"
            },
            {
                "fromSkill": "Algorithmique",
                "fromKeyword": "Backtracking",
                "question": "Pourriez-vous expliquer ce qu'est le backtracking en algorithmique et donner un exemple d'application ?"
            },
            {
                "fromSkill": "Algorithmique",
                "fromKeyword": "Heuristique",
                "question": "En quoi consiste l'heuristique en algorithmique et comment l'avez-vous utilisée pour résoudre un problème complexe ?"
            },
            {
                "fromSkill": "Modalités d'évaluation et de validation",
                "fromKeyword": "Projets à réaliser en groupe",
                "question": "Pouvez-vous partager une expérience de projet réalisé en groupe et expliquer comment vous avez contribué au succès de l'équipe ?"
            },
            {
                "fromSkill": "Modalités d'évaluation et de validation",
                "fromKeyword": "Évaluation orale",
                "question": "Comment vous préparez-vous pour une évaluation orale et quelles sont vos astuces pour bien communiquer vos idées à l'oral ?"
            }
        ]
    } as interactiveInterview);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    return (
        <globalContext.Provider value={
            {
                interviewSelectionTypeState,
                setInterviewSelectionTypeState,
                summarizeContent,
                setSummarizeContent,
                isLoading,
                setIsLoading,
                interactiveInterview,
                setInteractiveInterview,
                jobSelection,
                setJobSelection
            }
        }>
            {children}
        </globalContext.Provider>
    )
}