# Renders public/video-poster.jpg and public/og-image.jpg from render.html with headless Edge.
# Run from the repo root:  powershell -File scripts/brand-assets/render-brand-assets.ps1
$ErrorActionPreference = "Stop"
$root = Resolve-Path (Join-Path $PSScriptRoot "..\..")
$html = Join-Path $PSScriptRoot "render.html"
$edge = @("${env:ProgramFiles(x86)}\Microsoft\Edge\Application\msedge.exe", "$env:ProgramFiles\Microsoft\Edge\Application\msedge.exe") |
  Where-Object { Test-Path $_ } | Select-Object -First 1
if (-not $edge) { throw "Microsoft Edge not found." }

Add-Type -AssemblyName System.Drawing
$jpeg = [System.Drawing.Imaging.ImageCodecInfo]::GetImageEncoders() | Where-Object { $_.MimeType -eq "image/jpeg" }
$params = New-Object System.Drawing.Imaging.EncoderParameters 1
$params.Param[0] = New-Object System.Drawing.Imaging.EncoderParameter ([System.Drawing.Imaging.Encoder]::Quality), 90L

$assets = @(
  @{ name = "poster"; w = 1280; h = 720; out = "public\video-poster.jpg" },
  @{ name = "og";     w = 1200; h = 630; out = "public\og-image.jpg" }
)
foreach ($a in $assets) {
  $png = Join-Path $env:TEMP "locksy-$($a.name).png"
  $url = "file:///" + ($html -replace '\\', '/') + "?asset=$($a.name)"
  # Edge writes harmless diagnostics to stderr; don't let them stop the script.
  $ErrorActionPreference = "Continue"
  & $edge --headless=new --disable-gpu --hide-scrollbars --force-device-scale-factor=1 --allow-file-access-from-files `
    "--window-size=$($a.w),$($a.h)" --virtual-time-budget=8000 "--screenshot=$png" $url 2>&1 | Out-Null
  $ErrorActionPreference = "Stop"
  if (-not (Test-Path $png)) { throw "Edge did not produce $png" }
  $img = [System.Drawing.Image]::FromFile($png)
  $target = Join-Path $root $a.out
  $img.Save($target, $jpeg, $params)
  $img.Dispose()
  Write-Output ("{0} -> {1} ({2} KB)" -f $a.name, $a.out, [math]::Round((Get-Item $target).Length / 1KB))
}
