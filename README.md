# MVP with Realtime TLA+

This is a proof of concept for using LLM's to improve the user experience of designing with TLA+: [https://mvp-tla-instant.vercel.app/](https://mvp-tla-instant.vercel.app/)

The idea is to use the OpenAI API to generate LLM's for TLA+ specs in realtime as the user types.

Warning:

- Since the backend is running on a serverless Vercel function, it can time out while waiting for a response from the OpenAI API. In short: if a long prompt is sent, it may error out because it timed out. This could be fixed by migrating, but this is just a proof of concept.

## The stack

1. Frontend - This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app) and Tailwind.

2. Backend - The backend is the default express server from next.js starter.

3. APIs - the app's LLMs is powered by the OpenAI API.

## Getting Started

First, install the packaged and run the development server:

```bash
npm install

npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.tsx`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.ts`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Environment variables

The following environment variables are required to run the app: `OPENAI_API_KEY` which you should add in an `.env` file if you deploy.