'use client'

import {FC} from "react";
import Image from "next/image";
import {CarouselNext} from "@/components/ui/carousel";
import {useLocalStorageInitStep} from "@/lib/hooks";

interface WelcomeProps {

}

export const Welcome: FC<WelcomeProps> = () => {
    useLocalStorageInitStep()
    return (
        <div className='mt-36 mx-16 w-full'>
            <Image
                src="/logo/HES.png"
                alt="HES Logo"
                width={200}
                height={200}
            />
            <h1 className="text-4xl mt-6">Jobs interview</h1>
            <div className='mt-36'>
                <CarouselNext
                    variant='default'
                    className='w-1/2'
                    text="Commencer l'interview"
                >
                </CarouselNext>
            </div>
        </div>
    )
}