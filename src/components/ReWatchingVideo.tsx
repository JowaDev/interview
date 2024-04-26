import {FC} from "react";
import {useChat} from "ai/react";

interface ReWatchingVideoProps {
    recordedChunks: BlobPart[];
    transcript: string;
    generatedFeedback: string;
}

export const ReWatchingVideo: FC<ReWatchingVideoProps> = ({generatedFeedback, transcript, recordedChunks}) => {
    const {messages, input, handleInputChange, handleSubmit} = useChat({
        api: "/api/generate",
    });
    return (
        <div className="w-full flex flex-col max-w-[1080px] mx-auto mt-[10vh] overflow-y-auto pb-8 md:pb-12">
            <div
                className="relative md:aspect-[16/9] w-full max-w-[1080px] overflow-hidden bg-[#1D2B3A] rounded-lg ring-1 ring-gray-900/5 shadow-md flex flex-col items-center justify-center"
            >
                <video
                    className="w-full h-full rounded-lg"
                    controls
                    crossOrigin="anonymous"
                    autoPlay
                >
                    <source
                        src={URL.createObjectURL(
                            new Blob(recordedChunks, {type: "video/mp4"})
                        )}
                        type="video/mp4"
                    />
                </video>
            </div>
            <div
                className="mt-8 flex flex-col"
            >
                <div>
                    <h2 className="text-xl font-semibold text-left text-[#1D2B3A] mb-2">
                        Transcription
                    </h2>
                    <form onSubmit={handleSubmit}>
                        <input
                            onChange={handleInputChange}
                            value={input}
                            className="prose prose-sm max-w-none"
                        >
                            {transcript.length > 0 ? transcript : null}
                        </input>
                    </form>
                </div>
                <div className="mt-8">
                    <h2 className="text-xl font-semibold text-left text-[#1D2B3A] mb-2">
                        Feedback
                    </h2>
                    <div
                        className="mt-4 text-sm flex gap-2.5 rounded-lg border border-[#EEEEEE] bg-[#FAFAFA] p-4 leading-6 text-gray-900 min-h-[100px]">
                        <p className="prose prose-sm max-w-none">
                            {generatedFeedback}
                        </p>
                        {messages.map(m => (
                            <div key={m.id} className="whitespace-pre-wrap">
                                {m.role === 'user' ? 'User: ' : 'AI: '}
                                {m.content}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}