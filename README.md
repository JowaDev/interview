# Interview Preparation Application for Job Interviews

This repository contains an application designed to assist students and professionals to prepare for
job interviews. The project allows users to practice answering typical interview questions categorized into three
groups: soft skills, hard skills, and mixed questions.

## Project Description

**Current Context**
In a competitive professional environment, preparation for interviews is crucial for success. This project provides a
structured and interactive way to prepare for various aspects of an interview.

**Objective**
The goal of this project is to provide an interactive platform where users can practice answering interview questions,
receive instant feedback, and improve their communication and technical skills.

## Features

- **File Loading:** Users can upload PDF files containing information on the interview module, required skills, etc.
- **Direct Interaction Mode:** Questions are posed through an interface, and the user must respond orally. Responses are
  transmitted via Whisper for analysis.
- **Revised Document Mode:** Ability to generate a PDF file containing both the questions and predefined answers for
  review and offline practice.

## Technologies Used

- **OpenAI ChatGPT:** Used to generate dynamic responses to user questions. This is the official OpenAI API for
  generating text.
- **Whisper:** Used to transcribe oral responses into text. This is a dockerized service that listens for audio input
  and transcribes it into text.
- **PDFKit:** Used for creating and manipulating PDF documents.
- **Next.js:** A production ready React framework for building web applications.
- **Tailwind CSS:** A utility-first CSS framework for rapidly building custom designs.
- **FFMPEG:** Used for converting audio files to different formats and handling audio streams.

## Project Setup

1. **Clone the Repository:** Clone the repository to your local machine to begin development or testing.
2. **Install Dependencies:** Install all required dependencies using `pnpm install`.
3. **API Configuration:** Ensure you obtain a valid OpenAI API key and place it in the `.env` file.

### Environment Variable Configuration

To configure the environment variables necessary for running your project, you need to create an `.env` file at the root
of your project. This file should include essential configurations for integrating external services used by your
application.

#### `.env` File Content

Insert the following lines into your `.env` file, replacing placeholder values with your specific information:

```plaintext
# Endpoint for the Whisper service used for transcribing oral responses
NEXT_PUBLIC_WHISPER_ENDPOINT=http://localhost:9000

# OpenAI API key for using services such as ChatGPT (GPT-3.5 Turbo is used for cost efficiency, but you can use any GPT API key for more accurate results)
OPENAI_API_KEY=<Your_OpenAI_API_Key>
```

### Prerequisites

Ensure that you have Docker Desktop installed on your machine.

### Running the Application

After setting up the environment variables, and installing the dependencies, you can start the application this way:

```bash
pnpm run build
pnpm run start
```

## Authors

- Joiakim DASEK - @JowaDev
- Zotrim UKA - @Zot10

## Credits

This project was developed as part of the HEG - Business Information Technology degree programme.

We drew inspiration from the [Liftoff](https://github.com/Tameyer41/liftoff) project for the audio and video
segmentation process as well as a portion of the
interaction logic with the video component.