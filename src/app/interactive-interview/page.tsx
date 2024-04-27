import {Interview} from "@/components/Interview";
import {GlobalContext} from "@/components/GlobalContext";

interface InteractIveInterviewProps {

}

export default function InteractIveInterviewPage(props: InteractIveInterviewProps) {
    return (
        <GlobalContext>
            <Interview/>
        </GlobalContext>
    )
}