# FLASH - Foundation for Liberation, Advancement, Solidarity and Hope

This is the web application for FLASH, a non-profit organization dedicated to helping individuals in need through various programs and initiatives.

## Getting Started

First, install the dependencies:

```bash
npm install
```

Then, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Supabase Setup

This application uses Supabase for the backend. Follow these steps to set up your Supabase project:

1. Create a Supabase account at [https://supabase.com](https://supabase.com)
2. Create a new project
3. Get your Supabase URL and anon key from the project settings
4. Update the `supabaseUrl` and `supabaseKey` in `src/lib/supabase.ts`
5. Run the following SQL in the Supabase SQL editor to create the required tables:

```sql
-- Create leadership table
CREATE TABLE IF NOT EXISTS leadership (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  full_name TEXT NOT NULL,
  designation TEXT NOT NULL,
  img_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create gallery table
CREATE TABLE IF NOT EXISTS gallery (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  img_url TEXT NOT NULL,
  caption TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create resources table
CREATE TABLE IF NOT EXISTS resources (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  pdf_url TEXT NOT NULL,
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create success_stories table
CREATE TABLE IF NOT EXISTS success_stories (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  circumstances TEXT NOT NULL,
  engaged_on TEXT NOT NULL,
  released_on TEXT NOT NULL,
  status TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security (RLS)
ALTER TABLE leadership ENABLE ROW LEVEL SECURITY;
ALTER TABLE gallery ENABLE ROW LEVEL SECURITY;
ALTER TABLE resources ENABLE ROW LEVEL SECURITY;
ALTER TABLE success_stories ENABLE ROW LEVEL SECURITY;

-- Create policies for public access (read-only)
CREATE POLICY "Allow public read access" ON leadership FOR SELECT USING (true);
CREATE POLICY "Allow public read access" ON gallery FOR SELECT USING (true);
CREATE POLICY "Allow public read access" ON resources FOR SELECT USING (true);
CREATE POLICY "Allow public read access" ON success_stories FOR SELECT USING (true);

-- Create policies for authenticated users (full access)
CREATE POLICY "Allow authenticated full access" ON leadership FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Allow authenticated full access" ON gallery FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Allow authenticated full access" ON resources FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Allow authenticated full access" ON success_stories FOR ALL USING (auth.role() = 'authenticated');
```

6. After creating the tables, you can initialize sample data from the admin dashboard.

## Features

- Leadership Team Management
- Gallery Management
- Resources Management
- Success Stories Management
- Admin Dashboard

## Technologies Used

- Next.js
- React
- TypeScript
- Tailwind CSS
- Supabase

## Project Overview

FLASH is an NGO providing free legal assistance to those in need. This website serves as their online presence, allowing them to showcase their services, share success stories, and connect with people who need legal aid.

## Tech Stack

- **Frontend**: Next.js, React, TypeScript, Tailwind CSS
- **Backend**: Next.js API Routes, Firebase Firestore
- **Authentication**: NextAuth.js
- **Form Handling**: React Hook Form, Yup
- **Hosting**: Vercel

## Authentication

The admin portal uses NextAuth.js for authentication. By default, it's configured with a single admin user defined in the environment variables.

### Setting Up Admin Credentials

1. Set the admin email in your `.env.local` file:
   ```bash
   NEXTAUTH_ADMIN_EMAIL=admin@flash.org.pk
   ```

2. For the admin password, you have two options:

   **Development Mode (Simple Hash):**
   ```bash
   NEXTAUTH_ADMIN_PASSWORD=sha256_your-password
   ```
   This allows you to use a simple password format during development.

   **Production Mode (Bcrypt Hash):**
   Generate a secure bcrypt hash using:
   ```bash
   npm run password:generate your-secure-password
   ```
   Then add the generated hash to your `.env.local` file:
   ```bash
   NEXTAUTH_ADMIN_PASSWORD=$2b$10$...hash...
   ```

### Verifying Passwords

You can verify if a password matches a hash using:
```bash
npm run password:verify your-password your-hash
```

## Environment Variables

- `NEXTAUTH_URL`: The base URL of your site (e.g., http://localhost:3000 for development)
- `NEXTAUTH_SECRET`: A random string used to hash tokens and sign cookies
- `NEXTAUTH_ADMIN_EMAIL`: The email address for the admin user
- `NEXTAUTH_ADMIN_PASSWORD`: The password hash for the admin user

## Project Structure

```
flash-app/
│── public/                      # Static assets (logos, PDFs)
│── src/
│   ├── components/               # Reusable UI components
│   │   ├── ui/                   # Button, Input, Form components
│   │   ├── layout/               # Header, Footer
│   │   ├── sections/             # Homepage sections (Mission, Impact)
│   │   ├── admin/                # Dashboard UI components
│   │   ├── forms/                # Contact form
│   │
│   ├── pages/                    # Next.js pages
│   │   ├── index.tsx             # Homepage
│   │   ├── about.tsx             # About Us
│   │   ├── services.tsx          # Services
│   │   ├── contact.tsx           # Contact Us
│   │   ├── donate.tsx            # Donation Page
│   │   ├── admin/                # Admin Panel (Protected)
│   │   │   ├── index.tsx         # Admin Dashboard
│   │   │   ├── login.tsx         # Admin Login
│   │   │   ├── manage.tsx        # Edit Content
│   │
│   ├── pages/api/                # API Routes (Server-Side Logic)
│   │   ├── auth/                 # NextAuth API Routes
│   │   │   ├── [...nextauth].ts  # Auth API
│   │   ├── updateContent.ts      # Update site content
│   │   ├── send-email.ts         # Contact form email handler
│   │
│   ├── lib/                      # Utility & Configurations
│   │   ├── firebase.ts           # Firestore connection
│   │   ├── auth.ts               # Authentication utils
│   │
│   ├── styles/                   # Global & Modular Styles
│   │   ├── globals.css           # TailwindCSS base styles
│   │   ├── admin.module.css      # Admin panel styles
│   │
│   ├── hooks/                    # Custom React Hooks
│   │   ├── useAuth.ts            # Authentication logic
│   │   ├── useFirestore.ts       # Firestore data fetching
```

## Deployment

For production deployment:

1. Set proper environment variables in your hosting platform
2. Use a secure bcrypt hash for the admin password
3. Set `NEXTAUTH_URL` to your production domain
4. Generate a strong random string for `NEXTAUTH_SECRET`
5. Remove any debug settings

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgements

- [Next.js](https://nextjs.org/)
- [Firebase](https://firebase.google.com/)
- [Tailwind CSS](https://tailwindcss.com/)
- [NextAuth.js](https://next-auth.js.org/)

## Security Considerations

- Never commit your `.env.local` file to version control
- Always use bcrypt hashes in production
- Regularly rotate your admin password
- Use HTTPS in production
