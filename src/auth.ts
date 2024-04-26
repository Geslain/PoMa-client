import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import fetchData from "@/lib/fetchData";
import authConfig from "./auth.config";
import User from "@/types/user";

export const { signOut, signIn, auth, handlers } = NextAuth({
  ...authConfig,
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const { accessToken, user } = await fetchData<{
          accessToken: string;
          user: User;
        }>("/auth/login", {
          method: "POST",
          body: credentials,
        });

        if (!user) {
          return null;
        }

        // Returning token to set in session
        return {
          id: user._id,
          accessToken,
          name: `${user.firstname} ${user.lastname}`,
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      return { ...token, ...user };
    },
    async session({ session, token }) {
      session.user["accessToken"] = token["accessToken"] as string;

      return session;
    },
  },
});
