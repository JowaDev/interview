export const dynamic = 'force-dynamic'

export async function POST(request: Request) {
    const formData = await request.formData()
    const url = new URL(`${process.env.NEXT_PUBLIC_WHISPER_ENDPOINT}/asr`);
    const params = new URLSearchParams();
    params.append('encode', 'true');
    params.append('task', 'transcribe');
    params.append('language', 'fr');
    params.append('word_timestamps', 'false');
    params.append('output', 'json');
    url.search = params.toString();
    const upload = await fetch(url.toString(), {
        method: "POST",
        body: formData,
    });
    const results = await upload.json();
    return Response.json(results)
}