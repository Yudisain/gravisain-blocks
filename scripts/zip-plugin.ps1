param(
	[string]$PluginName = "gravisain-blocks",
	[string]$OutputDir = "release"
)

$ErrorActionPreference = "Stop"

$root = Resolve-Path (Join-Path $PSScriptRoot "..")

Write-Host "Building frontend assets..."
Set-Location $root
npm run build
if ($LASTEXITCODE -ne 0) {
	Write-Error "Build failed. Aborting zip."
	exit $LASTEXITCODE
}

$releaseDir = Join-Path $root $OutputDir
$stagingDir = Join-Path $releaseDir $PluginName
$zipPath = Join-Path $releaseDir "$PluginName.zip"

if (Test-Path $stagingDir) {
	Start-Sleep -Milliseconds 200
	Remove-Item -LiteralPath $stagingDir -Recurse -Force -ErrorAction SilentlyContinue
}

if (Test-Path $zipPath) {
	Remove-Item -LiteralPath $zipPath -Force -ErrorAction SilentlyContinue
}

if (-not (Test-Path $releaseDir)) {
	New-Item -ItemType Directory -Path $releaseDir -Force | Out-Null
}

New-Item -ItemType Directory -Path $stagingDir -Force | Out-Null

$includeFolders = @(
	"classes",
	"patterns",
	"assets",
	"languages",
	"src"
)

$includeFiles = @(
	"gravisain-blocks.php",
	"readme.txt",
	"uninstall.php"
)

foreach ($folder in $includeFolders) {
	$source = Join-Path $root $folder
	if (Test-Path $source) {
		Copy-Item -LiteralPath $source -Destination (Join-Path $stagingDir $folder) -Recurse -Force
	}
}

foreach ($file in $includeFiles) {
	$source = Join-Path $root $file
	if (Test-Path $source) {
		Copy-Item -LiteralPath $source -Destination (Join-Path $stagingDir $file) -Force
	}
}

Add-Type -AssemblyName System.IO.Compression
Add-Type -AssemblyName System.IO.Compression.FileSystem

$zipFile = [System.IO.Compression.ZipFile]::Open($zipPath, [System.IO.Compression.ZipArchiveMode]::Create)
try {
	$files = Get-ChildItem -LiteralPath $stagingDir -Recurse -File
	foreach ($file in $files) {
		$relativePath = "$PluginName/" + $file.FullName.Substring($stagingDir.Length + 1).Replace('\', '/')
		[System.IO.Compression.ZipFileExtensions]::CreateEntryFromFile($zipFile, $file.FullName, $relativePath) | Out-Null
	}
} finally {
	$zipFile.Dispose()
}

Write-Host "Plugin folder created: $stagingDir"
Write-Host "Plugin zip created: $zipPath"
