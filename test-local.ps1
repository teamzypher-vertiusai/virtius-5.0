# Quick Test Script - Run local dev server

Write-Host "🧪 Starting development server..." -ForegroundColor Cyan
Write-Host ""
Write-Host "The app will open at: http://localhost:3000" -ForegroundColor Yellow
Write-Host "Press Ctrl+C to stop the server" -ForegroundColor Gray
Write-Host ""

Set-Location "c:\Users\Admin\OneDrive\vertius ai 5.0\crypto-ai-app"
npm run dev
