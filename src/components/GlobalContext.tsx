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
    skills: [''],
    setSkills: (state: string[]) => {
    }
});

interface GlobalContextProps {
    children: ReactNode;
}

export const GlobalContext: FC<GlobalContextProps> = ({children}) => {
    const [jobSelection, setJobSelection] = useState<string>("");
    const [interviewSelectionTypeState, setInterviewSelectionTypeState] = useState("");
    const [summarizeContent, setSummarizeContent] = useState<summarizeContent>({} as summarizeContent);
    const [interactiveInterview, setInteractiveInterview] = useState<interactiveInterview>({} as interactiveInterview);
    const [skills, setSkills] = useState<string[]>(['']);
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
                setJobSelection,
                skills,
                setSkills
            }
        }>
            {children}
        </globalContext.Provider>
    )
}