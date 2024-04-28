import {Dispatch, FC, SetStateAction, useEffect} from "react";
import {Message, useChat} from "ai/react";
import {Button} from "@/components/ui/button";
import {Textarea} from "@/components/ui/textarea";
import {generateId} from "ai";
import {interactiveInterview} from "@/components/GlobalContext";

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
}

const scrollDownSmoothly = () => {
    setTimeout(() => {
        window.scroll({behavior: "smooth", top: document.body.scrollHeight});
    }, 500);
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
                                                              setRecordedChunks
                                                          }) => {
    const {messages, input, handleInputChange, handleSubmit} = useChat({
        api: "/api/feedback",
        initialMessages: [
            {
                id: generateId(),
                role: "system",
                content: `Tu expert en ressources humaines ainsi que du domaine suivant : ${jobSelection}. Tu es en plein job interview avec un futur collaborateur. Tu as posé la question suivante : ${question}. Assure-toi qu'il explique correctement ses pensées de manière cohérente. Assure-toi qu'il' reste sur le sujet et qu'il soit pertinente par rapport à la question. Donne un feedback mais aussi des conseils sur comment est-ce qu'il aurait pu répondre, il est tout à fait possible que la personne réponde correctement. Tu vas devoir répondre uniquement dans ce format : "Feedback puis Conseils". Tu vas devoir répondre comme si tu répondait directement à la personne en la vouvoyant. Voici la réponse de la personne :`
            },
        ],
    });
    useEffect(() => {
        scrollDownSmoothly();
    }, []);
    return (
        <div className="w-full flex flex-col max-w-[1080px] mx-auto mt-[10vh] overflow-y-auto pb-8 md:pb-12">
            <h1 className='text-3xl text-center font-bold mb-14 uppercase'>{jobSelection}</h1>
            <h2 className="text-2xl font-semibold text-left text-[#1D2B3A] mb-2">
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
                            onChange={handleInputChange}
                            className="prose prose-sm w-[90%] mx-auto flex items-center"
                            defaultValue={transcript}
                        />
                        <Button
                            type="submit"
                            className="mt-4 w-1/3 mx-auto flex items-center"
                            onClick={scrollDownSmoothly}
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
                                        setSeconds(0);
                                        step < stepLength && setStep(prevStep => prevStep + 1)
                                        setRecordedChunks([]);
                                        setInteractiveInterview(prevState => ({
                                            ...prevState,
                                            steps: prevState.steps.map((s, i) => i === step ? {
                                                ...s,
                                                answer: messages
                                            } : s)
                                        }));
                                        setCompleted(false);
                                    }}
                                >
                                    Question suivante
                                </Button>
                            </div>
                        </div>
                    )
                }
            </div>
        </div>
    )
}