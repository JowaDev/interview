import {GlobalContext} from "@/components/GlobalContext";
import {Switcher} from "@/components/Switcher";

export default function Home() {
    return (
        <main className='grid grid-cols-4 w-screen h-screen'>
            <div className="grid-col-span-2">
                <GlobalContext>
                    <Switcher/>
                </GlobalContext>
            </div>
            <div className="grid-col-span-2"/>
        </main>
    );
}
