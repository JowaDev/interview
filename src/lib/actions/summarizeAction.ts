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
    return extractedText.pages
}
