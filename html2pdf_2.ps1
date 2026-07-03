$word = New-Object -ComObject Word.Application
$word.Visible = $false
$word.DisplayAlerts = 'wdAlertsNone'

$htmlFile = "d:\justificadll\gabungan_backlog_mockup.html"
$pdfFile = "d:\justificadll\gabungan_backlog_mockup.pdf"

Write-Host "Converting $htmlFile to $pdfFile"
$doc = $word.Documents.Open($htmlFile)
$doc.SaveAs2([ref]$pdfFile, [ref]17)
$doc.Close([ref]0)

$word.Quit()
[System.Runtime.Interopservices.Marshal]::ReleaseComObject($word) | Out-Null
Write-Host "Conversion completed."
