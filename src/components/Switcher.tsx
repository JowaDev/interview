'use client'

import {FC, useContext} from "react";
import {globalContext} from "@/components/GlobalContext";
import {Welcome} from "@/components/Welcome";
import {InterviewSelectionType} from "@/components/InterviewSelectionType";

interface SwitcherProps {

}

export const Switcher: FC<SwitcherProps> = () => {
    const {componentStep} = useContext(globalContext);
    switch (componentStep) {
        case 0:
            return (
                <Welcome/>
            )
        case 1:
            return (
                <InterviewSelectionType/>
            )
        case 2:
            return (
                <div>Step 2</div>
            )
        case 3:
            return (
                <div>Step 3</div>
            )
        default:
            return (
                <Welcome/>
            )
    }
}