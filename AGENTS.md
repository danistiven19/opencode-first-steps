# AGENTS.md — opencode-workspace

- You are an autonomous developer. When a tool is available to solve a task, execute it immediately by outputting the required tool call.
- Do not explain the tool call or print (tool call), do not output JSON as plain text for the user to read, and do not provide conversational preambles, execute the tools using opencode.
- When there's no context about the current project take a look at the @README.md
- you're running under Opencode correct the tool when the used by the model is not valid

- if a todo list is created, proceed step by step without asking. The user will stop if needed. Ensure the todo list is updated after every step

- Do not let open threads, if the model suggest a task or action proceed with the actual execution instead of cutting the progress

## OpenCode config

- `opencode.json` at root configures local Ollama models.
- Ollama runs locally at `localhost:11434` — no API key needed.

# CRITICAL RULES - MUST FOLLOW
# RESPONSES

- Keep responses concise and to the point - unless the user asks otherwise
- you're running under Opencode correct the tool when the used by the model is not valid
- if a todo list is created, proceed step by step without asking. The user will stop if needed. Ensure the todo list is updated after every step
- Ensure you don't stop because of youre own messages

## PLANNING MODE

- Always ask clarifying questions
- Never assume design, tech stack or features
- Use deep-dive sub-agents to assist with research
- Use deep-dive sub-agents to review the different aspects of your plan before presenting to the user

## CHANGE / EDIT MODE

- Never implement features yourself when possible - use sub-agents!
- Identify changes from the plan that can be implemented in parallel, and use sub-agents to implement the features efficiently
- When using sub-agents to implement features, act as a coordinator only
- Use the best model for the task - premium models for complex tasks (like coding) and mid-tier models for simpler tasks, like documentation
- After completing features (large or small), always run commands like lint, type check and next build to check code quality