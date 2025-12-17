Add-Type -AssemblyName System.IO.Compression.FileSystem

$docxPath = "Guida R36S.docx"
$zip = [System.IO.Compression.ZipFile]::OpenRead($docxPath)
$entry = $zip.Entries | Where-Object { $_.FullName -eq 'word/document.xml' }
$stream = $entry.Open()
$reader = New-Object System.IO.StreamReader($stream)
$content = $reader.ReadToEnd()
$reader.Close()
$stream.Close()
$zip.Dispose()

# Remove XML tags to get plain text
$content = $content -replace '<[^>]+>', ''
$content = $content -replace '\s+', ' '
$content = $content.Trim()

# Save to file
$content | Out-File -FilePath "extracted_text.txt" -Encoding UTF8

Write-Host "Text extracted successfully!"
