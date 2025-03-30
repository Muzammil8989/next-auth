# Next.js Authentication Project

This is a **Next.js** project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app). It uses **NextAuth.js** for authentication, **Prisma** with MongoDB as the database, and **ShadCN UI** for styling.

## 📌 Features
- Authentication with **NextAuth.js** (Email & Password-based)
- **Prisma ORM** for database interaction
- **MongoDB** as the database
- **ShadCN UI** components
- Middleware for protected routes
- API routes for user registration, session management, and authentication
- Fully typed with **TypeScript**

## 🚀 Getting Started

### 1️⃣ Clone the Repository
```bash
git clone https://github.com/Muzammil8989/next-auth.git
cd next-auth
```

### 2️⃣ Install Dependencies
```bash
npm install
# or
yarn install
# or
pnpm install
```

### 3️⃣ Set Up Environment Variables
Create a `.env` file in the root directory and add the following:
```env
DATABASE_URL="mongodb+srv://username:password@cluster.mongodb.net/your-database"
NEXTAUTH_SECRET="your-secret-key"
NEXTAUTH_URL="http://localhost:3000"
```

### 4️⃣ Run Database Migrations
```bash
npx prisma migrate dev --name init
```

### 5️⃣ Start the Development Server
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📂 Project Structure
```
└── 📁 next-auth
    ├── 📁 prisma (Database schema)
    ├── 📁 public (Static assets)
    ├── 📁 src
    │   ├── 📁 app
    │   │   ├── 📁 api/auth (Authentication routes)
    │   │   ├── 📁 dashboard (User dashboard)
    │   │   ├── 📁 signin / signup (Auth pages)
    │   │   ├── layout.tsx / page.tsx (Main layout & pages)
    │   ├── 📁 components (Reusable UI components)
    │   ├── 📁 lib (Prisma client, session handling)
    │   ├── 📁 types (TypeScript types)
    │   ├── middleware.ts (Middleware for authentication)
    ├── .env (Environment variables)
    ├── next.config.ts (Next.js configuration)
    ├── tsconfig.json (TypeScript config)
```

## 🔐 Authentication Flow
- `src/lib/auth.ts` handles authentication logic using **NextAuth.js**.
- `src/components/auth-provider.tsx` provides authentication context.
- `src/app/api/auth/register/route.ts` handles user registration.
- `middleware.ts` protects private routes.

## 🎨 UI with ShadCN
We use [ShadCN UI](https://ui.shadcn.com) for styling. Components are located in `src/components/ui/`.

## 🔄 Deployment
The easiest way to deploy this Next.js app is on **Vercel**:
```bash
vercel
```
Or refer to [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying).

---
**Happy Coding! 🚀**

