/** @type {import('next').NextConfig} */
const nextConfig = {
    turbopack: { root: import.meta.dirname },
    images: {
        remotePatterns: [{ protocol: 'https', hostname: 'cdn.dummyjson.com' }],
    },
};

export default nextConfig;
