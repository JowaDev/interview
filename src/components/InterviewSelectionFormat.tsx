'use client'

import {FC} from "react";
import Image from "next/image";
import {CarouselNext, CarouselPrevious} from "@/components/ui/carousel";
import {Button} from "@/components/ui/button";

interface InterviewSelectionFormatProps {

}

export const InterviewSelectionFormat: FC<InterviewSelectionFormatProps> = () => {
    return (
        <div className='mt-36 ml-16'>
            <h1 className="text-4xl mt-6">Sélectionner le format de l&apos;interview</h1>
            <div className='mt-36 flex flex-col gap-6 justify-center'>
                <Button
                    className="focus-within:bg-green-400"
                >
                    Interactive interview
                </Button>
                <Button
                    className="focus-within:bg-green-400"
                >
                    Générer un questionnaire PDF Q/R
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