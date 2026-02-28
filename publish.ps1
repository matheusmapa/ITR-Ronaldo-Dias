param (
    [string]$message,
    [string]$notification
)

# Step 1: Add all files
Write-Host "Adding files..."
git add .

# Step 2: Commit
Write-Host "Committing changes..."
git commit -m $message

# Step 3: Push
Write-Host "Pushing to GitHub..."
git push origin main

# Step 4: Notify via ntfy
Write-Host "Sending notification..."
curl.exe -d $notification -H "Title: ITR Socio Tecnico" ntfy.sh/Metodo_ITR
