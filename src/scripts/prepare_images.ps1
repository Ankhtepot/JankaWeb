param(
    [string]$ImagesRoot = ''
)

# prepare_images.ps1 - simplified
# Scans assets/images and subfolders, sanitizes filenames, selects preferred variants, and generates images_provider.gen.ts

$ErrorActionPreference = 'Stop'
$scriptDir = Split-Path -Parent $MyInvocation.MyCommand.Path
if ([string]::IsNullOrWhiteSpace($ImagesRoot)) {
    $imagesRootInfo = Resolve-Path (Join-Path $scriptDir '..\assets\images')
    $imagesRootPath = $imagesRootInfo.ProviderPath
} else {
    if (Test-Path $ImagesRoot) { $imagesRootPath = (Resolve-Path $ImagesRoot).ProviderPath } else { throw "ImagesRoot path not found: $ImagesRoot" }
}
$providerFileCandidate = Join-Path $scriptDir '..\app\shared\images_provider.gen.ts'
Write-Host 'Images root:' $imagesRootPath
Write-Host 'Provider file candidate:' $providerFileCandidate

# tokens that should be removed from filenames when generating titles and before truncation (including short variants)
$stopTokens = @('system','syst','syste','sys','sy','col','coll','collection')

# image extensions we care about
$imageExtRegex = '\.(jpg|jpeg|png|gif|bmp|webp)$'

function SanitizeBase([string]$name) {
    $n = [System.IO.Path]::GetFileNameWithoutExtension($name)
    $n = $n.Trim()
    try { $norm = $n.Normalize([System.Text.NormalizationForm]::FormD) } catch { $norm = $n }
    $sb = New-Object System.Text.StringBuilder
    foreach ($ch in $norm.ToCharArray()) {
        if ($ch -match '[\p{L}\p{Nd}]') { [void]$sb.Append($ch) } else { [void]$sb.Append(' ') }
    }
    $clean = $sb.ToString().ToLower()
    $pattern = '(?i)(' + ((($stopTokens | ForEach-Object { [regex]::Escape($_) }) -join '|')) + ')'
    $clean = [regex]::Replace($clean, $pattern, ' ')
    $clean = [regex]::Replace($clean, '[\-_]?\d{1,6}\b', ' ')
    $joined = ($clean -replace '[^a-z0-9]+','_') -replace '_{2,}','_'
    $joined = $joined -replace '^_','' -replace '_$',''
    if ([string]::IsNullOrWhiteSpace($joined)) { $joined = 'img' }
    return $joined
}

function TruncateUnique([string]$base, [hashtable]$used, [int]$maxLen=15) {
    if (-not $used -or -not ($used -is [hashtable])) { $used = @{} }
    $san = $base
    if ($san.Length -le $maxLen -and -not $used.ContainsKey($san)) { $used[$san] = $true; return $san }
    for ($i=1; $i -lt 10000; $i++) {
        $suffix = '_' + $i.ToString()
        $bLen = [Math]::Max(1, $maxLen - $suffix.Length)
        $candidate = $san.Substring(0, [Math]::Min($san.Length, $bLen)) + $suffix
        if (-not $used.ContainsKey($candidate)) { $used[$candidate] = $true; return $candidate }
    }
    throw "Cannot create unique truncated name for $base"
}

function FriendlyTitle([string]$base) {
    $s = $base -replace '[^A-Za-z0-9]+',' '
    $s = $s.Trim()
    if ($s -eq '') { return $base }
    $parts = $s -split '\s+' | Where-Object { $_ -ne '' }
    $tc = $parts | ForEach-Object {
        if ($_.Length -eq 1) { $_.ToUpper() } else { ($_.Substring(0,1).ToUpper() + $_.Substring(1).ToLower()) }
    }
    return ($tc -join ' ')
}

function ChoosePreferredVariant([string]$folderPath, [string]$base) {
    $preferred = '.webp','.jpg','.jpeg','.png','.gif','.bmp'
    $matches = Get-ChildItem -Path $folderPath -File -ErrorAction SilentlyContinue | Where-Object { $_.BaseName -eq $base }
    if (-not $matches) { return $null }
    foreach ($ext in $preferred) {
        $found = $matches | Where-Object { $_.Extension.ToLower() -eq $ext }
        if ($found) { return $found[0].Name }
    }
    return ($matches | Select-Object -First 1).Name
}

# Build list of all directories to process (including root) as full-path strings, filter existing ones only
$allDirs = @()
$allDirs += $imagesRootPath
$subdirs = Get-ChildItem -Path $imagesRootPath -Directory -Recurse -ErrorAction SilentlyContinue | ForEach-Object { $_.FullName }
$allDirs += $subdirs
$allDirs = $allDirs | Where-Object { $_ -and (Test-Path $_) } | Sort-Object -Unique

$generated = @{}

foreach ($dir in $allDirs) {
    if ([System.IO.Path]::GetFileName($dir) -ieq 'miniatures') { continue }
    $relativeKey = ''
    if ($dir -eq $imagesRootPath) { $relativeKey = 'Root' } else { $relativeKey = $dir.Substring($imagesRootPath.Length).TrimStart('\') -replace '\\','/' }

    $pairs = @()
    $files = Get-ChildItem -Path $dir -File -ErrorAction SilentlyContinue | Where-Object { $_.Extension -match $imageExtRegex }
    $used = @{}
    foreach ($f in $files) {
        $cleanBase = SanitizeBase($f.Name)
        $uniqBase = TruncateUnique($cleanBase, $used, 15)
        $baseSan = $uniqBase -replace '_\d+$',''
        $chosenMain = ChoosePreferredVariant($dir, $baseSan)
        if (-not $chosenMain) { $chosenMain = $f.Name }
        $miniFolder = Join-Path $dir 'miniatures'
        $miniChosen = $null
        if (Test-Path $miniFolder) { $miniChosen = ChoosePreferredVariant($miniFolder, $baseSan) }
        if (-not $miniChosen) { $miniChosen = $chosenMain }

        if ($relativeKey -eq 'Root') {
            $relativeImage = "assets/images/$($chosenMain)"
            $relativeMini = "assets/images/$($miniChosen)"
        } else {
            $relativeImage = "assets/images/$relativeKey/$($chosenMain)"
            $relativeMini = "assets/images/$relativeKey/miniatures/$($miniChosen)"
        }

        $title = FriendlyTitle($baseSan)
        $pairs += @{ title = $title; imageUrl = $relativeImage; miniatureUrl = $relativeMini }
    }
    if ($pairs.Count -gt 0) { $generated[$relativeKey] = $pairs }
}

# Write TypeScript provider file with a typed interface and deploy-ready paths
$tsHeader = "// This file is auto-generated by prepare_images.bat. Do not edit by hand.`r`n" +
"export interface GeneratedImage { title: string; imageUrl: string; miniatureUrl?: string }`r`n" +
"export const GENERATED_IMAGE_DATA: { [folder: string]: GeneratedImage[] } = "
$tsBody = ($generated | ConvertTo-Json -Depth 8)
$tsContent = $tsHeader + $tsBody + ';'

try { $providerFileResolved = [System.IO.Path]::GetFullPath($providerFileCandidate) } catch { $providerFileResolved = $providerFileCandidate }
Write-Host "Writing provider to: $providerFileResolved"
$tsContent | Out-File -FilePath $providerFileResolved -Encoding UTF8 -Force

$totalGeneratedFolders = ($generated.Keys | Measure-Object).Count
$totalGeneratedImages = ($generated.GetEnumerator() | ForEach-Object { $_.Value.Count } | Measure-Object -Sum).Sum
if (-not $totalGeneratedImages) { $totalGeneratedImages = 0 }
Write-Host "Generated provider: $providerFileResolved"
Write-Host "  Folders: $totalGeneratedFolders"
Write-Host "  Images total: $totalGeneratedImages"
Write-Host 'Done.'
