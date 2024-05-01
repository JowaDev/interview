import {GlobalContext} from "@/components/GlobalContext";
import {Carousel, CarouselContent, CarouselItem} from "@/components/ui/carousel";
import {Welcome} from "@/components/Welcome";
import {InterviewSelectionFormat} from "@/components/InterviewSelectionFormat";
import {InterviewSelectionType} from "@/components/InterviewSelectionType";
import {DropZone} from "@/components/DropZone";
import {JobSelection} from "@/components/JobSelection";

export default function Home() {
    return (
        <main className='grid grid-cols-4'>
            <div className="col-span-2">
                <GlobalContext>
                    <Carousel>
                        <CarouselContent>
                            <CarouselItem>
                                <Welcome/>
                            </CarouselItem>
                            <CarouselItem>
                                <JobSelection/>
                            </CarouselItem>
                            <CarouselItem>
                                <InterviewSelectionType/>
                            </CarouselItem>
                            <CarouselItem>
                                <DropZone/>
                            </CarouselItem>
                            <CarouselItem>
                                <InterviewSelectionFormat/>
                            </CarouselItem>
                        </CarouselContent>
                    </Carousel>
                </GlobalContext>
            </div>
            <div className="grid-col-span-2"/>
        </main>
    );
}
