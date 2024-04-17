'use client'

import {createContext, FC, ReactNode, useState} from "react";

export const globalContext = createContext({
    interviewSelectionTypeState: "",
    setInterviewSelectionTypeState: (state: string) => {},
});

interface GlobalContextProps {
    children: ReactNode;
}

export const GlobalContext: FC<GlobalContextProps> = ({children}) => {
    const [interviewSelectionTypeState, setInterviewSelectionTypeState] = useState("");
    return (
        <globalContext.Provider value={{interviewSelectionTypeState, setInterviewSelectionTypeState}}>
            {children}
        </globalContext.Provider>
    )
}