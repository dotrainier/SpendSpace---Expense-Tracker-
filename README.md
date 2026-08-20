# Expense Tracker

A small multi-workspace expense tracker built for the technical assessment. Each user can own multiple workspaces (e.g. "Household", "Freelance Work"), and expenses are scoped to the workspace they belong to.

## Stack
Laravel 12 (Fortify auth) + Inertia + React (TypeScript) + SQLite

## Setup

composer install
npm install
cp .env.example .env
php artisan key:generate
php artisan migrate --seed
npm run dev
php artisan serve


## Demo logins
- alice@demo.test / password — has two workspaces (Household, Freelance Work)
- bob@demo.test / password — has one workspace, separate from Alice's

## Why built this way
I used the starter kit so I could spend my time on the actual expense/workspace logic instead of setting up Inertia and auth from scratch. My goal here was a working demo, not a full production app, so I kept scope tight.

A workspace belongs to a user (not the other way around) because the assessment needed a user to switch between two different workspaces. If I put workspace_id directly on the user, one account could only ever have one workspace, which wouldn't work.

Every expense route checks that the workspace actually belongs to the logged in user before it touches any data, since that was the main thing the job post cared about, not just building CRUD.

I kept it to one workspace type per user for now (not shared/multi-user workspaces) to stay inside the time limit. No automated test yet either, I tested it manually by logging in as both users and trying to access the other's data.

## AI tools used
ChatGPT, and Claude, mainly for planning the approach, reference code, and catching bugs. One thing AI-generated code got wrong: a `hasMany` relationship method with no `use` import for `HasMany`, which threw a fatal error until I added it.