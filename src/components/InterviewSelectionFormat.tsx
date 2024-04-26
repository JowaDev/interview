'use client'

import {FC} from "react";
import {CarouselPrevious} from "@/components/ui/carousel";
import {Button} from "@/components/ui/button";
import Link from "next/link";

interface InterviewSelectionFormatProps {

}

export const InterviewSelectionFormat: FC<InterviewSelectionFormatProps> = () => {
    return (
        <div className='mt-36 ml-16'>
            <h1 className="text-4xl mt-6">Sélectionner le format de l&apos;interview</h1>
            <div className='mt-36 flex flex-col gap-6 justify-center'>
                <Link
                    href='/interactive-interview'
                >
                    <Button
                        className='w-full'
                    >
                        Interview interactif
                    </Button>
                </Link>
                <Button
                >
                    Générer un PDF Q/A
                </Button>
            </div>
            <div className='mt-36 w-full gap-4 flex justify-start'>
                <CarouselPrevious
                    variant='default'
                    className='w-1/4'
                    text="Retour"
                >
                </CarouselPrevious>
            </div>
        </div>
    )
}