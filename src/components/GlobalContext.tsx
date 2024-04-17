'use client'

import {createContext, FC, ReactNode, useState} from "react";

export const globalContext = createContext({
    componentStep: 0,
    setComponentStep: (step: number) => {}
});

interface GlobalContextProps {
    children: ReactNode;
}

export const GlobalContext: FC<GlobalContextProps> = ({children}) => {
    const [componentStep, setComponentStep] = useState(0);
    return (
        <globalContext.Provider value={{componentStep, setComponentStep}}>
            {children}
        </globalContext.Provider>
    )
}