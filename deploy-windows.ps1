Write-Host "=== ATIVA CRUD DEPLOYMENT SCRIPT ===" -ForegroundColor Blue
Write-Host "This script will deploy the database, backend, and frontend." -ForegroundColor Blue
Write-Host ""

function Test-Command {
    param (
        [string]$Command
    )
    
    if (Get-Command $Command -ErrorAction SilentlyContinue) {
        return $true
    }
    return $false
}

Write-Host "Checking requirements..." -ForegroundColor Blue
$MissingRequirements = $false

if (-not (Test-Command "fly")) {
    Write-Host "Error: fly CLI is not installed." -ForegroundColor Red
    Write-Host "Please install it from https://fly.io/docs/hands-on/install-flyctl/"
    $MissingRequirements = $true
}

if (-not (Test-Command "vercel")) {
    Write-Host "Error: Vercel CLI is not installed." -ForegroundColor Red
    Write-Host "Please install it with: npm install -g vercel"
    $MissingRequirements = $true
}

if ($MissingRequirements) {
    Write-Host "Please install the missing requirements and try again." -ForegroundColor Red
    exit 1
}

Write-Host "All requirements are met!" -ForegroundColor Green

Write-Host "Do you want to create a new PostgreSQL database on Fly.io? (y/n)" -ForegroundColor Yellow
$CreateDb = Read-Host "Create new database?"

if ($CreateDb -eq "y" -or $CreateDb -eq "Y") {
    Write-Host "Step 1: Deploying PostgreSQL to Fly.io..." -ForegroundColor Green
    Set-Location -Path .\backend
    
    Write-Host "Creating PostgreSQL instance on Fly.io..."
    fly postgres create --name ativa-db --region gru
    
    Write-Host "Please copy the PostgreSQL connection string from the output above" -ForegroundColor Yellow
    $DbUrl = Read-Host "PostgreSQL connection string"
    
    Set-Location -Path ..
} else {
    Write-Host "Please enter your existing PostgreSQL connection string:" -ForegroundColor Yellow
    $DbUrl = Read-Host "Database URL"
    
    if ([string]::IsNullOrEmpty($DbUrl)) {
        Write-Host "Error: Database URL cannot be empty." -ForegroundColor Red
        exit 1
    }
}

Write-Host "Step 2: Deploying backend to Fly.io..." -ForegroundColor Green
Set-Location -Path .\backend

Write-Host "Creating Fly.io app..."
fly apps create ativa-backend

Write-Host "Setting DATABASE_URL secret..."
fly secrets set DATABASE_URL="$DbUrl"

Write-Host "Setting SECRET_KEY secret..."
$SecretKey = -join ((48..57) + (65..90) + (97..122) | Get-Random -Count 32 | ForEach-Object { [char]$_ })
fly secrets set SECRET_KEY="$SecretKey"

Write-Host "Deploying backend to Fly.io..."
fly deploy

if ($LASTEXITCODE -ne 0) {
    Write-Host "Error: Failed to deploy backend." -ForegroundColor Red
    exit 1
}

$BackendUrl = "ativa-backend.fly.dev"
Write-Host "Backend deployed to: $BackendUrl" -ForegroundColor Green

Set-Location -Path ..

Write-Host "Step 3: Updating frontend configuration..." -ForegroundColor Green
$BackendApiUrl = "https://$BackendUrl/api/v1"

Write-Host "Updating Vercel environment variables..."
Set-Location -Path .\frontend
vercel env add REACT_APP_API_URL $BackendApiUrl

Write-Host "Step 4: Deploying frontend to Vercel..." -ForegroundColor Green
Write-Host "Deploying frontend to Vercel..."
vercel --prod

if ($LASTEXITCODE -ne 0) {
    Write-Host "Error: Failed to deploy frontend." -ForegroundColor Red
    exit 1
}

Write-Host ""
Write-Host "Deployment completed!" -ForegroundColor Green
Write-Host "Backend URL: https://$BackendUrl" -ForegroundColor Blue
Write-Host "Frontend URL will be shown in the Vercel output above." -ForegroundColor Blue
Write-Host ""
Write-Host "=== DEPLOYMENT FINISHED ===" -ForegroundColor Blue 