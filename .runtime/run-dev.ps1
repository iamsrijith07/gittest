$ErrorActionPreference = "Continue"

$root = Split-Path -Parent $PSScriptRoot
$nodeDir = Join-Path $PSScriptRoot "node-v24.17.0-win-x64"
$node = Join-Path $nodeDir "node.exe"
$vite = Join-Path $root "node_modules\vite\bin\vite.js"
$log = Join-Path $PSScriptRoot "vite-dev.log"

Set-Location $root
$env:Path = "$nodeDir;$env:Path"

"Starting Vite dev server at http://127.0.0.1:5173/ on $(Get-Date -Format o)" | Set-Content -Path $log
& $node $vite dev --host 127.0.0.1 --port 5173
