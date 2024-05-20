import {type ClassValue, clsx} from "clsx"
import {twMerge} from "tailwind-merge"
import {createFFmpeg} from "@ffmpeg/ffmpeg";
import {interactiveInterview} from "@/components/GlobalContext";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}

export const ffmpeg = createFFmpeg({
    corePath: "https://unpkg.com/@ffmpeg/core@0.11.0/dist/ffmpeg-core.js",
    log: true,
});

export const scrollDownSmoothly = () => {
    setTimeout(() => {
        window.scroll({behavior: "smooth", top: document.body.scrollHeight});
    }, 500);
}

export const switchQuestion = (setStep: (step: (prevStep: number) => number) => void, nQuestion: number, step: number, setInteractiveInterview: (state: (prevState: interactiveInterview) => interactiveInterview) => void, setCompleted: (state: boolean) => void, setRecordedChunks: (state: Blob[]) => void, setSeconds: (state: number) => void, setIsSuccess: (state: boolean) => void) => {
    setIsSuccess(false);
    setRecordedChunks([]);
    setSeconds(0);
    setCompleted(false);
    setStep(() => nQuestion - 1);
};