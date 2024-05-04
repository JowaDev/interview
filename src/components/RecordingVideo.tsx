import {FC, RefObject} from "react";
import Webcam from "react-webcam";
import {CircleCheckBig} from "lucide-react";

interface RecordingVideoProps {
    recordingPermission: boolean;
    cameraLoaded: boolean;
    seconds: number;
    recordedChunks: Blob[];
    isSubmitting: boolean;
    status: string;
    isSuccess: boolean;
    capturing: boolean;
    handleStartCaptureClick: () => void;
    handleStopCaptureClick: () => void;
    handleDownload: () => void;
    handleUserMedia: (stream: MediaStream) => void;
    webcamRef: RefObject<Webcam>;
    setRecordingPermission: (value: boolean) => void;
    loading: boolean;
    restartVideo: () => void;
    question: string;
    jobSelection: string;
    step: number;
    stepLength: number;
}

export const RecordingVideo: FC<RecordingVideoProps> = ({
                                                            step,
                                                            recordedChunks,
                                                            recordingPermission,
                                                            handleDownload,
                                                            handleStartCaptureClick,
                                                            handleStopCaptureClick,
                                                            capturing,
                                                            handleUserMedia,
                                                            isSubmitting,
                                                            isSuccess,
                                                            status,
                                                            seconds,
                                                            cameraLoaded,
                                                            webcamRef,
                                                            setRecordingPermission,
                                                            loading,
                                                            restartVideo,
                                                            question,
                                                            jobSelection,
                                                            stepLength
                                                        }) => {
    return (
        <div className="h-full w-full items-center flex flex-col mt-[10vh]">
            <h1 className='text-3xl font-bold uppercase'>{jobSelection}</h1>
            <span className='absolute right-[10%] border-dashed rounded-2xl border-2 p-4'>{step + 1} / {stepLength}</span>
            {recordingPermission ? (
                <div className="w-full flex flex-col max-w-[1080px] mx-auto justify-center mt-12">
                    <h2 className="text-2xl font-semibold text-left text-[#1D2B3A] mb-2">
                        {question}
                    </h2>
                    <span className="text-[13px] leading-[20px] text-[#1a2b3b] font-normal mb-4">
                        Selon les informations que vous avez fournies, nous avons préparé un ensemble de questions pour vous. Vous pouvez répondre à ces questions en enregistrant une vidéo.
                    </span>
                    <div
                        className="relative aspect-[16/9] w-full max-w-[1080px] overflow-hidden bg-[#1D2B3A] rounded-lg ring-1 ring-gray-900/5 shadow-md"
                    >
                        {!cameraLoaded && (
                            <div className="text-white absolute top-1/2 left-1/2 z-20 flex items-center">
                                <svg
                                    className="animate-spin h-4 w-4 text-white mx-auto my-0.5"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                >
                                    <circle
                                        className="opacity-25"
                                        cx="12"
                                        cy="12"
                                        r="10"
                                        stroke="currentColor"
                                        strokeWidth={3}
                                    ></circle>
                                    <path
                                        className="opacity-75"
                                        fill="currentColor"
                                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                    ></path>
                                </svg>
                            </div>
                        )}
                        <div className="relative z-10 h-full w-full rounded-lg">
                            <div className="absolute top-5 lg:top-10 left-5 lg:left-10 z-20">
                                {
                                    seconds ? (
                                        <span
                                            className="inline-flex items-center rounded-md bg-gray-100 px-2.5 py-0.5 text-sm font-medium text-gray-800">
                                            {new Date(seconds * 1000).toISOString().slice(14, 19)}
                                        </span>
                                    ) : null
                                }
                            </div>
                            <Webcam
                                mirrored
                                audio
                                muted
                                ref={webcamRef}
                                videoConstraints={{width: 1280, height: 720, facingMode: "user"}}
                                onUserMedia={handleUserMedia}
                                onUserMediaError={(error) => {
                                    setRecordingPermission(false);
                                }}
                                className="absolute z-10 min-h-[100%] min-w-[100%] h-auto w-auto object-cover"
                            />
                        </div>
                        {loading && (
                            <div className="absolute flex h-full w-full items-center justify-center">
                                <div
                                    className="relative h-[112px] w-[112px] rounded-lg object-cover text-[2rem]">
                                    <div
                                        className="flex h-[112px] w-[112px] items-center justify-center rounded-[0.5rem] bg-[#4171d8] !text-white">
                                        Chargement...
                                    </div>
                                </div>
                            </div>
                        )}
                        {cameraLoaded && (
                            <div
                                className="absolute bottom-0 left-0 z-50 flex h-[82px] w-full items-center justify-center">
                                {recordedChunks.length > 0 ? (
                                    <>
                                        {isSuccess ? (
                                            <button
                                                className="animate-bounce cursor-disabled group rounded-full min-w-[140px] px-4 py-2 text-[13px] font-semibold group inline-flex items-center justify-center text-sm text-white duration-700 bg-green-500 hover:bg-green-600 hover:text-slate-100 focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600 active:scale-100 active:bg-green-800 active:text-green-100"
                                                style={{
                                                    boxShadow:
                                                        "0px 1px 4px rgba(27, 71, 13, 0.17), inset 0px 0px 0px 1px #5fc767, inset 0px 0px 0px 2px rgba(255, 255, 255, 0.1)",
                                                }}
                                            >
                                                <CircleCheckBig/>
                                            </button>
                                        ) : (
                                            <div className="flex flex-row gap-2">
                                                {!isSubmitting && (
                                                    <button
                                                        onClick={() => restartVideo()}
                                                        className="group rounded-full px-4 py-2 text-[13px] font-semibold transition-all flex items-center justify-center bg-white text-[#1E2B3A] hover:[linear-gradient(0deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.1)), #0D2247] no-underline flex gap-x-2  active:scale-95 scale-100 duration-75"
                                                    >
                                                        Recommencer
                                                    </button>
                                                )}
                                                <button
                                                    onClick={handleDownload}
                                                    disabled={isSubmitting}
                                                    className="group rounded-full min-w-[140px] px-4 py-2 text-[13px] font-semibold transition-all flex items-center justify-center bg-[#1E2B3A] text-white hover:[linear-gradient(0deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.1)), #0D2247] no-underline flex  active:scale-95 scale-100 duration-75  disabled:cursor-not-allowed"
                                                    style={{
                                                        boxShadow:
                                                            "0px 1px 4px rgba(13, 34, 71, 0.17), inset 0px 0px 0px 1px #061530, inset 0px 0px 0px 2px rgba(255, 255, 255, 0.1)",
                                                    }}
                                                >
                                                    <span>
                                                      {isSubmitting ? (
                                                          <div className="flex items-center justify-center gap-x-2">
                                                              <svg
                                                                  className="animate-spin h-5 w-5 text-slate-50 mx-auto"
                                                                  xmlns="http://www.w3.org/2000/svg"
                                                                  fill="none"
                                                                  viewBox="0 0 24 24"
                                                              >
                                                                  <circle
                                                                      className="opacity-25"
                                                                      cx="12"
                                                                      cy="12"
                                                                      r="10"
                                                                      stroke="currentColor"
                                                                      strokeWidth={3}
                                                                  ></circle>
                                                                  <path
                                                                      className="opacity-75"
                                                                      fill="currentColor"
                                                                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                                                  ></path>
                                                              </svg>
                                                              <span>{status}</span>
                                                          </div>
                                                      ) : (
                                                          <div className="flex items-center justify-center gap-x-2">
                                                              <span>Procéder à la transcription</span>
                                                              <svg
                                                                  className="w-5 h-5"
                                                                  viewBox="0 0 24 24"
                                                                  fill="none"
                                                                  xmlns="http://www.w3.org/2000/svg"
                                                              >
                                                                  <path
                                                                      d="M13.75 6.75L19.25 12L13.75 17.25"
                                                                      stroke="white"
                                                                      strokeWidth="1.5"
                                                                      strokeLinecap="round"
                                                                      strokeLinejoin="round"
                                                                  />
                                                                  <path
                                                                      d="M19 12H4.75"
                                                                      stroke="white"
                                                                      strokeWidth="1.5"
                                                                      strokeLinecap="round"
                                                                      strokeLinejoin="round"
                                                                  />
                                                              </svg>
                                                          </div>
                                                      )}
                                                    </span>
                                                </button>
                                            </div>
                                        )}
                                    </>
                                ) : (
                                    <div className="absolute bottom-[6px] md:bottom-5 left-5 right-5">
                                        <div
                                            className="lg:mt-4 flex flex-col items-center justify-center gap-2">
                                            {capturing ? (
                                                <div
                                                    id="stopTimer"
                                                    onClick={handleStopCaptureClick}
                                                    className="flex h-10 w-10 flex-col items-center justify-center rounded-full bg-transparent text-white hover:shadow-xl ring-4 ring-white  active:scale-95 scale-100 duration-75 cursor-pointer"
                                                >
                                                    <div
                                                        className="h-5 w-5 rounded bg-red-500 cursor-pointer"></div>
                                                </div>
                                            ) : (
                                                <button
                                                    id="startTimer"
                                                    onClick={handleStartCaptureClick}
                                                    className="flex h-8 w-8 sm:h-8 sm:w-8 flex-col items-center justify-center rounded-full bg-red-500 text-white hover:shadow-xl ring-4 ring-white ring-offset-gray-500 ring-offset-2 active:scale-95 scale-100 duration-75"
                                                ></button>
                                            )}
                                            <div className="w-12"></div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        )}
                        <div
                            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20 text-5xl text-white font-semibold text-center"
                            id="countdown"
                        ></div>
                    </div>
                </div>
            ) : (
                <div className="w-full flex flex-col max-w-[1080px] mx-auto justify-center">
                    <div
                        className="relative md:aspect-[16/9] w-full max-w-[1080px] overflow-hidden bg-[#1D2B3A] rounded-lg ring-1 ring-gray-900/5 shadow-md flex flex-col items-center justify-center"
                    >
                        <p className="text-white font-medium text-lg text-center max-w-3xl">
                            Vous n&apos;avez pas autorisé l&apos;accès à votre caméra. Pour continuer, veuillez
                            rafraîchir la page et autoriser l&apos;accès à votre caméra.
                        </p>
                    </div>
                </div>
            )}
        </div>
    )
}