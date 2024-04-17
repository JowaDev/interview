'use client'

import {FC} from "react";
import Image from "next/image";
import {CarouselNext, CarouselPrevious} from "@/components/ui/carousel";

interface InterviewSelectionFormatProps {

}

export const InterviewSelectionFormat: FC<InterviewSelectionFormatProps> = () => {
    return (
        <div className='mt-36 ml-16 w-full'>
            <Image
                src="/logo/HES.png"
                alt="HES Logo"
                width={200}
                height={200}
            />
            <h1 className="text-4xl mt-6">Sélectionner le format de l&apos;interview</h1>
            <div className='mt-36'>
                <CarouselPrevious
                    variant='default'
                    className='w-1/2'
                    text="Interview intéractif"
                >
                </CarouselPrevious>
                <CarouselNext
                    variant='default'
                    className='w-1/2'
                    text="Interview intéractif"
                >
                </CarouselNext>
            </div>
        </div>
    )
}