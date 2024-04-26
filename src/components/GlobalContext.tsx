'use client'

import {createContext, FC, ReactNode, useState} from "react";
import {PDFExtractPage} from "pdf.js-extract";

export const globalContext = createContext({
    interviewSelectionTypeState: "",
    setInterviewSelectionTypeState: (state: string) => {
    },
    extractedContent: [] as PDFExtractPage[],
    setExtractedContent: (state: PDFExtractPage[]) => {
    }
});

interface GlobalContextProps {
    children: ReactNode;
}

export const GlobalContext: FC<GlobalContextProps> = ({children}) => {
    const [interviewSelectionTypeState, setInterviewSelectionTypeState] = useState("");
    const [extractedContent, setExtractedContent] = useState<PDFExtractPage[]>([])
    return (
        <globalContext.Provider value={
            {
                interviewSelectionTypeState,
                setInterviewSelectionTypeState,
                extractedContent,
                setExtractedContent
            }
        }>
            {children}
        </globalContext.Provider>
    )
}