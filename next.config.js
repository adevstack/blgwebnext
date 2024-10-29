/** @type {import('next').NextConfig} */
const nextConfig = {

    eslint:{
        ignoreDuringBuilds: true,
    },

    images: {
        domains: ['res.cloudinary.com'], // This allows images from the Cloudinary domain
    },
};

module.exports = nextConfig;
