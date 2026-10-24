# sf-demo-todo-api

This repository is the benchmark target for [Software Factory](https://github.com/rayshih/software-factory). That pipeline turns GitHub issues into pull requests. The twelve standardised tasks in [benchmarks/BENCHMARK_ISSUES.md](benchmarks/BENCHMARK_ISSUES.md) run against this service.

The application is a small TypeScript and Express todo API with an in-memory repository. The commit tagged `baseline-v1` is the starting point for every run. The bugs, missing features, missing tests, and pre-refactor layout described in the task list are intentional. Solve one benchmark task from a fresh checkout of that tag.

## Layout

- `src/` — HTTP application, validation, and the in-memory todo repository
- `test/` — Vitest tests for behaviour that is already in place
- `benchmarks/` — task definitions and instructions for returning to the baseline tag
- `.github/workflows/ci.yml` — lint, typecheck, and test on pull requests and `main`

## Baseline tag

After this baseline is merged, tag that commit `baseline-v1`. [benchmarks/RESET.md](benchmarks/RESET.md) explains how to create the tag and how to reset a checkout. The proposal text calls the tag `bench-v1`; this repository uses `baseline-v1`.

MIT licensed. See [LICENSE](LICENSE).
