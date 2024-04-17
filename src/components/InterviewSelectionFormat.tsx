'use client'

import {FC, useContext} from "react";
import {Button} from "@/components/ui/button";
import {globalContext} from "@/components/GlobalContext";

interface InterviewSelectionFormatProps {

}

export const InterviewSelectionFormat: FC<InterviewSelectionFormatProps> = () => {
    const {componentStep, setComponentStep} = useContext(globalContext);
    return (
        <div className='mt-36 ml-16'>
            <h1 className="text-4xl mt-6">Sélectionner le format de l&apos;interview</h1>
            <div className='mt-36'>
                <Button
                    onClick={() => setComponentStep(1)}
                >
                    Commencer l&apos;interview
                </Button>
            </div>
        </div>
    )
}