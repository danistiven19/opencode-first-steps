# Opencode Test Project

This repository serves as a dynamic testing ground for the `opencode` AI developer environment. It is designed to demonstrate how AI agents can collaboratively manage a full software development lifecycle, from initial structure definition to feature implementation.

## 🕹️ Project Overview: The Game

The project features a simple, interactive web game (details contained within `game.js`). This game serves as the primary demonstration piece, allowing us to test the agent's ability to implement complex, functional client-side logic based on high-level prompts. The goal is to showcase the agent's capability to build, debug, and refine code iteratively.

## 🏗️ Architecture Summary

The current architecture is a streamlined, single-page web application following a clear separation of concerns:

1.  **User Interface (`index.html`):** Provides the structural boilerplate and embeds the necessary scripts, acting as the entry point for the user.
2.  **Game Logic (`game.js`):** Contains the core logic, state management, and rendering functionality for the interactive game. This file is the primary area where new features are added or bugs are fixed.
3.  **Agent Configuration (`opencode.json`):** This crucial file defines the configuration and parameters specifically for the `opencode` environment. It dictates how the AI agent should operate, what tools it has access to, and how the workflow should be managed.
4.  **Agent Workflow (`AGENTS.md`):** Documents the overarching workflow and internal conventions used by the development agents, guiding large-scale refactoring and feature implementation.

## 💡 Logic & Development Principles

The core principle demonstrated here is **Agent-Driven Development**.

*   The developer agents (opencode) are responsible for interpreting requirements and breaking them down into actionable code changes.
*   The system relies heavily on the defined state within `opencode.json` and the defined procedures in `AGENTS.md`.
*   Code changes are not monolithic; they are iterative, following a read -> modify -> test loop managed by the agent framework.

## 🚀 Getting Started

To run this project locally:

1.  Clone the repository.
2.  Open `index.html` in your web browser.

If the project is to be continuously developed and tested:

*   The developer agent (opencode) will be used to execute feature requests by modifying files like `game.js` and updating `opencode.json`.

---
*Built with opencode, powered by AI collaboration.*