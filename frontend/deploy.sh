#!/bin/bash

# JetrPay Deployment Script
# Run this to deploy the complete platform

set -e  # Exit on error

echo "🚀 JetrPay Platform Deployment"
echo "==============================="
echo ""

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Step 1: Install dependencies
echo -e "${BLUE}Step 1: Installing optional dependencies...${NC}"
npm install --save-optional pino-pretty
echo -e "${GREEN}✓ Dependencies installed${NC}"
echo ""

# Step 2: Build production version
echo -e "${BLUE}Step 2: Building production version...${NC}"
npm run build
echo -e "${GREEN}✓ Production build complete${NC}"
echo ""

# Step 3: Test production build locally (optional)
echo -e "${YELLOW}To test production build locally, run: npm run start${NC}"
echo ""

# Step 4: Deploy to Vercel
echo -e "${BLUE}Step 3: Deploying to Vercel...${NC}"
echo "Run: vercel --prod"
echo ""
echo -e "${GREEN}Deployment preparation complete!${NC}"
echo ""
echo "Next steps:"
echo "1. Run: vercel login (if not already logged in)"
echo "2. Run: vercel --prod"
echo "3. Add environment variables in Vercel dashboard"
