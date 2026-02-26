This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

## Early access → Google Sheet

This project includes an early-access form that can write signups to a Google Sheet via a Google Apps Script Web App.

- **Apps Script code**: `google-apps-script.gs`
- **API route** (server-side): `app/api/early-access/route.ts`

### Setup

1. Create a Google Sheet.
2. In the Sheet go to **Extensions → Apps Script**, paste the contents of `google-apps-script.gs`.
3. Deploy it as a Web App:
   - Deploy → **New deployment**
   - Select **Web app**
   - Execute as: **Me**
   - Who has access: **Anyone**
4. Copy the **Web app URL**.
5. Create `.env.local` (you can copy `.env.local.example`) and set:

```bash
GOOGLE_APPS_SCRIPT_URL="PASTE_WEB_APP_URL_HERE"
```

6. Restart the dev server.


This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
