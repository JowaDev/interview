'use client'

import {FC, useCallback, useEffect, useRef, useState} from "react";
import Webcam from "react-webcam";
import {v4 as uuid} from "uuid";
import {ffmpeg} from "@/lib/utils";
import {fetchFile} from "@ffmpeg/ffmpeg";
import {RecordingVideo} from "@/components/RecordingVideo";
import {ReWatchingVideo} from "@/components/ReWatchingVideo";
import {useLocalStorageInteractiveInterview, useLocalStorageJobSelection, useLocalStorageStep} from "@/lib/hooks";

interface InterviewProps {

}

export const Interview: FC<InterviewProps> = () => {
    const [loading, setLoading] = useState(true);
    const webcamRef = useRef<Webcam | null>(null);
    const mediaRecorderRef = useRef<MediaRecorder | null>(null);
    const [capturing, setCapturing] = useState(false);
    const [recordedChunks, setRecordedChunks] = useState<Blob[]>([]);
    const [seconds, setSeconds] = useState(0);
    const [recordingPermission, setRecordingPermission] = useState(true);
    const [cameraLoaded, setCameraLoaded] = useState(false);
    const [isSubmitting, setSubmitting] = useState(false);
    const [status, setStatus] = useState("Transcription en cours...");
    const [isSuccess, setIsSuccess] = useState(false);
    const [completed, setCompleted] = useState(false);
    const [transcript, setTranscript] = useState("");
    const {
        localStorageInteractiveInterview,
        setLocalStorageInteractiveInterview,
    } = useLocalStorageInteractiveInterview()
    const {localStorageJobSelection} = useLocalStorageJobSelection()
    const {setLocalStorageStep, localStorageStep} = useLocalStorageStep();

    const pushRecordedChunks = useCallback(({data}: BlobEvent) => {
        if (data.size > 0) {
            setRecordedChunks((prev) => prev.concat(data));
        }
    }, [setRecordedChunks]);

    const handleStartCaptureClick = useCallback(async () => {
        setCapturing(true);
        mediaRecorderRef.current = new MediaRecorder(
            webcamRef?.current?.stream as MediaStream
        );
        mediaRecorderRef.current.addEventListener(
            "dataavailable",
            pushRecordedChunks
        );
        mediaRecorderRef.current.start();
    }, []);

    const handleStopCaptureClick = useCallback(() => {
        if (mediaRecorderRef.current) {
            mediaRecorderRef.current.stop();
        }
        setCapturing(false);
    }, [mediaRecorderRef, setCapturing]);

    const restartVideo = () => {
        setRecordedChunks([]);
        setCapturing(false);
        setSeconds(0);
    }

    const handleUserMedia = () => {
        setTimeout(() => {
            setLoading(false);
            setCameraLoaded(true);
        }, 1000);
    };

    const handleTranscription = async () => {
        if (recordedChunks.length) {
            setSubmitting(true);
            setStatus("En cours d'enregistrement...");

            const file = new Blob(recordedChunks, {
                type: `video/webm`,
            });

            const unique_id = uuid();

            if (!ffmpeg.isLoaded()) {
                await ffmpeg.load();
            }

            ffmpeg.FS("writeFile", `${unique_id}.webm`, await fetchFile(file));
            await ffmpeg.run(
                "-i",
                `${unique_id}.webm`,
                "-vn",
                "-acodec",
                "libmp3lame",
                "-ac",
                "1",
                "-ar",
                "16000",
                "-f",
                "mp3",
                `${unique_id}.mp3`
            );

            const fileData = ffmpeg.FS("readFile", `${unique_id}.mp3`);
            const output = new File([fileData.buffer], `${unique_id}.mp3`, {
                type: "audio/mp3",
            });

            const formData = new FormData();
            formData.append("audio_file", output, `${unique_id}.mp3`);

            setStatus("Transcription en cours...");

            const upload = await fetch(`/api/transcribe`, {
                method: "POST",
                body: formData,
            });

            const results: TranscriptResponse = await upload.json();

            if (upload.ok) {
                setIsSuccess(true);
                setSubmitting(false);
                setTranscript(results.text);
                await Promise.allSettled([
                    new Promise((resolve) => setTimeout(resolve, 800)),
                ]).then(() => {
                    setCompleted(true);
                });
            }
            setTimeout(function () {
                setRecordedChunks([]);
            }, 1500);
        }
    };

    useEffect(() => {
        let timer: any = null;
        if (capturing) {
            timer = setInterval(() => {
                setSeconds((seconds) => seconds + 1);
            }, 1000);
        }
        return () => {
            clearInterval(timer);
        };
    }, [capturing, seconds, handleStopCaptureClick]);

    return (localStorageInteractiveInterview.steps && localStorageStep !== -1) && (
        <div
            className="w-full min-h-screen flex flex-col px-4 pt-2 pb-8 md:px-8 md:py-2 bg-[#FCFCFC] relative overflow-x-hidden">
            {(completed && localStorageInteractiveInterview.steps) || (localStorageInteractiveInterview.steps[localStorageStep].answer) ? (
                <ReWatchingVideo
                    jobSelection={localStorageJobSelection}
                    question={localStorageInteractiveInterview.steps[localStorageStep].question}
                    recordedChunks={recordedChunks}
                    transcript={transcript}
                    setStep={setLocalStorageStep}
                    step={localStorageStep}
                    stepLength={localStorageInteractiveInterview.steps.length}
                    setInteractiveInterview={setLocalStorageInteractiveInterview}
                    setCompleted={setCompleted}
                    setSeconds={setSeconds}
                    setRecordedChunks={setRecordedChunks}
                    setIsSuccess={setIsSuccess}
                    answer={localStorageInteractiveInterview.steps[localStorageStep].answer}
                />
            ) : localStorageInteractiveInterview.steps ? (
                <RecordingVideo
                    setStep={setLocalStorageStep}
                    jobSelection={localStorageJobSelection}
                    stepLength={localStorageInteractiveInterview.steps.length}
                    question={localStorageInteractiveInterview.steps[localStorageStep].question}
                    recordingPermission={recordingPermission}
                    cameraLoaded={cameraLoaded}
                    seconds={seconds}
                    recordedChunks={recordedChunks}
                    isSuccess={isSuccess}
                    step={localStorageStep}
                    isSubmitting={isSubmitting}
                    status={status}
                    capturing={capturing}
                    handleStartCaptureClick={handleStartCaptureClick}
                    handleStopCaptureClick={handleStopCaptureClick}
                    handleDownload={handleTranscription}
                    handleUserMedia={handleUserMedia}
                    webcamRef={webcamRef}
                    setRecordingPermission={setRecordingPermission}
                    loading={loading}
                    restartVideo={restartVideo}
                    setIsSuccess={setIsSuccess}
                    setRecordedChunks={setRecordedChunks}
                    setCompleted={setCompleted}
                    setSeconds={setSeconds}
                    setInteractiveInterview={setLocalStorageInteractiveInterview}
                />
            ) : null}
        </div>
    )
}