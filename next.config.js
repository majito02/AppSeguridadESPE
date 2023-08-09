/** @type {import('next').NextConfig} */
const withTM = require('next-transpile-modules')(['react-leaflet']); // Reemplaza 'react-leaflet' con el nombre de las bibliotecas que necesitas transpilar


const nextConfig = {
  
  eslint: {
    ignoreDuringBuilds: true,
},
  typescript: {
    // !! WARN !!
    // Dangerously allow production builds to successfully complete even if
    // your project has type errors.
    // !! WARN !!
    ignoreBuildErrors: true,
  },
  reactStrictMode: false,
  images: {
    unoptimized : true,
},
basePath:'/SeguridadESPE'
}

module.exports = withTM(nextConfig)
