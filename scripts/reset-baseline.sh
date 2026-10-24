#!/usr/bin/env bash
# Check out the benchmark baseline tag (baseline-v1).
set -euo pipefail

TAG="baseline-v1"
ROOT="$(git rev-parse --show-toplevel)"
cd "$ROOT"

if [ -n "$(git status --porcelain)" ]; then
  echo "Working tree is not clean. Commit or stash changes before resetting to ${TAG}." >&2
  exit 1
fi

git fetch origin tag "$TAG" || true

if ! git rev-parse --verify --quiet "refs/tags/${TAG}" >/dev/null; then
  echo "Tag ${TAG} is not in this clone." >&2
  echo "After the baseline pull request is merged, tag that commit:" >&2
  echo "  git checkout main" >&2
  echo "  git pull origin main" >&2
  echo "  git tag -a ${TAG} -m \"Benchmark baseline v1\"" >&2
  echo "  git push origin ${TAG}" >&2
  exit 1
fi

git checkout "$TAG"
echo "Checked out ${TAG} ($(git rev-parse --short HEAD))." >&2
echo "Create a task branch with: git switch -c task-branch" >&2
