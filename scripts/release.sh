#!/bin/bash

# Seatmap Canvas Release Script
# Usage: ./scripts/release.sh [patch|minor|major]

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Check if release type is provided
if [ -z "$1" ]; then
  echo -e "${RED}Error: Release type is required${NC}"
  echo "Usage: ./scripts/release.sh [patch|minor|major]"
  echo ""
  echo "Examples:"
  echo "  ./scripts/release.sh patch   # 2.7.1 -> 2.7.2"
  echo "  ./scripts/release.sh minor   # 2.7.1 -> 2.8.0"
  echo "  ./scripts/release.sh major   # 2.7.1 -> 3.0.0"
  exit 1
fi

RELEASE_TYPE=$1

# Validate release type
if [[ ! "$RELEASE_TYPE" =~ ^(patch|minor|major)$ ]]; then
  echo -e "${RED}Error: Invalid release type '$RELEASE_TYPE'${NC}"
  echo "Valid types: patch, minor, major"
  exit 1
fi

# Check if working directory is clean
if [[ -n $(git status -s) ]]; then
  echo -e "${RED}Error: Working directory is not clean${NC}"
  echo "Please commit or stash your changes first"
  git status -s
  exit 1
fi

# Get current version
CURRENT_VERSION=$(node -p "require('./package.json').version")
echo -e "${YELLOW}Current version: ${CURRENT_VERSION}${NC}"

# Bump version
echo -e "${GREEN}Bumping $RELEASE_TYPE version...${NC}"
npm version $RELEASE_TYPE --no-git-tag-version

# Get new version
NEW_VERSION=$(node -p "require('./package.json').version")
echo -e "${GREEN}New version: ${NEW_VERSION}${NC}"

# Commit package.json change
git add package.json package-lock.json 2>/dev/null || git add package.json
git commit -m "chore: bump version to ${NEW_VERSION}"

# Create and push tag
echo -e "${GREEN}Creating tag v${NEW_VERSION}...${NC}"
git tag "v${NEW_VERSION}"

echo -e "${YELLOW}Pushing changes and tag to remote...${NC}"
git push origin master
git push origin "v${NEW_VERSION}"

echo ""
echo -e "${GREEN}✓ Release v${NEW_VERSION} created successfully!${NC}"
echo ""
echo "GitHub Actions will now:"
echo "  1. Build the package"
echo "  2. Publish to NPM"
echo "  3. Create GitHub Release with changelog"
echo ""
echo "Track progress at: https://github.com/alisaitteke/seatmap-canvas/actions"
