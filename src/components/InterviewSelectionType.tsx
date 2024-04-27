'use client'

import {FC, useContext} from "react";
import {globalContext} from "@/components/GlobalContext";
import {Button} from "@/components/ui/button";
import {CarouselNext, CarouselPrevious} from "@/components/ui/carousel";
import {clsx} from "clsx";

interface InterviewSelectionTypeProps {

}

export const InterviewSelectionType: FC<InterviewSelectionTypeProps> = () => {
    const {setInterviewSelectionTypeState, interviewSelectionTypeState} = useContext(globalContext);
    return (
        <div className='mt-36 ml-16'>
            <h1 className="text-4xl mt-6">Sélection du type d&apos;interview</h1>
            <div className='mt-36 flex flex-col gap-6 justify-center'>
                <Button
                    className={clsx(interviewSelectionTypeState === "sur les softs skills" && "bg-green-400", 'hover:bg-green-400/90')}
                    onClick={() => setInterviewSelectionTypeState("sur les softs skills")}
                >
                    Soft skills
                </Button>
                <Button
                    className={clsx(interviewSelectionTypeState === "sur les hard skills" && "bg-green-400", 'hover:bg-green-400/90')}
                    onClick={() => setInterviewSelectionTypeState("sur les hard skills")}
                >
                    Hard skills
                </Button>
                <Button
                    className={clsx(interviewSelectionTypeState === "autant sur les softs que les hard skills" && "bg-green-400", 'hover:bg-green-400/90')}
                    onClick={() => setInterviewSelectionTypeState("autant sur les softs que les hard skills")}
                >
                    Mixte
                </Button>
            </div>
            <div className='mt-36 w-full gap-4 flex justify-between'>
                <CarouselPrevious
                    variant='default'
                    className='w-1/4'
                    text="Retour"
                >
                </CarouselPrevious>
                <CarouselNext
                    variant='default'
                    className='w-1/4'
                    disabled={!interviewSelectionTypeState}
                    text="Continuer"
                    onClick={interviewSelectionTypeState ? undefined : () => void 0}
                >
                </CarouselNext>
            </div>
        </div>
    )
}