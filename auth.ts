import NextAuth, { NextAuthOptions } from "next-auth";
import type { DefaultSession } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import prisma from "@/lib/prisma";

declare module "next-auth" {
  interface Session extends DefaultSession {
    user: DefaultSession["user"] & { id: string };
  }
}

export const authOptions: NextAuthOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID?.trim() || '',
            clientSecret: process.env.GOOGLE_CLIENT_SECRET?.trim() || '',
        }),
    ],
    callbacks: {
        async signIn({ user }) {
            if (!user.email) {
                return false;
            }
            
            // Save user to database asynchronously without blocking
            setImmediate(async () => {
                try {
                    const existingUser = await prisma.user.findUnique({
                        where: { email: user.email! }
                    });

                    if (!existingUser) {
                        await prisma.user.create({
                            data: {
                                email: user.email!,
                                name: user.name || 'User',
                            }
                        });
                        console.log("✓ New user created:", user.email);
                    }
                } catch (error) {
                    console.error("✗ Error saving user:", error);
                }
            });
            
            return true;
        },
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id;
                token.email = user.email;
            }
            return token;
        },
        async session({ session, token }) {
            if (session.user && token) {
                session.user.id = token.id as string;
                session.user.email = token.email as string;
            }
            return session;
        },
    },
    session: {
        strategy: "jwt",
    },
    pages: {
        signIn: '/auth',
        error: '/auth',
    },
    secret: process.env.NEXTAUTH_SECRET,
    debug: true,
};

export default NextAuth(authOptions);