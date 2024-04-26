'use client'

import {FC, useContext} from "react";
import {globalContext} from "@/components/GlobalContext";
import {CarouselNext, CarouselPrevious} from "@/components/ui/carousel";
import {Input} from "@/components/ui/input"
import {Label} from "@/components/ui/label"

interface Dropzone {

}

export const Dropzone: FC<Dropzone> = () => {
    return (
        <div className='mt-36 ml-16'>
            <h1 className="text-4xl mt-6">Déposez vos fichiers</h1>
            <div className='mt-16 flex flex-col gap-6 justify-center'>
                    <Label htmlFor="picture" >Drop zone</Label>
                    <Input id="picture" type="file" accept='' className="border-dashed border-black h-36"/>
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
                    text="Continuer"
                >
                </CarouselNext>
            </div>
        </div>
    )
}