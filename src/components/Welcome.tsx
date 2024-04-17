'use client'

import {FC, useContext} from "react";
import Image from "next/image";
import {globalContext} from "@/components/GlobalContext";
import {CarouselNext} from "@/components/ui/carousel";

interface WelcomeProps {

}

export const Welcome: FC<WelcomeProps> = () => {
    const {setWelcomeState} = useContext(globalContext);
    return (
        <div className='mt-36 ml-16 w-full'>
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