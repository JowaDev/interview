'use client'

import {FC} from "react";
import {CarouselNext, CarouselPrevious} from "@/components/ui/carousel";
import {Input} from "@/components/ui/input"
import {Label} from "@/components/ui/label"
import {summarizeAction} from "@/lib/actions/summarizeAction";

interface Dropzone {

}

export const Dropzone: FC<Dropzone> = () => {
    return (
        <div className='mt-36 ml-16'>
            <h1 className="text-4xl mt-6">Déposez vos fichiers</h1>
            <form
                action={(formData) => summarizeAction(formData).then((res) => console.log(res))}
                className='mt-16 flex flex-col gap-6 justify-center'
            >
                <Label htmlFor="pdf">Drop zone</Label>
                <Input
                    id="pdf"
                    name='pdf'
                    type="file"
                    accept='.pdf'
                    required={true}
                    className="border-dotted border-black h-36 text-center"
                />
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
                        type='submit'
                        onClick={() => void -1}
                    >
                    </CarouselNext>
                </div>
            </form>
        </div>
    )
}