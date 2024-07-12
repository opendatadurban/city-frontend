#!/bin/sh
set -ex

# Computes the diff of `dist` between a provided base reference (branch, tag, commit SHA) and the current HEAD.
# It outputs the resulting diff in the provided output folder
#
# Usage: `bin/dist-diff.sh <base-reference> <output-folder>`

# Default the base branch to main to allow running locally quickly
base="${1:-main}"
# And the output folder to the current working directory
output_folder="${2:-`pwd`}"

rm -Rf .cache/diff/dist
mkdir -p .cache/diff/dist

# Diff the minified JS file
git diff \
  $base:dist/city-frontend-$(git show $base:dist/VERSION.txt).min.js \
  dist/city-frontend-$(cat dist/VERSION.txt).min.js \
  > $output_folder/.cache/diff/dist/js.diff

# Diff the minified CSS file
git diff \
  $base:dist/city-frontend-$(git show $base:dist/VERSION.txt).min.css \
  dist/city-frontend-$(cat dist/VERSION.txt).min.css \
  > $output_folder/.cache/diff/dist/css.diff

# Diff the rest of the files, excluding the sourcemaps and the minified files
# See https://git-scm.com/docs/gitglossary#Documentation/gitglossary.txt-aiddefpathspecapathspec
git diff -M05 $base -- dist ":(exclude)dist/*.min.*" \
  > $output_folder/.cache/diff/dist/other.diff
