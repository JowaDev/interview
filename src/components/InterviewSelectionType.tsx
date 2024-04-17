'use client'

import {FC, useContext} from "react";
import {globalContext} from "@/components/GlobalContext";
import {Button} from "@/components/ui/button";

interface InterviewSelectionTypeProps {

}

export const InterviewSelectionType: FC<InterviewSelectionTypeProps> = () => {
    const {componentStep, setComponentStep} = useContext(globalContext);
    return (
        <div className='mt-36 ml-16'>
            <h1 className="text-4xl mt-6">Sélection de type d'interview</h1>
            <div className='mt-36 flex flex-col gap-6'>
                <Button className="focus-within:bg-green-400">Soft skills</Button>
                <Button className="focus-within:bg-green-400">Hard skills</Button>
                <Button className="focus-within:bg-green-400">Mixte</Button>
            </div>
            <div className="inline-flex mt-12 ml-12 gap-4">
                <button className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-l">
                    Précédent
                </button>
                <button className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-r">
                    Suivant
                </button>
            </div>
        </div>
    )
}