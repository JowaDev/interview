/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    async headers() {
        return [
            {
                source: "/(.*)",
                headers: [
                    {
                        key: "Cross-Origin-Embedder-Policy",
                        value: "require-corp",
                    },
                    {
                        key: "Cross-Origin-Opener-Policy",
                        value: "same-origin",
                    },
                ],
            },
        ];
    },
    webpack: (config, {isServer}) => {
        if (isServer) {
            config.externals.push('pdfkit-next');
        }
        return config;
    },
};

export default nextConfig;
