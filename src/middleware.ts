import NextAuth from "next-auth";
import authConfig from "@/auth.config";
import { DEFAULT_REDIRECT, PUBLIC_ROUTES, ROOT } from "@/lib/routes";

const { auth } = NextAuth(authConfig);

export default auth((req) => {
  const { nextUrl } = req;

  const isAuthenticated = !!req.auth;
  const isPublicRoute = PUBLIC_ROUTES.includes(nextUrl.pathname);

  if (isPublicRoute && isAuthenticated)
    return Response.redirect(new URL(DEFAULT_REDIRECT, nextUrl));

  if (!isAuthenticated && !isPublicRoute) {
    let url = ROOT;

    if (!PUBLIC_ROUTES.includes(nextUrl.pathname) && nextUrl.pathname !== "/") {
      url = url.concat(`?callbackUrl=${nextUrl.pathname}`);
    }

    return Response.redirect(new URL(url, nextUrl));
  }
});

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
