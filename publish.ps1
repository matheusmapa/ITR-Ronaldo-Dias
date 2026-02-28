param (
    [string]$message
)

# Step 1: Add all files
Write-Host "Adding files..."
git add .

# Step 2: Commit
Write-Host "Committing changes with message: $message"
git commit -m $message

# Step 3: Push
Write-Host "Pushing to GitHub..."
git push origin main

# Step 4: Notify via ntfy (reading from notify.txt if exists)
$notifyFile = "notify.txt"
if (Test-Path $notifyFile) {
    $notification = Get-Content $notifyFile -Raw
    Write-Host "Sending notification: $notification"
    curl.exe -d $notification -H "Title: ITR Socio Tecnico" ntfy.sh/Metodo_ITR
    Remove-Item $notifyFile
} else {
    Write-Host "No notify.txt found, skipping notification."
}
