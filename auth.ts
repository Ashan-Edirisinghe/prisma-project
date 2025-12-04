import NextAuth, { NextAuthOptions } from "next-auth";
import type { DefaultSession } from "next-auth";
import GoogleProvider from "next-auth/providers/google";

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
            const prisma = (await import("@/lib/prisma")).default;
            
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
                    console.log("New user created:", user.email);
                } else {
                    console.log("User already exists:", user.email);
                }
                return true;
            } catch (error) {
                console.error("Error saving user to database:", error);
                return true; // Allow sign in even if DB save fails
            }
        },
    },
    secret: process.env.NEXTAUTH_SECRET,
};

export default NextAuth(authOptions);