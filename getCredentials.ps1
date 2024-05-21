# Get the path to the current directory
$currentDirectory = $PWD.Path

# Construct the full path to the "credentials.txt" file
$filePath = Join-Path $currentDirectory "credentials.txt"
$envFilePath = Join-Path $currentDirectory ".env"

# Read the content of the credentials.txt file as a single string
$fileContent = Get-Content -Path $filePath -Raw

# Extract the 'Cookie' and 'X-XSRF-TOKEN' values using regex
$cookieLine = if ($fileContent -match 'Cookie:\s*(.*)') { $matches[1].Trim() } else { "Cookie not found" }
$xsrfTokenLine = if ($fileContent -match 'X-XSRF-TOKEN:\s*(.*)') { $matches[1].Trim() } else { "X-XSRF-TOKEN not found" }

# Read the content of the .env file
$envContent = Get-Content -Path $envFilePath -Raw

# Replace the COOKIE and TOKEN values in the .env file content without adding extra quotation marks
$updatedEnvContent = $envContent -replace 'COOKIE=".*"', "COOKIE=`"$cookieLine`"" -replace 'TOKEN=".*"', "TOKEN=`"$xsrfTokenLine`""

# Write the updated content back to the .env file
Set-Content -Path $envFilePath -Value $updatedEnvContent

Read-Host "Press Enter to exit..."
