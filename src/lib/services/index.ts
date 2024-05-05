import OpenAI from "openai";
import {interactiveInterview, summarizeContent} from "@/components/GlobalContext";
import {Dispatch, FormEvent, SetStateAction} from "react";
import Chat = OpenAI.Chat;
import ChatCompletion = Chat.ChatCompletion;

export const summarizeContentService = async (e: FormEvent<HTMLFormElement>, setSummarizeContent: (state: summarizeContent) => void, setIsLoading: (state: boolean) => void, jobSelection: string, interviewSelectionTypeState: string): Promise<void> => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    formData.append('jobSelection', jobSelection)
    formData.append('interviewSelectionTypeState', interviewSelectionTypeState)
    setIsLoading(true)
    const response = await fetch('/api/summarize', {
        method: 'POST',
        body: formData
    });
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    const data: ChatCompletion = await response.json();
    const content: summarizeContent = JSON.parse(data.choices[0].message.content as string)
    setSummarizeContent(content)
    setIsLoading(false)
}

export const generateInteractiveInterviewService = async (summarizeContent: summarizeContent, setIsLoading: (state: boolean) => void, setInteractiveInterview: (state: (prevState: interactiveInterview) => interactiveInterview) => void, jobSelection: string, interviewSelectionTypeState: string, setLocalStorageInteractiveInterview: Dispatch<SetStateAction<interactiveInterview>>, setIsInteractiveInterview: Dispatch<SetStateAction<boolean>>, skills: string[]): Promise<void> => {
    setIsInteractiveInterview(true)
    setIsLoading(true)
    const globalBody = {
        jobSelection,
        interviewSelectionTypeState,
        summarizeContent,
        skills
    }
    const response = await fetch('/api/generate', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(globalBody),
    });
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    const data: ChatCompletion = await response.json();
    const interview: interactiveInterview = JSON.parse(data.choices[0].message.content as string)
    setInteractiveInterview(() => interview)
    setLocalStorageInteractiveInterview(interview)
    setIsLoading(false)
}

export const generatePDFService = async (summarizeContent: summarizeContent, jobSelection: string, interviewSelectionTypeState: string, setIsLoading: (state: boolean) => void, setPdfURL: Dispatch<SetStateAction<string>>, setIsInteractiveInterview: Dispatch<SetStateAction<boolean>>, skills: string[]) => {
    setIsInteractiveInterview(false)
    setIsLoading(true)
    const globalBody = {
        jobSelection,
        interviewSelectionTypeState,
        summarizeContent,
        skills
    };

    try {
        const response = await fetch('/api/generatePDF', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(globalBody)
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        setIsLoading(false)
        setPdfURL(url);
    } catch (error) {
        console.error('Failed to download PDF:', error);
    }
};