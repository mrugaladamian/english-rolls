# English Rolls

A lightweight Laravel app for Polish speakers learning basic English vocabulary.

## Overview

English Rolls works like a minimal flashcard experience. The user starts with a Polish word or phrase, reveals the English version, checks the pronunciation, and moves through the vocabulary set with quick, repeated interactions.

## Features

- Flashcard-style vocabulary practice
- English pronunciation support
- Optional custom video background
- Progress counter
- Simple click-based interaction flow
- Mastery rules for deciding when a word is completed

## Tech Stack

- PHP 8.3
- Laravel 13
- Blade
- Alpine.js
- Vite
- Tailwind CSS 4
- Docker

## User Guide

The user-facing instructions are available in [docs/usage.md](docs/usage.md).

## Live Demo

The production version is available at [english-rolls.onrender.com](https://english-rolls.onrender.com/).

## Project Structure

- `app/Http/Controllers` - request handling and page controllers
- `resources/views` - Blade templates
- `resources/css` - application styles
- `resources/js` - frontend behavior
- `resources/data` - vocabulary source files
- `docs/usage.md` - user guide
- `render.yaml` - Render deployment configuration

## Local Setup

```bash
composer install
npm install
cp .env.example .env
php artisan key:generate
npm run build
php artisan serve
```

For local frontend development, run:

```bash
npm run dev
```

## Render.com

The project is prepared for deployment as a Docker Web Service using `render.yaml`.

1. Connect the repository in Render.
2. Choose a Blueprint or a Docker-based Web Service.
3. Set `APP_KEY` in the environment variables to the value returned by:

```bash
php artisan key:generate --show
```

The current feature set does not require an application database or user sessions. The production configuration keeps the deployment lightweight and uses `stderr` logging for container-friendly logs.
