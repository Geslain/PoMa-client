import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import fetchDataApi from "@/helpers/fetchDataApi";
import authConfig from "./auth.config";

export const { handlers } = NextAuth({
  ...authConfig,
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const res = await fetchDataApi("/auth/login", {
          method: "POST",
          body: JSON.stringify(credentials),
          headers: { "Content-Type": "application/json" },
        });

        const { accessToken, user } = await res.json();

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
