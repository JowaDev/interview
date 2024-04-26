'use server'

import {Buffer} from "buffer";
import {PDFExtract, PDFExtractOptions} from 'pdf.js-extract';

export async function summarizeAction(formData: FormData) {
    const pdfFile = formData.get('pdf') as File;
    const arrayBuffer = await pdfFile.arrayBuffer()
    const buffer = Buffer.from(arrayBuffer)
    const pdfExtract = new PDFExtract();
    const options: PDFExtractOptions = {};
    const extractedText = await pdfExtract.extractBuffer(buffer, options);
    // TODO : Create an effective prompt system with GPT 3.5 to reduct size and extract usefull informations for the next step.
    // TODO : Return a response into the GolbalContext


    return extractedText.pages
}
