'use client'

import {useEffect, useState} from "react";
import {interactiveInterview} from "@/components/GlobalContext";

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