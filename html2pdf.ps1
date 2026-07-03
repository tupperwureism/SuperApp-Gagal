$word = New-Object -ComObject Word.Application
$word.Visible = $false
$word.DisplayAlerts = 'wdAlertsNone'

$htmlFiles = @(
    "d:\justificadll\gabungan_diagram_uc.html",
    "d:\justificadll\gabungan_backlog_mockup.html"
)

foreach ($htmlFile in $htmlFiles) {
    $pdfFile = $htmlFile.Replace(".html", ".pdf")
    Write-Host "Converting $htmlFile to $pdfFile"
    $doc = $word.Documents.Open($htmlFile)
    
    # SaveAs2 format 17 is wdFormatPDF
    $doc.SaveAs2([ref]$pdfFile, [ref]17)
    $doc.Close([ref]0)
}

$word.Quit()
[System.Runtime.Interopservices.Marshal]::ReleaseComObject($word) | Out-Null
Write-Host "Conversion completed."
