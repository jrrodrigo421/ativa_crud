#!/bin/bash

GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' 

command_exists() {
    command -v "$1" >/dev/null 2>&1
}

check_requirements() {
    echo -e "${BLUE}Checking requirements...${NC}"
    
    local missing_requirements=false
    
    if ! command_exists fly; then
        echo -e "${RED}Error: fly CLI is not installed.${NC}"
        echo "Please install it from https://fly.io/docs/hands-on/install-flyctl/"
        missing_requirements=true
    fi
    
    if ! command_exists vercel; then
        echo -e "${RED}Error: Vercel CLI is not installed.${NC}"
        echo "Please install it with: npm install -g vercel"
        missing_requirements=true
    fi
    
    if [ "$missing_requirements" = true ]; then
        echo -e "${RED}Please install the missing requirements and try again.${NC}"
        exit 1
    fi
    
    echo -e "${GREEN}All requirements are met!${NC}"
}

echo -e "${BLUE}=== ATIVA CRUD DEPLOYMENT SCRIPT ===${NC}"
echo -e "${BLUE}This script will deploy the database, backend, and frontend.${NC}"
echo

check_requirements

echo -e "${YELLOW}Do you want to create a new PostgreSQL database on Fly.io? (y/n)${NC}"
read -p "Create new database? " CREATE_DB

if [[ $CREATE_DB == "y" || $CREATE_DB == "Y" ]]; then
    echo -e "${GREEN}Step 1: Deploying PostgreSQL to Fly.io...${NC}"
    cd backend
    
    echo "Creating PostgreSQL instance on Fly.io..."
    fly postgres create --name ativa-db --region gru
    
    echo "Getting PostgreSQL connection string..."
    DB_URL=$(fly postgres connect --app ativa-db --show-connection-string)
    
    cd ..
else
    echo -e "${YELLOW}Please enter your existing PostgreSQL connection string:${NC}"
    read -p "Database URL: " DB_URL
    
    if [ -z "$DB_URL" ]; then
        echo -e "${RED}Error: Database URL cannot be empty.${NC}"
        exit 1
    fi
fi

echo -e "${GREEN}Step 2: Deploying backend to Fly.io...${NC}"
cd backend

echo "Setting DATABASE_URL secret..."
fly secrets set DATABASE_URL="$DB_URL"

echo "Setting SECRET_KEY secret..."
SECRET_KEY=$(openssl rand -hex 32)
fly secrets set SECRET_KEY="$SECRET_KEY"

if [ ! -f "fly.toml" ]; then
    echo "Creating Fly.io app..."
    fly apps create ativa-backend
fi

echo "Deploying backend to Fly.io..."
fly deploy

if [ $? -ne 0 ]; then
    echo -e "${RED}Error: Failed to deploy backend.${NC}"
    exit 1
fi

BACKEND_URL=$(fly apps list | grep ativa-backend | awk '{print $3}')
echo -e "${GREEN}Backend deployed to: $BACKEND_URL${NC}"

cd ..

echo -e "${GREEN}Step 3: Updating frontend configuration...${NC}"
BACKEND_API_URL="https://$BACKEND_URL/api/v1"

echo "Updating Vercel environment variables..."
cd frontend
vercel env add REACT_APP_API_URL $BACKEND_API_URL

echo -e "${GREEN}Step 4: Deploying frontend to Vercel...${NC}"
echo "Deploying frontend to Vercel..."
vercel --prod

if [ $? -ne 0 ]; then
    echo -e "${RED}Error: Failed to deploy frontend.${NC}"
    exit 1
fi

echo
echo -e "${GREEN}Deployment completed!${NC}"
echo -e "${BLUE}Backend URL: https://$BACKEND_URL${NC}"
echo -e "${BLUE}Frontend URL will be shown in the Vercel output above.${NC}"
echo
echo -e "${BLUE}=== DEPLOYMENT FINISHED ===${NC}" 