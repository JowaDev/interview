import {FC} from "react";
import {switchQuestion} from "@/lib/utils";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
import {interactiveInterview} from "@/components/GlobalContext";

interface QuestionSwitcherProps {
    setStep: (step: (prevStep: number) => number) => void;
    step: number;
    stepLength: number;
    setInteractiveInterview: (state: (prevState: interactiveInterview) => interactiveInterview) => void
    setCompleted: (state: boolean) => void;
    setRecordedChunks: (state: Blob[]) => void;
    setSeconds: (state: number) => void;
    setIsSuccess: (state: boolean) => void;
}

export const QuestionSwitcher: FC<QuestionSwitcherProps> = (
    {
        step,
        setStep,
        stepLength,
        setInteractiveInterview,
        setCompleted,
        setRecordedChunks,
        setSeconds,
        setIsSuccess,
    }
) => {
    return (
        <Select
            onValueChange={(nQuestion) => switchQuestion(
                setStep,
                parseInt(nQuestion),
                step,
                setInteractiveInterview,
                setCompleted,
                setRecordedChunks,
                setSeconds,
                setIsSuccess,
            )}
            defaultValue={(step + 1).toString()}
        >
            <SelectTrigger className="w-[180px] absolute left-[10%]">
                <SelectValue placeholder="N° Question"/>
            </SelectTrigger>
            <SelectContent>
                {
                    Array.from({length: stepLength}, (_, i) => i + 1).map((nQuestion, i) => (
                        <SelectItem key={i} value={nQuestion.toString()}>
                            Question {nQuestion}
                        </SelectItem>
                    ))
                }
            </SelectContent>
        </Select>
    )
}