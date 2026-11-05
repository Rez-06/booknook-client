# BookNook

A small online library. **Add a book, borrow a book, return a book.**

🔗 **Live site:** https://booknook-client-rez24.vercel.app/
🔗 **API:** https://booknook-server-rez24.vercel.app/

## Features

- Browse every book in a responsive 3-column grid, with category filters
- Add books with a cover image (uploaded to imgbb) and a total-copies count
- Borrow for 7 days; copies go down on borrow and back up on return, and a book with no copies left shows "Not Available"
- A bookmark strip appears on the cover of every book you have borrowed
- No double borrowing: a second attempt shows an error toast
- Edit or delete your own books, with a confirm modal before deleting
- Email/password and Google sign-in with Better Auth, and private routes that survive a page reload
- JWT-protected API calls verified by the Express server
- Dark and light themes, a Swiper home slider and Framer Motion reveals

## Tech

Next.js (App Router), TypeScript, Tailwind CSS, DaisyUI, Better Auth (MongoDB adapter),
Swiper, Framer Motion, react-hot-toast. Server: Express, MongoDB, jose.

## Run locally

```bash
npm install
cp .env.example .env.local   # fill in the values
npm run dev
```

Open http://localhost:3000. The server repo must be running on `NEXT_PUBLIC_API_URL`.
