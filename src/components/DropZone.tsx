'use client'

import {FC, useContext} from "react";
import {CarouselNext, CarouselPrevious} from "@/components/ui/carousel";
import {Input} from "@/components/ui/input"
import {Label} from "@/components/ui/label"
import {globalContext} from "@/components/GlobalContext";
import {summarizeContentService} from "@/lib/services";
import {LoaderCircle} from "lucide-react";

interface DropZoneProps {

}

export const DropZone: FC<DropZoneProps> = () => {
    const {
        jobSelection,
        interviewSelectionTypeState,
        setSummarizeContent,
        summarizeContent,
        isLoading,
        setIsLoading
    } = useContext(globalContext);
    return (
        <div className='mt-36 ml-16'>
            <h1 className="text-4xl mt-6">Déposez vos fichiers</h1>
            <form
                className='mt-16 flex flex-col gap-6 justify-center'
                onSubmit={e => summarizeContentService(e, setSummarizeContent, setIsLoading, jobSelection, interviewSelectionTypeState)}
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
                        type='button'
                    >
                    </CarouselPrevious>
                    {
                        summarizeContent?.results && !isLoading ? (
                            <CarouselNext
                                variant='default'
                                className='w-1/4 bg-green-600'
                                text="Continuer"
                                type='submit'
                            />
                        ) : (
                            <CarouselNext
                                variant='default'
                                className='w-1/4'
                                text='Envoyer'
                                type='submit'
                                disabled={isLoading}
                                onClick={() => void 0}
                            >
                                {isLoading && (<LoaderCircle className='animate-spin'/>)}
                            </CarouselNext>
                        )
                    }
                </div>
            </form>
        </div>
    )
}