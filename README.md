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

## AI tools used
ChatGPT, and Claude, mainly for planning the approach, reference code, and catching bugs. One thing AI-generated code got wrong: a `hasMany` relationship method with no `use` import for `HasMany`, which threw a fatal error until I added it.