# Conduit Body Website

Welcome to the Conduit Body Website project. This is a modern Next.js application built with the App Router and Zustand for state management. All business data is stored in JSON files to support a fully mock-driven development experience.

## 🚀 Project Overview

This repository demonstrates a lightweight ecommerce and CRM platform featuring a product catalog, quoting flow, admin dashboard and more. It showcases how to build robust interfaces with minimal backend infrastructure by persisting data locally in JSON.

## ✨ Features

- **Product Catalog** – Browse products with detailed descriptions and images
- **Order & Quote Management** – Users can create quotes and track order status
- **Customer CRM** – Manage customer records and track interactions
- **Admin Dashboard** – Overview of leads, sales and marketing metrics
- **CMS Content Editor** – Simple content management for pages
- **Mock Live Chat** – Example chat widget for customer support
- **Mock Analytics** – Placeholder analytics components
- **Authentication & Roles** – Basic login with Zustand state
- **Workflow Automation** – If/then logic hooks for marketing automation
- **JSON Persistence** – All data saved to files in the `data/` directory

## 🛠 Tech Stack

- [Next.js](https://nextjs.org/) App Router (TypeScript)
- [Zustand](https://github.com/pmndrs/zustand) for client state
- [Tailwind CSS](https://tailwindcss.com/) for styling
- Radix UI + shadcn/ui components
- Local JSON files as a mock database

## 📂 Folder Structure

```
app/              Next.js routes (App Router)
├─ api/           Mock API routes backed by JSON
├─ admin/         Admin dashboard and tools
├─ products/      Product catalog pages
components/       Reusable React components
data/             JSON files for persistence
hooks/            Custom React hooks
lib/              Zustand stores and utilities
public/           Static assets
styles/           Global CSS and Tailwind config
```

## ▶️ Local Development

1. **Install dependencies**
   ```bash
   pnpm install
   ```
2. **Start the dev server**
   ```bash
   pnpm dev
   ```
3. Open `http://localhost:3000` in your browser.

To create a production build run `pnpm build` and `pnpm start`.

## ℹ️ Status

This repository is a mock-driven development build. It provides real data persisted to JSON files but does not use a real database or production authentication system.

Enjoy exploring the codebase! 🎉
