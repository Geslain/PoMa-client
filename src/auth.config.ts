import { NextAuthConfig } from "next-auth";

export default {
  debug: process.env.NODE_ENV !== "production",
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/login",
    newUser: "/sign-up",
    error: "/error",
  },
  callbacks: {
    authorized: ({ auth }) => {
      return !!auth?.user;
    },
  },
  providers: [],
} satisfies NextAuthConfig;
