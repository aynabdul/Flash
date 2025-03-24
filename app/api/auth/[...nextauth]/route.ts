import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { verifyPassword } from '../../../../utils/password-utils';

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' }
      },
      async authorize(credentials) {
        // Check if credentials are provided
        if (!credentials?.email || !credentials?.password) {
          console.log('No credentials provided');
          return null;
        }

        // Get admin credentials from environment variables
        const adminEmail = process.env.NEXTAUTH_ADMIN_EMAIL;
        const adminPasswordHash = process.env.NEXTAUTH_ADMIN_PASSWORD;

        if (!adminEmail || !adminPasswordHash) {
          console.error('Admin credentials not configured in environment variables');
          return null;
        }

        // Verify email
        if (credentials.email !== adminEmail) {
          console.log('Email mismatch');
          return null;
        }

        // Verify password using our utility function
        const passwordMatch = await verifyPassword(credentials.password, adminPasswordHash);
        
        if (passwordMatch) {
          console.log('Login successful');
          return {
            id: '1',
            name: 'Admin',
            email: adminEmail,
            role: 'admin'
          };
        }

        // Authentication failed
        console.log('Authentication failed');
        return null;
      }
    })
  ],
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  pages: {
    signIn: '/admin/login',
    error: '/admin/login',
  },
  callbacks: {
    async jwt({ token, user }) {
      // Add role to JWT token when user signs in
      if (user) {
        token.role = user.role;
      }
      return token;
    },
    async session({ session, token }) {
      // Add role to session
      if (session.user) {
        session.user.role = token.role as string;
      }
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
});

export { handler as GET, handler as POST } 