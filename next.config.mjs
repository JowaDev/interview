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
            config.externals.push('pdf.js-extract');
        } else {
            config.module.rules.push({
                test: /pdf\.worker\.js$/,
                use: {loader: 'file-loader'},
            });
        }
        return config;
    },
};

export default nextConfig;
