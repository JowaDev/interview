'use client'

import {FC, useContext, useEffect} from "react";
import {CarouselNext, CarouselPrevious, useCarousel} from "@/components/ui/carousel";
import {Input} from "@/components/ui/input"
import {Label} from "@/components/ui/label"
import {summarizeAction} from "@/lib/actions/summarizeAction";
import {globalContext} from "@/components/GlobalContext";

interface Dropzone {

}

export const Dropzone: FC<Dropzone> = () => {
    const {setExtractedContent, extractedContent} = useContext(globalContext);
    const {scrollNext} = useCarousel()
    return (
        <div className='mt-36 ml-16'>
            <h1 className="text-4xl mt-6">Déposez vos fichiers</h1>
            <form
                action={(formData) => summarizeAction(formData).then((res) => setExtractedContent(res)).catch(err => alert(err))}
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
                    onChange={(event) => {
                        const formData = new FormData();
                        formData.append('pdf', event.target.files![0]);
                        summarizeAction(formData)
                            .then((res) => setExtractedContent(res))
                            .catch(err => alert(err));
                    }}
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
                        onClick={!extractedContent.length ? () => void 0 : scrollNext}
                    >
                    </CarouselNext>
                </div>
            </form>
        </div>
    )
}