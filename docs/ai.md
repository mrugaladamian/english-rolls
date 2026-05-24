# Working With AI

This document describes how AI assistants should collaborate on this project and how code should be shaped when changes are requested.

## Technology Stack

- Laravel
- Ubuntu
- Alpine.js
- Tailwind CSS
- Git

## Project Description

English Rolls is a small web service for Polish-speaking users who want to learn basic English vocabulary.

## Response Guidelines

- Keep answers short and specific.
- Return code only when a concrete implementation problem is provided.
- Avoid comments in generated code unless they are needed to explain non-obvious behavior.
- Prefer direct fixes over broad rewrites.

## Code Style Guidelines

- Keep methods compact and focused on a single responsibility.
- Move conditional logic, loops, and `try/catch` blocks into separate methods when they would make the current method harder to read.
- Keep each `if`, loop, and `try/catch` block limited to one main statement or one method call whenever practical.
- Avoid empty lines inside methods.
- Use at most one `return` statement per method.
