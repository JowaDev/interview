'use client'

import {FC, useContext, useEffect} from "react";
import Image from "next/image";
import {Button} from "@/components/ui/button";
import {globalContext} from "@/components/GlobalContext";

interface WelcomeProps {

}

export const Welcome: FC<WelcomeProps> = () => {
    const {componentStep, setComponentStep} = useContext(globalContext);
    return (
        <div className='mt-36 ml-16'>
            <Image
                src="/logo/HES.png"
                alt="HES Logo"
                width={200}
                height={200}
            />
            <h1 className="text-4xl mt-6">Jobs interview</h1>
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