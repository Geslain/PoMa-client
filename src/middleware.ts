import { withAuth } from "next-auth/middleware";

export default withAuth({
  pages: {
    signIn: "/login",
    error: "/error",
  },
  callbacks: {
    authorized: (data) => {
      return !!data.token;
    },
  },
});
