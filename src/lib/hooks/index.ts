'use client'

import {ChangeEvent, MutableRefObject, useEffect, useRef, useState} from "react";
import {interactiveInterview} from "@/components/GlobalContext";
import {scrollDownSmoothly} from "@/lib/utils";

export const useLocalStorageInteractiveInterview = () => {
    const [localStorageInteractiveInterview, setLocalStorageInteractiveInterview] = useState<interactiveInterview>({} as interactiveInterview);

    useEffect(() => {
        if (localStorage.getItem('interactiveInterview')) {
            setLocalStorageInteractiveInterview(JSON.parse(localStorage.getItem('interactiveInterview') as string));
        }
    }, [])

    useEffect(() => {
        if (localStorageInteractiveInterview.steps?.length) {
            localStorage.setItem('interactiveInterview', JSON.stringify(localStorageInteractiveInterview));
        }
    }, [localStorageInteractiveInterview])

    return {localStorageInteractiveInterview, setLocalStorageInteractiveInterview}
};

export const useLocalStorageJobSelection = () => {
    const [localStorageJobSelection, setLocalStorageJobSelection] = useState<string>("");

    useEffect(() => {
        if (localStorage.getItem('jobSelection')) {
            setLocalStorageJobSelection(localStorage.getItem('jobSelection') as string);
        }
    }, [])

    useEffect(() => {
        if (localStorageJobSelection) {
            localStorage.setItem('jobSelection', localStorageJobSelection);
        }
    }, [localStorageJobSelection])

    return {localStorageJobSelection, setLocalStorageJobSelection}
}

export const useSyncChatInput = (handleInputChange: (event: ChangeEvent<HTMLInputElement>) => void) => {
    const inputRef: MutableRefObject<HTMLTextAreaElement | undefined> = useRef(undefined);
    useEffect(() => {
        if (inputRef.current?.value) {
            console.log('inputRef', inputRef.current.value)
            handleInputChange({target: {value: inputRef.current.value}} as ChangeEvent<HTMLInputElement>)
        }
    }, [inputRef])
    return {inputRef};
}

export const useScrollDownSmoothly = () => {
    useEffect(() => {
        scrollDownSmoothly();
    }, []);
}