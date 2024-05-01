'use client'

import {FC, useContext} from "react";
import {CarouselPrevious} from "@/components/ui/carousel";
import {Button} from "@/components/ui/button";
import {globalContext} from "@/components/GlobalContext";
import {LoaderCircle} from "lucide-react";
import {generateInteractiveInterviewService} from "@/lib/services";
import {useRouter} from "next/navigation";
import {clsx} from "clsx";
import {useLocalStorageInteractiveInterview} from "@/lib/hooks";

interface InterviewSelectionFormatProps {

}

export const InterviewSelectionFormat: FC<InterviewSelectionFormatProps> = () => {
    const router = useRouter()
    const {
        jobSelection,
        interviewSelectionTypeState,
        summarizeContent,
        isLoading,
        setIsLoading,
        setInteractiveInterview,
        interactiveInterview
    } = useContext(globalContext)
    const {
        setLocalStorageInteractiveInterview,
    } = useLocalStorageInteractiveInterview()
    return (
        <div className='mt-36 ml-16'>
            <h1 className="text-4xl mt-6">Sélectionner le format de l&apos;interview</h1>
            <div className='mt-36 flex flex-col gap-6 justify-center'>
                <Button
                    className={clsx('w-full', isLoading && 'cursor-not-allowed', interactiveInterview?.steps?.length && 'bg-green-600')}
                    onClick={() => {
                        router.prefetch('interactive-interview');
                        generateInteractiveInterviewService(summarizeContent, setIsLoading, setInteractiveInterview, jobSelection, interviewSelectionTypeState, setLocalStorageInteractiveInterview).then(() => router.push('interactive-interview'))
                    }}
                    disabled={isLoading}
                >
                    {isLoading ? <LoaderCircle className='animate-spin'/> : 'Interview interactif'}
                </Button>
                <Button
                    disabled={isLoading}
                    className={clsx('w-full')}
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