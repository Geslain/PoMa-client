import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import fetchDataApi from "@/helpers/fetchDataApi";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        try {
          const res = await fetchDataApi("/auth/login", {
            method: "POST",
            body: JSON.stringify(credentials),
            headers: { "Content-Type": "application/json" },
          });

          const { accessToken, user } = await res.json();
          // Returning token to set in session
          return {
            id: user._id,
            accessToken,
            name: `${user.firstname} ${user.lastname}`,
          };
        } catch (e) {
          // Todo implement error
          return null;
        }
      },
    }),
  ],
  pages: {
    signIn: "/login", //Need to define custom login page (if using)
  },
  callbacks: {
    async jwt({ token, user }) {
      return { ...token, ...user };
    },
    async session({ session, token }) {
      session.user["accessToken"] = token["accessToken"] as string;

      return session;
    },
  },
};
export default NextAuth(authOptions);
