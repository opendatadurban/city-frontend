#!/bin/sh
set -e

CURRENT_BRANCH_NAME=$(git rev-parse --abbrev-ref HEAD)
CURRENT_VERSION=$(npm run version --silent --workspace city-frontend)

BRANCH_NAME="preview-$CURRENT_BRANCH_NAME"
VERSION="$CURRENT_VERSION-$CURRENT_BRANCH_NAME"

# Check if there are files that need to be commited
if [[ -n $(git status --porcelain) ]]; then
  echo "⚠️ You have unstaged files, please commit these and then try again."
  exit 1
fi

# Remove local branch if it already exists
if [ `git branch --list $BRANCH_NAME` ]; then
  echo "⚠️ Cleaning up branch $BRANCH_NAME that already exists."
  git branch -D $BRANCH_NAME
fi

# Work on the new branch
git checkout -b $BRANCH_NAME

# Build the package as normal
npm run build:package

# npm will try to install dev, optional and peer dependencies
# when installing from a Git repository, which will error
# when looking for our `@city-frontend/xyz@*` packages
# pointing to the npm workspaces in our source
echo "✍️ Remove dev dependencies"
npm pkg delete devDependencies --workspace city-frontend

echo "✍️ Update package version"
npm version $VERSION --allow-same-version --no-git-tag-version --workspace city-frontend
git add packages/city-frontend/package.json
git add package-lock.json

echo "✍️ Force commit package"
git add --force packages/city-frontend/dist/
git add --force packages/city-frontend/city-prototype-kit.config.json
git commit --allow-empty -m "Release GOV.UK Frontend 'v$VERSION' to '$BRANCH_NAME' for testing"

# Create a local branch containing the packages/city-frontend directory
echo "✨ Filter the branch to only the packages/city-frontend/ directory..."
git filter-branch --force --subdirectory-filter packages/city-frontend

# Force the push of the branch to the remote Github origin
git push origin $BRANCH_NAME:$BRANCH_NAME --force

echo "⚠️ Branch pushed to '$BRANCH_NAME', do not edit this by hand."

git checkout -

BRANCH_COMMIT_SHA=$(git rev-parse --short $BRANCH_NAME)

echo
echo "✅ Success! To install the pushed branch release, run 'npm install --save \"alphagov/city-frontend#$BRANCH_COMMIT_SHA\"'"
