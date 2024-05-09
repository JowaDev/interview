'use client'

import {FC, useContext, useState} from "react";
import {CarouselPrevious} from "@/components/ui/carousel";
import {Button} from "@/components/ui/button";
import {globalContext} from "@/components/GlobalContext";
import {DownloadIcon, LoaderCircle} from "lucide-react";
import {generateInteractiveInterviewService, generatePDFService} from "@/lib/services";
import {useRouter} from "next/navigation";
import {clsx} from "clsx";
import {useLocalStorageInteractiveInterview} from "@/lib/hooks";
import Link from "next/link";

interface InterviewSelectionFormatProps {

}

export const InterviewSelectionFormat: FC<InterviewSelectionFormatProps> = () => {
    const router = useRouter()
    const [pdfURL, setPdfURL] = useState<string>('')
    const [isInteractiveInterview, setIsInteractiveInterview] = useState<boolean>(false)
    const {
        jobSelection,
        interviewSelectionTypeState,
        summarizeContent,
        isLoading,
        setIsLoading,
        setInteractiveInterview,
        interactiveInterview,
        skills
    } = useContext(globalContext)
    const {
        setLocalStorageInteractiveInterview,
        localStorageInteractiveInterview
    } = useLocalStorageInteractiveInterview()
    return (
        <div className='mt-36 ml-16'>
            <h1 className="text-4xl mt-6">Sélectionner le format de l&apos;interview</h1>
            <div className='mt-36 flex flex-col gap-6 justify-center'>
                <div
                    className='relative flex justify-between gap-8 w-full'
                >
                    <Button
                        className={clsx('w-full', isLoading && 'cursor-not-allowed', interactiveInterview?.steps?.length && isInteractiveInterview && 'bg-green-600')}
                        onClick={() => {
                            router.prefetch('interactive-interview');
                            generateInteractiveInterviewService(summarizeContent, setIsLoading, setInteractiveInterview, jobSelection, interviewSelectionTypeState, setLocalStorageInteractiveInterview, setIsInteractiveInterview, skills).then(() => router.push('interactive-interview'))
                        }}
                        disabled={isLoading}
                    >
                        {isLoading && isInteractiveInterview ?
                            <LoaderCircle className='animate-spin'/> : 'Interview interactif'}
                    </Button>
                    {
                        localStorageInteractiveInterview.steps?.length ? (
                            <Link
                                href='/interactive-interview'
                                className={`absolute right-2 flex justify-center items-center top-[50%] transform translate-y-[-50%] gap-2 ${isLoading && 'pointer-events-none'}`}
                                aria-disabled={isLoading}

                            >
                                <DownloadIcon className='w-6 h-6 text-orange-300'/>
                            </Link>
                        ) : null
                    }
                </div>
                {
                    pdfURL ? (
                        <Link
                            href={pdfURL}
                            target="_blank"
                            rel="noreferrer"
                            className='w-full bg-green-600 text-white py-2 text-center animate-pulse'
                        >
                            Télécharger le PDF
                        </Link>
                    ) : (
                        <Button
                            disabled={isLoading}
                            className={clsx('w-full', isLoading && 'cursor-not-allowed', interactiveInterview?.steps?.length && !isInteractiveInterview && 'bg-green-600')}
                            onClick={() => generatePDFService(summarizeContent, jobSelection, interviewSelectionTypeState, setIsLoading, setPdfURL, setIsInteractiveInterview, skills)}
                        >
                            {isLoading && !isInteractiveInterview ?
                                <LoaderCircle className='animate-spin'/> : 'Générer un PDF Q/A'}
                        </Button>
                    )
                }
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