'use client'

import {createContext, FC, ReactNode, useState} from "react";
import {Message} from "ai/react";

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
    answer: Message[] | string;
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
    setInteractiveInterview: (state: (prevState: interactiveInterview) => interactiveInterview) => {
    },
    isLoading: false,
    setIsLoading: (state: boolean) => {
    },
});

interface GlobalContextProps {
    children: ReactNode;
}

export const GlobalContext: FC<GlobalContextProps> = ({children}) => {
    const [jobSelection, setJobSelection] = useState<string>("");
    const [interviewSelectionTypeState, setInterviewSelectionTypeState] = useState("");
    const [summarizeContent, setSummarizeContent] = useState<summarizeContent>({
        "results": [
            {
                "skill": "Compétences visées",
                "keywords": [
                    "différents paradigmes de programmation",
                    "algorithmes de structures de données",
                    "récursivité"
                ]
            },
            {
                "skill": "Contenu et formes d'enseignement",
                "keywords": [
                    "Paradigme objet",
                    "Composition/Encapsulation",
                    "Héritage",
                    "Classes abstraites et interfaces",
                    "Polymorphisme",
                    "Exceptions",
                    "Structures de données",
                    "Algorithmique",
                    "Récursivité",
                    "algorithmes de tri",
                    "Backtracking",
                    "Heuristique"
                ]
            }
        ]
    } as summarizeContent);
    const [interactiveInterview, setInteractiveInterview] = useState<interactiveInterview>({} as interactiveInterview);
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