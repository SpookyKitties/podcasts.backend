$letters = ("a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z")

foreach ($letter in $letters) {
    Write-Host $letter
    curl.exe ("https://itunes.apple.com/search?term=" + $letter + "&entity=podcast&limit=500&page=3") -o ($letter + ".json")
    Start-Sleep 5
}