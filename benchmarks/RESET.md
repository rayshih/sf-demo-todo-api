# Reset to the baseline

Benchmark tasks start from the `baseline-v1` tag. The task proposal calls that tag `bench-v1`. This repository uses `baseline-v1`. Create the tag on the baseline merge commit after it lands on `main`, then leave the tag where it is so later runs stay repeatable.

## Tag the merged baseline

```bash
git checkout main
git pull origin main
git tag -a baseline-v1 -m "Benchmark baseline v1"
git push origin baseline-v1
```

## Reset a checkout

From the repository root, with a clean working tree:

```bash
./scripts/reset-baseline.sh
```

The script fetches the tag and checks it out in detached HEAD. Open a task branch from there:

```bash
git switch -c task-branch
```

If the tag does not exist yet, the script stops and prints the tag commands above. It also stops when the working tree has uncommitted changes.
