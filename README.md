# Next.js Authentication Project

This is a **Next.js** project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app). It utilizes **NextAuth.js** for authentication, **Prisma** with MongoDB as the database, and **ShadCN UI** for styling.

## 📌 Features
- **User Authentication** with **NextAuth.js** (Email & Password-based authentication)
- **Prisma ORM** for efficient database interaction
- **MongoDB** as the primary database
- **ShadCN UI** for modern, accessible components
- **Middleware protection** for securing private routes
- **API routes** for user registration, session management, and authentication
- **Fully typed with TypeScript** for reliability and maintainability
- **Email-based authentication support**
- **Environment variables** for secure credential management

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
EMAIL_SERVER_HOST="your-email-smtp-host"
EMAIL_SERVER_PORT="your-email-smtp-port"
EMAIL_SERVER_USER="your-email-username"
EMAIL_SERVER_PASSWORD="your-email-password"
EMAIL_FROM="your-email@example.com"
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
    ├── 📁 prisma (Database schema & migrations)
    ├── 📁 public (Static assets)
    ├── 📁 src
    │   ├── 📁 app
    │   │   ├── 📁 api/auth (Authentication routes)
    │   │   ├── 📁 dashboard (User dashboard)
    │   │   ├── 📁 signin / signup (Authentication pages)
    │   │   ├── layout.tsx / page.tsx (Main layout & pages)
    │   ├── 📁 components (Reusable UI components)
    │   ├── 📁 lib (Prisma client, session handling, authentication logic)
    │   ├── 📁 types (TypeScript types)
    │   ├── middleware.ts (Middleware for authentication protection)
    ├── .env (Environment variables configuration)
    ├── next.config.ts (Next.js configuration settings)
    ├── tsconfig.json (TypeScript configuration)
```

## 🔐 Authentication Flow
- `src/lib/auth.ts` handles authentication logic using **NextAuth.js**.
- `src/components/auth-provider.tsx` provides authentication context for the app.
- `src/app/api/auth/register/route.ts` manages user registration.
- `middleware.ts` ensures private routes remain protected.

## 🎨 UI with ShadCN
We use [ShadCN UI](https://ui.shadcn.com) for modern and elegant UI components.
Components are structured within `src/components/ui/` for easy customization and reuse.

## 📩 Email Authentication
The project supports email authentication using SMTP. Ensure the following variables are correctly set in `.env`:
```env
EMAIL_SERVER_HOST="smtp.example.com"
EMAIL_SERVER_PORT="587"
EMAIL_SERVER_USER="your-email@example.com"
EMAIL_SERVER_PASSWORD="your-secure-password"
EMAIL_FROM="no-reply@example.com"
```

## 🔄 Deployment
The easiest way to deploy this Next.js app is via **Vercel**:
```bash
vercel
```
Alternatively, follow the [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more options.

## ✅ Best Practices
- Keep `.env` secrets secure and do not commit them to version control.
- Use `bcrypt` or `argon2` for password hashing before storing in the database.
- Implement **rate-limiting** to prevent brute-force attacks on authentication endpoints.
- Use **JWT tokens** for stateless authentication when scaling.
- Configure **CORS** settings properly when deploying in production.

---
**Happy Coding! 🚀**

