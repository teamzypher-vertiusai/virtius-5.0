# Crypto-AI Image Processor

A database-less, client-side image processor built with Next.js, Web Crypto API, and TensorFlow.js.

## Features
- **Zero Database**: All processing happens in the browser.
- **Fake Auth**: Any username/password works.
- **Crypto Hashing**: SHA-256 signing of image data.
- **Binary Manipulation**: Pixel-level bitwise operations.
- **AI Effects**: TensorFlow.js tensor manipulations.

## Setup

1. Install dependencies:
   ```bash
   npm install
   ```

2. Run development server:
   ```bash
   npm run dev
   ```

3. Build for production (Static Export):
   ```bash
   npm run build
   ```

## Deployment
This project is configured for Vercel.
1. Push to GitHub.
2. Import into Vercel.
3. The `output: 'export'` in `next.config.js` ensures a static build.
