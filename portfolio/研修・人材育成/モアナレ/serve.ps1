$root = Split-Path -Parent $MyInvocation.MyCommand.Definition
$listener = [System.Net.HttpListener]::new()
$listener.Prefixes.Add("http://localhost:3300/")
$listener.Start()
Write-Host "Serving at http://localhost:3300/"
while ($listener.IsListening) {
    $ctx = $listener.GetContext()
    $req = $ctx.Request
    $res = $ctx.Response
    $path = $req.Url.LocalPath
    if ($path -eq "/" -or $path -eq "") { $path = "/html/ip.html" }
    $fullPath = Join-Path $root ($path.TrimStart("/").Replace("/", "\"))
    if (Test-Path $fullPath -PathType Leaf) {
        $ext = [System.IO.Path]::GetExtension($fullPath)
        $mime = switch ($ext) {
            ".html" { "text/html; charset=utf-8" }
            ".css"  { "text/css; charset=utf-8" }
            ".js"   { "application/javascript; charset=utf-8" }
            ".png"  { "image/png" }
            ".jpg"  { "image/jpeg" }
            ".svg"  { "image/svg+xml" }
            default { "application/octet-stream" }
        }
        $bytes = [System.IO.File]::ReadAllBytes($fullPath)
        $res.ContentType = $mime
        $res.ContentLength64 = $bytes.Length
        $res.OutputStream.Write($bytes, 0, $bytes.Length)
    } else {
        $res.StatusCode = 404
        $msg = [System.Text.Encoding]::UTF8.GetBytes("Not Found: $path")
        $res.OutputStream.Write($msg, 0, $msg.Length)
    }
    $res.Close()
}
