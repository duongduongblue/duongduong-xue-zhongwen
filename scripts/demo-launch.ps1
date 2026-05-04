Write-Host "Launching DuongDuong 学中文 demo..." -ForegroundColor Yellow

$projectRoot = Split-Path -Parent $PSScriptRoot
$previewPath = Join-Path $projectRoot 'docs\duongduong-xue-zhongwen-preview.html'

if (Test-Path $previewPath) {
  Start-Process $previewPath
  Write-Host "Opened preview HTML." -ForegroundColor Green
}

Set-Location $projectRoot
Write-Host "Starting Expo web demo..." -ForegroundColor Cyan
npm run web
