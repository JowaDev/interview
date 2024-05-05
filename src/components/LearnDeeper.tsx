'use client'

import {FC} from "react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@/components/ui/dialog";
import {Message, useChat} from "ai/react";
import {interactiveInterview} from "@/components/GlobalContext";
import {generateId} from "ai";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";

interface LearnDeeperProps {
    step: interactiveInterview['steps'][0]
    jobSelection: string
    question: string
}

export const LearnDeeper: FC<LearnDeeperProps> = ({step, jobSelection, question}) => {
    const {messages, input, handleInputChange, handleSubmit} = useChat({
        api: "/api/feedback",
        initialMessages: step.answer ? step.answer as Message[] : [
            {
                id: generateId(),
                role: "system",
                content: `Tu expert du domaine suivant : ${jobSelection} et aussi qualifié en tant que responsable ressource humaine. Tu es en plein job interview avec un futur collaborateur, tu fais passer un entretien d'embauche. Tu as posé la question suivante : ${question}. Assure-toi qu'il explique correctement ses pensées de manière cohérente. Assure-toi qu'il' reste sur le sujet et qu'il soit pertinente par rapport à la question. Donne un feedback mais aussi des conseils sur comment est-ce qu'il aurait pu répondre, il est tout à fait possible que la personne réponde correctement. Tu vas devoir répondre uniquement dans la structure suivante, premièrement 'Feedback' et enfin un 'Conseil'. Tu vas devoir répondre comme si tu répondait directement à la personne en la vouvoyant. Voici la réponse de la personne :`
            },
        ],
    });
    return (
        <div className='flex justify-end'>
            <Dialog>
                <DialogTrigger
                    className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2"
                >
                    Je veux en savoir plus !
                </DialogTrigger>
                <DialogContent className='md:min-w-[750px]'>
                    <DialogHeader>
                        <DialogTitle>{step.question}</DialogTitle>
                        <DialogDescription>
                            Vous pouvez approfondir vos connaissances sur le sujet !
                        </DialogDescription>
                    </DialogHeader>
                    <div
                        className="grid grid-cols-2 mt-4 gap-2.5 rounded-lg border border-[#EEEEEE] bg-[#FAFAFA] p-4 leading-6 text-gray-900 min-h-[100px]">
                        {messages.slice(1).map((message, index) => (
                            <div key={message.id} className="col-span-2">
                                <div className={index % 2 === 0 ? 'text-right' : ''}>
                                    {message.role === 'user' ?
                                        <span className='mr-4'>Vous :</span> :
                                        <span className='mr-4'>Expert :</span>}
                                    {message.content}
                                </div>
                            </div>
                        ))}
                        <div className="col-span-2 flex items-center">
                            <form onSubmit={handleSubmit} className="flex-grow flex">
                                <Input
                                    name="prompt"
                                    value={input}
                                    onChange={handleInputChange}
                                    id="input"
                                />
                                <Button
                                    type="submit"
                                    className='ml-2'
                                >
                                    Submit
                                </Button>
                            </form>
                        </div>
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    )
}