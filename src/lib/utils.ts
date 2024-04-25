import {type ClassValue, clsx} from "clsx"
import {twMerge} from "tailwind-merge"
import {createFFmpeg} from "@ffmpeg/ffmpeg";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}

export const ffmpeg = createFFmpeg({
    corePath: "http://localhost:3000/ffmpeg/dist/ffmpeg-core.js",
    log: true,
});