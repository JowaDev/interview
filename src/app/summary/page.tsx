'use client';

import {useLocalStorageInteractiveInterview, useLocalStorageJobSelection} from "@/lib/hooks";
import {interactiveInterview} from "@/components/GlobalContext";
import {Message} from "ai/react";
import {LearnDeeper} from "@/components/LearnDeeper";

interface SummaryProps {
}

export default function SummaryPage(props: SummaryProps) {
    const {localStorageInteractiveInterview} = useLocalStorageInteractiveInterview();
    const {localStorageJobSelection} = useLocalStorageJobSelection();
    const interview: interactiveInterview | null = localStorageInteractiveInterview || null;
    return (
        <div
            className="w-full min-h-screen flex flex-col px-4 pt-2 pb-8 md:px-8 md:py-2 bg-[#FCFCFC] relative overflow-x-hidden">
            <div className="w-full flex flex-col max-w-[1080px] mx-auto mt-[10vh] overflow-y-auto pb-8 md:pb-12">
                <h1 className="text-3xl text-center font-bold mb-14 uppercase">{localStorageJobSelection}</h1>
                <h2 className="text-2xl font-semibold text-left text-[#1D2B3A] mb-2">
                    Aperçu global de l&apos;entretien
                </h2>
                <div className="mt-8">
                    {interview ? (
                        interview.steps?.map((step, index: number) => (
                            <div key={index} className="mt-8 transition duration-300 ease-in-out">
                                <div
                                    className="mt-4 text-sm gap-2.5 rounded-lg border border-[#EEEEEE] bg-[#FAFAFA] p-4 leading-6 text-gray-900 min-h-[100px]">
                                    <div className="whitespace-pre-wrap text-xl mt-2 space-y-4">
                                        <p><strong>Question {index + 1} : </strong> {step.question}</p>
                                        <p><strong>Mot-clé :</strong> {step.fromKeyword}</p>
                                        <div className='space-y-4'>
                                            {step.answer && Array.isArray(step.answer) && step.answer.length > 0 && (
                                                <>
                                                    <p><strong>Conversation :</strong></p>
                                                    <div
                                                        className='p-6 border-dashed border-2 border-accent-foreground rounded-2xl space-y-4'>
                                                        {
                                                            step.answer.slice(1).map((message: Message, msgIndex: number) => (
                                                                <p key={msgIndex}>
                                                                    <strong>{message.role === "assistant" ? "Expert :" : "Vous :"}</strong> {message.content}
                                                                </p>
                                                            ))
                                                        }
                                                    </div>
                                                </>
                                            )}
                                        </div>
                                        <LearnDeeper
                                            step={step}
                                            question={step.question}
                                            jobSelection={localStorageJobSelection}
                                        />
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p>No interview data available.</p>
                    )}
                </div>
            </div>
        </div>
    );
}
