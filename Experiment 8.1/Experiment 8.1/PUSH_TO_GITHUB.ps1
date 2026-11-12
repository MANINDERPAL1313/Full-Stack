$ErrorActionPreference = 'Stop'
$repoUrl = 'https://github.com/MANINDERPAL1313/Full-Stack.git'
$folderName = 'Experiment 8.1'
$source = $PSScriptRoot
$temp = Join-Path $env:TEMP ('full-stack-ci-cd-' + [guid]::NewGuid().ToString('N'))

Write-Host 'Cloning the existing Full-Stack repository...'
git clone $repoUrl $temp
if ($LASTEXITCODE -ne 0) { throw 'Git clone failed. Check repository access and GitHub sign-in.' }

$destination = Join-Path $temp $folderName
New-Item -ItemType Directory -Force -Path $destination | Out-Null
Get-ChildItem -Force $source | Where-Object { $_.Name -ne 'PUSH_TO_GITHUB.ps1' } | ForEach-Object {
    Copy-Item -Recurse -Force $_.FullName $destination
}

Set-Location $temp
git add -- $folderName
git commit -m 'Add Experiment 8.1 CI CD pipeline'
if ($LASTEXITCODE -ne 0) { throw 'Git commit failed. Check git user.name and user.email.' }
git push origin HEAD
if ($LASTEXITCODE -ne 0) { throw 'Git push failed. Complete GitHub authentication and retry.' }

Write-Host "Successfully pushed '$folderName' to $repoUrl"
Write-Host 'Note: GitHub Actions only discovers workflow files under the repository-root .github/workflows directory. The workflow templates are retained inside the experiment folder; copy them to the repository root to activate them.'
