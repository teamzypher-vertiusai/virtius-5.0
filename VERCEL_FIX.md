# Vercel Deployment Fix

## Build Settings for Vercel Dashboard

When deploying to Vercel, use these settings:

**Framework Preset:** Next.js

**Build Command:** 
```bash
npm run build
```

**Output Directory:** 
```
out
```

**Install Command:**
```bash
npm install
```

## Environment Variables
None required (100% client-side app)

## Common Issues & Solutions

### Issue: "routes-manifest.json not found"
**Solution:** 
- Ensure `output: 'export'` is in `next.config.js`
- Use `trailingSlash: true` for proper routing
- Avoid `getServerSideProps` or `getStaticProps` with dynamic params

### Issue: "404 on page refresh"
**Solution:**
- Added `trailingSlash: true` to config
- Using meta refresh instead of client-side router for index redirect

### Issue: "localStorage is not defined"
**Solution:**
- All localStorage calls are wrapped in `useEffect` hooks
- No SSR issues as app is fully static

## Deployment Steps

### Option 1: Vercel CLI
```bash
cd "c:/Users/Admin/OneDrive/vertius ai 5.0/crypto-ai-app"
npm install
vercel --prod
```

### Option 2: GitHub + Vercel Dashboard
```bash
# Push to GitHub
git init
git add .
git commit -m "Crypto-AI app with adversarial distortion"
git remote add origin YOUR_REPO_URL
git push -u origin main

# Then import in Vercel dashboard
```

## Verification Checklist
- ✅ `next.config.js` has `output: 'export'`
- ✅ `next.config.js` has `trailingSlash: true`
- ✅ No dynamic routes with `getStaticPaths`
- ✅ No `getServerSideProps`
- ✅ All client-side code in `useEffect`
- ✅ Images use `unoptimized: true`

## Expected Build Output
```
Route (pages)                              Size     First Load JS
┌ ○ /                                      1.2 kB         80 kB
├ ○ /404                                   194 B          75 kB
├ ○ /login                                 2.5 kB         82 kB
├ ○ /process                               500 B          80 kB
├ ○ /result                                2.3 kB         82 kB
└ ○ /upload                                500 B          80 kB

○  (Static)  prerendered as static content

✓ Generating static pages
✓ Finalizing page optimization
✓ Export successful
```
