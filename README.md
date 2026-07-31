# Web Dev Cohort 2026

This is my working repository for the [ChaiCode Web Development Cohort 2026](https://chaicode.com/). It is less of a single product and more of a record of things I have built while learning—some small, some rough around the edges, and all useful practice.

## What is inside

Everything lives in `assignments/`.

- **`html-css/`** — static pages built from scratch, including Cursor and Mintlify landing-page recreations, plus a single-page resume.
- **`js-practice/`** — browser-based JavaScript exercises: an authentication flow, colour palette generator, dark/light theme toggle, and dynamic list creator.
- **`react/`** — small React + Vite interfaces for browsing cats, jokes, meals, products, quotes, random users, and YouTube videos.
- **`js-github-classroom/`** — JavaScript labs covering data types, conditionals, loops, functions, DOM work, async code, and OOP. This folder also contains Express/MongoDB API assignments: a todo CRUD API, authentication API, and image-upload API.
- **`db-design/`** — database design exercises with ER diagrams and schemas for systems such as clinic appointments, Comic-Con parking, fitness coaching, a thrift store, and smart elevators.

## Running a project

Each project is self-contained, so there is no one command that starts the whole repository.

For a React project, move into its folder and run:

```bash
npm install
npm run dev
```

For the plain HTML/CSS/JavaScript exercises, open `index.html` in a browser (or use a local development server). Backend assignments have their own README files and may need environment variables, MongoDB, or Docker before they can run.

## A small note

This repository grows alongside the cohort. Some assignments are deliberately kept as snapshots of where I was at that point in the learning process, so the code style and completeness will naturally vary from folder to folder.
