import { withAuth } from "next-auth/middleware";

export default withAuth({
  pages: {
    signIn: "/login",
    newUser: "/sign-up",
    error: "/error",
  },
  callbacks: {
    authorized: ({ token, req }) => {
      const pathname = req.nextUrl.pathname;
      if (
        pathname.startsWith("/_next") ||
        pathname === "/sign-up" ||
        pathname === "/favicon.ico"
      )
        return true;
      return !!token;
    },
  },
});
