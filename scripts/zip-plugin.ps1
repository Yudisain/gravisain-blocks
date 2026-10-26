param(
	[string]$PluginName = "gravisain-blocks",
	[string]$OutputDir = "release",
	[ValidateSet("undagital", "wporg", "both")]
	[string]$Channel = "both",
	[string]$Version = ""
)

$ErrorActionPreference = "Stop"

$root = Resolve-Path (Join-Path $PSScriptRoot "..")

Write-Host "Building frontend assets..." -ForegroundColor Cyan
Set-Location $root
npm run build
if ($LASTEXITCODE -ne 0) {
	Write-Error "Build failed. Aborting zip."
	exit $LASTEXITCODE
}

$releaseDir = Join-Path $root $OutputDir

# Read package.json to determine default channel versions
$pkgFile = Join-Path $root "package.json"
$pkgJson = Get-Content -LiteralPath $pkgFile -Raw | ConvertFrom-Json
$pkgUndagitalVer = if ($pkgJson.undagitalVersion) { $pkgJson.undagitalVersion } else { "0.5.0" }
$pkgWporgVer = if ($pkgJson.version) { $pkgJson.version } else { "1.0.0" }

function Build-ChannelZip([string]$TargetChannel, [string]$TargetVersion) {
	$channelFolder = Join-Path $releaseDir $TargetChannel
	$stagingDir = Join-Path $channelFolder $PluginName
	$zipPath = Join-Path $channelFolder "$PluginName.zip"

	if (Test-Path $stagingDir) {
		Start-Sleep -Milliseconds 200
		Remove-Item -LiteralPath $stagingDir -Recurse -Force -ErrorAction SilentlyContinue
	}

	if (Test-Path $zipPath) {
		for ($i = 0; $i -lt 5; $i++) {
			try {
				Remove-Item -LiteralPath $zipPath -Force -ErrorAction Stop
				break
			} catch {
				Start-Sleep -Milliseconds 500
			}
		}
	}

	if (-not (Test-Path $channelFolder)) {
		New-Item -ItemType Directory -Path $channelFolder -Force | Out-Null
	}

	New-Item -ItemType Directory -Path $stagingDir -Force | Out-Null

	$includeFolders = @(
		"classes",
		"patterns",
		"starter-templates",
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

	# Channel-specific modifications
	if ($TargetChannel -eq "wporg") {
		# WP.org Channel: 100% clean, NO external updater, official version
		$updaterPath = Join-Path $stagingDir "classes\Updater.php"
		if (Test-Path $updaterPath) {
			Remove-Item -LiteralPath $updaterPath -Force
			Write-Host "Removed classes/Updater.php for official WP.org release package." -ForegroundColor Yellow
		}
		Write-Host "Configured WP.org official package: v$TargetVersion." -ForegroundColor Green
	} elseif ($TargetChannel -eq "undagital") {
		# Undagital Channel: Early Access version, includes Updater.php
		$phpMain = Join-Path $stagingDir "gravisain-blocks.php"
		if (Test-Path $phpMain) {
			$content = [System.IO.File]::ReadAllText($phpMain, [System.Text.Encoding]::UTF8)
			$content = [System.Text.RegularExpressions.Regex]::Replace($content, "\*\s*Version:\s*[^\r\n]+", "* Version: $TargetVersion")
			$content = [System.Text.RegularExpressions.Regex]::Replace($content, "define\(\s*['""]GRAVISAIN_BLOCKS_VERSION['""]\s*,\s*['""][^'""]+['""]\s*\);", "define( 'GRAVISAIN_BLOCKS_VERSION', '$TargetVersion' );")
			[System.IO.File]::WriteAllText($phpMain, $content, (New-Object System.Text.UTF8Encoding $false))
		}

		$readmeFile = Join-Path $stagingDir "readme.txt"
		if (Test-Path $readmeFile) {
			$rContent = [System.IO.File]::ReadAllText($readmeFile, [System.Text.Encoding]::UTF8)
			$rContent = [System.Text.RegularExpressions.Regex]::Replace($rContent, "Stable tag:\s*[^\r\n]+", "Stable tag: $TargetVersion")
			[System.IO.File]::WriteAllText($readmeFile, $rContent, (New-Object System.Text.UTF8Encoding $false))
		}
		Write-Host "Configured Undagital Early Access package: v$TargetVersion with OTA Updater." -ForegroundColor Green
	}

	# Create ZIP
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

	Write-Host "[$TargetChannel] ZIP created: $zipPath" -ForegroundColor Green
}

if ($Channel -eq "both") {
	$undagitalVer = if ($Version) { $Version } else { $pkgUndagitalVer }
	Build-ChannelZip -TargetChannel "wporg" -TargetVersion $pkgWporgVer
	Build-ChannelZip -TargetChannel "undagital" -TargetVersion $undagitalVer
} elseif ($Channel -eq "wporg") {
	Build-ChannelZip -TargetChannel "wporg" -TargetVersion $pkgWporgVer
} elseif ($Channel -eq "undagital") {
	$undagitalVer = if ($Version) { $Version } else { $pkgUndagitalVer }
	Build-ChannelZip -TargetChannel "undagital" -TargetVersion $undagitalVer
}
