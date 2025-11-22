# BUILD AND DEPLOY SCRIPT

Write-Host "🚀 Crypto-AI Image Processor - Build & Deploy" -ForegroundColor Cyan
Write-Host "=============================================" -ForegroundColor Cyan
Write-Host ""

# Check if Node.js is installed
Write-Host "Checking Node.js installation..." -ForegroundColor Yellow
try {
    $nodeVersion = node -v
    Write-Host "✅ Node.js version: $nodeVersion" -ForegroundColor Green
} catch {
    Write-Host "❌ Node.js not found. Please install Node.js from https://nodejs.org" -ForegroundColor Red
    exit 1
}

# Navigate to project directory
$projectPath = "c:\Users\Admin\OneDrive\vertius ai 5.0\crypto-ai-app"
Write-Host "Navigating to project directory..." -ForegroundColor Yellow
Set-Location $projectPath

# Install dependencies
Write-Host ""
Write-Host "📦 Installing dependencies..." -ForegroundColor Yellow
npm install

if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Installation failed!" -ForegroundColor Red
    exit 1
}

Write-Host "✅ Dependencies installed successfully" -ForegroundColor Green

# Build the project
Write-Host ""
Write-Host "🔨 Building static export..." -ForegroundColor Yellow
npm run build

if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Build failed!" -ForegroundColor Red
    exit 1
}

Write-Host "✅ Build completed successfully" -ForegroundColor Green

# Check if out directory exists
if (Test-Path ".\out") {
    Write-Host ""
    Write-Host "✅ Static export generated in /out directory" -ForegroundColor Green
    
    # List generated files
    Write-Host ""
    Write-Host "📁 Generated files:" -ForegroundColor Cyan
    Get-ChildItem -Path ".\out" -Recurse -File | Select-Object -First 20 | ForEach-Object {
        Write-Host "  - $($_.FullName.Replace($projectPath, ''))" -ForegroundColor Gray
    }
} else {
    Write-Host "❌ Output directory not found!" -ForegroundColor Red
    exit 1
}

# Deployment options
Write-Host ""
Write-Host "🎯 DEPLOYMENT OPTIONS:" -ForegroundColor Cyan
Write-Host "=============================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "Option 1: Deploy with Vercel CLI" -ForegroundColor Yellow
Write-Host "  Run: vercel --prod" -ForegroundColor White
Write-Host ""
Write-Host "Option 2: Push to GitHub and deploy via Vercel Dashboard" -ForegroundColor Yellow
Write-Host "  1. git init" -ForegroundColor White
Write-Host "  2. git add ." -ForegroundColor White
Write-Host "  3. git commit -m 'Initial commit'" -ForegroundColor White
Write-Host "  4. git remote add origin YOUR_REPO_URL" -ForegroundColor White
Write-Host "  5. git push -u origin main" -ForegroundColor White
Write-Host "  6. Import repository in Vercel dashboard" -ForegroundColor White
Write-Host ""
Write-Host "✅ BUILD SUCCESSFUL - READY FOR DEPLOYMENT! 🚀" -ForegroundColor Green
