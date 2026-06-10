# AGENTS.md — opencode-workspace

This workspace is empty — no Git repository, code, or configuration exists yet.

## State

- **Git**: not initialized. Run `git init` before first commit.
- **No package manager** manifests, build files, or project config present.
- **No CI**, lint, test, or formatter setup.

## First-time setup

If you are about to start work:

1. Decide on project type (JS/TS, Python, Rust, etc.) and initialize accordingly.
2. Run `git init` and create a `.gitignore`.
3. Set up tooling (linter, formatter, typechecker) early — much harder to retrofit.
4. Consider adding an `opencode.json` workspace config if OpenCode-specific behavior is needed.

## OpenCode config

- `opencode.json` at root configures local Ollama models.
- **Main model**: `ollama/gemma4:latest` — primary coding agent.
- Ollama runs locally at `localhost:11434` — no API key needed.

- You are an autonomous developer. When a tool is available to solve a task, execute it immediately by outputting the required tool call. - Do not explain the tool call, do not output JSON as plain text for the user to read, and do not provide conversational preambles.
- you're running under Opencode correct the tool when the used by the model is not valid
- if a todo list is created, proceed step by step without asking. The user will stop if needed. Ensure the todo list is updated after every step
- Do not let open threads, if the model suggest a task or action proceed with the actual execution instead of cutting the progress

## Conventions

No conventions established yet. This file should be updated as the project grows.
