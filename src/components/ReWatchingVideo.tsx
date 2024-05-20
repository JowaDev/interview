import {Dispatch, FC, LegacyRef, SetStateAction} from "react";
import {Message, useChat} from "ai/react";
import {Button} from "@/components/ui/button";
import {Textarea} from "@/components/ui/textarea";
import {generateId} from "ai";
import {interactiveInterview} from "@/components/GlobalContext";
import {scrollDownSmoothly} from "@/lib/utils";
import {useScrollDownSmoothly, useSyncChatInput} from "@/lib/hooks";
import {useRouter} from "next/navigation";
import {QuestionSwitcher} from "@/components/QuestionSwitcher";

interface ReWatchingVideoProps {
    recordedChunks: BlobPart[];
    transcript: string;
    question: string;
    jobSelection: string;
    stepLength: number;
    setStep: (step: (prevStep: number) => number) => void;
    setInteractiveInterview: (state: (prevState: interactiveInterview) => interactiveInterview) => void
    step: number;
    setCompleted: (state: boolean) => void;
    setSeconds: (state: number) => void;
    setRecordedChunks: Dispatch<SetStateAction<Blob[]>>;
    setIsSuccess: (state: boolean) => void;
    answer: Message[] | string
}

export const ReWatchingVideo: FC<ReWatchingVideoProps> = ({
                                                              transcript,
                                                              recordedChunks,
                                                              question,
                                                              jobSelection,
                                                              stepLength,
                                                              setStep,
                                                              setInteractiveInterview,
                                                              step,
                                                              setCompleted,
                                                              setSeconds,
                                                              setRecordedChunks,
                                                              setIsSuccess,
                                                              answer
                                                          }) => {
    const {messages, handleInputChange, handleSubmit} = useChat({
        api: "/api/feedback",
        initialMessages: answer ? answer as Message[] : [
            {
                id: generateId(),
                role: "system",
                content: `Tu expert du domaine suivant : ${jobSelection} et aussi qualifié en tant que responsable ressource humaine. Tu es en plein job interview avec un futur collaborateur, tu fais passer un entretien d'embauche. Tu as posé la question suivante : ${question}. Assure-toi qu'il explique correctement ses pensées de manière cohérente. Assure-toi qu'il' reste sur le sujet et qu'il soit pertinente par rapport à la question. Donne un feedback mais aussi des conseils sur comment est-ce qu'il aurait pu répondre, il est tout à fait possible que la personne réponde correctement. Tu vas devoir répondre uniquement dans la structure suivante, premièrement 'Feedback' et enfin un 'Conseil'. Tu vas devoir répondre comme si tu répondait directement à la personne en la vouvoyant. Voici la réponse de la personne :`
            },
        ],
    });
    useScrollDownSmoothly()
    const router = useRouter()
    const {inputRef} = useSyncChatInput(handleInputChange, step)
    return (
        <div className="w-full flex flex-col max-w-[1080px] mx-auto mt-[10vh] overflow-y-auto pb-8 md:pb-12">
            <QuestionSwitcher
                setStep={setStep}
                stepLength={stepLength}
                setInteractiveInterview={setInteractiveInterview}
                setCompleted={setCompleted}
                setRecordedChunks={setRecordedChunks}
                setSeconds={setSeconds}
                setIsSuccess={setIsSuccess}
                step={step}
            />
            <h1 className='text-3xl text-center font-bold uppercase'>{jobSelection}</h1>
            <span
                className='absolute right-[10%] border-dashed rounded-2xl border-2 p-4'>{step + 1} / {stepLength}</span>
            <h2 className="text-2xl mt-14 font-semibold text-left text-[#1D2B3A] mb-2">
                {question}
            </h2>
            <span className="text-[13px] leading-[20px] text-[#1a2b3b] font-normal mb-4">
                Selon les informations que vous avez fournies, nous avons préparé un ensemble de questions pour vous. Vous pouvez répondre à ces questions en enregistrant une vidéo.
            </span>
            <div
                className="relative md:aspect-[16/9] w-full max-w-[1080px] overflow-hidden bg-[#1D2B3A] rounded-lg ring-1 ring-gray-900/5 shadow-md flex flex-col items-center justify-center"
            >
                <video
                    className="w-full h-full rounded-lg"
                    controls
                    crossOrigin="anonymous"
                    autoPlay
                >
                    <source
                        src={URL.createObjectURL(
                            new Blob(recordedChunks, {type: "video/mp4"})
                        )}
                        type="video/mp4"
                    />
                </video>
            </div>
            <div
                className="mt-8"
            >
                <div>
                    <form onSubmit={handleSubmit}>
                        <Textarea
                            ref={inputRef as LegacyRef<HTMLTextAreaElement>}
                            onChange={handleInputChange}
                            className="prose prose-sm w-[90%] mx-auto flex items-center"
                            defaultValue={transcript}
                        />
                        <Button
                            type="submit"
                            className="mt-4 w-1/3 mx-auto flex items-center"
                            onClick={() => {
                                inputRef.current ? inputRef.current.value = '' : null
                                scrollDownSmoothly()
                            }}
                        >
                            {
                                messages.length > 1 ? 'Poser une question supplémentaire' : 'Évaluer la réponse'
                            }
                        </Button>
                    </form>
                </div>
                {
                    messages.length > 1 && (
                        <div className="mt-8 transition duration-300 ease-in-out">
                            <h2 className="text-xl font-semibold text-left text-[#1D2B3A] mb-2">
                                Feedback
                            </h2>
                            <div
                                className="mt-4 text-sm gap-2.5 rounded-lg border border-[#EEEEEE] bg-[#FAFAFA] p-4 leading-6 text-gray-900 min-h-[100px]">
                                <div className="whitespace-pre-wrap text-xl mb-6 mt-2">
                                    {question}
                                </div>
                                {messages.slice(1).map((m: Message) => (
                                    <div key={m.id} className="whitespace-pre-wrap m-6">
                                        {m.role === 'user' ? <span className='mr-4'>Vous :</span> :
                                            <span className='mr-4'>Expert :</span>}
                                        {m.content}
                                    </div>
                                ))}
                            </div>
                            <div className='flex justify-end mt-4'>
                                <Button
                                    type="button"
                                    className="w-1/3"
                                    onClick={() => {
                                        setIsSuccess(false);
                                        setRecordedChunks([]);
                                        setSeconds(0);
                                        setInteractiveInterview(prevState => ({
                                            ...prevState,
                                            steps: prevState.steps.map((s, i) => i === step ? {
                                                ...s,
                                                answer: messages || ""
                                            } : s)
                                        }));
                                        if (step < stepLength - 1) {
                                            setStep(prevStep => prevStep + 1)
                                        } else {
                                            router.push('/summary');
                                        }
                                        setCompleted(false);
                                    }}
                                >
                                    {
                                        step < stepLength - 1 ? 'Question suivante' : 'Terminer'
                                    }
                                </Button>
                            </div>
                        </div>
                    )
                }
            </div>
        </div>
    )
}