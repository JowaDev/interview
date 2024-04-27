'use client'

import {FC, useContext} from "react";
import {CarouselNext, CarouselPrevious, useCarousel} from "@/components/ui/carousel";
import {Input} from "@/components/ui/input";
import {globalContext} from "@/components/GlobalContext";

interface JobSelectionProps {

}

export const JobSelection: FC<JobSelectionProps> = () => {
    const {jobSelection, setJobSelection} = useContext(globalContext);
    const {scrollNext} = useCarousel()
    return (
        <div className='mt-36 ml-16'>
            <h1 className="text-4xl mt-6">Veuillez fournir le domaine, le métier spécifique ou le cursus de votre
                formation</h1>
            <div className='mt-36 flex flex-col gap-6 justify-center'>
                <Input
                    type="text"
                    placeholder="IT, Data Scientist, Informatique de gestion"
                    onChange={(e) => setJobSelection(e.target.value)}
                    required={true}
                />
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
                    disabled={!jobSelection}
                    onClick={jobSelection ? scrollNext : () => void 0}
                >
                </CarouselNext>
            </div>
        </div>
    )
}