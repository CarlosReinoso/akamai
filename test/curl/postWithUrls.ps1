$headers = @{
    "accept" = "application/json"
    "content-type" = "application/json"
}

$body = @{
    objects = @("https://xcdn.next.co.uk/common/items/default/default/itemimages/altitemzoom/762695s2.jpg?im=Resize,width=364", "https://xcdn.next.co.uk/common/items/default/default/itemimages/altitemzoom/762695s2.jpg?im=Resize,width=364")
} | ConvertTo-Json

$response = Invoke-RestMethod -Uri "http://localhost:3000/api/akamai" -Method Post -Headers $headers -Body $body

# If you wish to see the response content, you can print it out
Write-Output $response

# Pause is used in batch files to keep the window open, in PowerShell, you can use the following command to achieve a similar effect:
Read-Host -Prompt "Press Enter to continue"
