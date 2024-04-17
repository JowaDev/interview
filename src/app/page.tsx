import {GlobalContext} from "@/components/GlobalContext";
import {Carousel, CarouselContent, CarouselItem} from "@/components/ui/carousel";
import {Welcome} from "@/components/Welcome";
import {InterviewSelectionFormat} from "@/components/InterviewSelectionFormat";
import {InterviewSelectionType} from "@/components/InterviewSelectionType";

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
                                <InterviewSelectionType/>
                            </CarouselItem>
                            <CarouselItem>
                                <InterviewSelectionFormat/>
                            </CarouselItem>
                            <CarouselItem>
                                ...
                            </CarouselItem>
                        </CarouselContent>
                    </Carousel>
                </GlobalContext>
            </div>
            <div className="grid-col-span-2"/>
        </main>
    );
}
