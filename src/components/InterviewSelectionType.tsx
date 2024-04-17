'use client'

import {FC, useContext, useEffect} from "react";
import {globalContext} from "@/components/GlobalContext";
import {Button} from "@/components/ui/button";
import {CarouselNext, CarouselPrevious} from "@/components/ui/carousel";

interface InterviewSelectionTypeProps {

}

export const InterviewSelectionType: FC<InterviewSelectionTypeProps> = () => {
    const {setInterviewSelectionTypeState, interviewSelectionTypeState} = useContext(globalContext);
    return (
        <div className='mt-36 ml-16'>
            <h1 className="text-4xl mt-6">Sélection de type d'interview</h1>
            <div className='mt-36 flex flex-col gap-6 justify-center'>
                <Button
                    className="focus-within:bg-green-400"

                    onClick={ () => setInterviewSelectionTypeState("soft")}
                >
                    Soft skills
                </Button>
                <Button
                    className="focus-within:bg-green-400"
                    onClick={ () => setInterviewSelectionTypeState("hard")}
                >
                    Hard skills
                </Button>
                <Button
                    className="focus-within:bg-green-400"
                    onClick={ () => setInterviewSelectionTypeState("mix")}
                >
                    Mixte
                </Button>
            </div>
            <div className='mt-36 w-full gap-4 flex justify-around'>
                <CarouselPrevious
                    variant='default'
                    className='w-1/4'
                    text="Retour"
                >
                </CarouselPrevious>
                <CarouselNext
                    variant='default'
                    className='w-1/4'
                    text="Continuer"
                >
                </CarouselNext>
            </div>
        </div>
    )
}