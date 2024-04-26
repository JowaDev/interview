'use server'

// @ts-ignore
import Pdf from 'pdf-parse';

export async function summarizeAction(formData: FormData) {
    const pdfFile = formData.get('pdf') as File

    if (pdfFile) {
        const buffer = await pdfFile.arrayBuffer();
        Pdf(Buffer.from(buffer)).then(function(data: any) {
            console.log(data.text)
        }).catch((err : any) => {
            console.log(err)
        });
    } else {
        console.log('No file')
    }


}