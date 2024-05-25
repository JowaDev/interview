import * as pdfjsLib from 'pdfjs-dist';

pdfjsLib.GlobalWorkerOptions.workerSrc = new URL(
    '/pdf/pdf.worker.min.mjs',
    import.meta.url,
).toString();