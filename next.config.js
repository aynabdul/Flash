// @ts-check
/* eslint-disable @typescript-eslint/no-var-requires */
require('dotenv').config();

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      'wghibsxszbtwnruasaor.supabase.co', // Add Supabase storage domain
    ],
  },
};

module.exports = nextConfig;