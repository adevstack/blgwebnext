/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ['res.cloudinary.com'], // This allows images from the Cloudinary domain
    },
};

module.exports = nextConfig;
