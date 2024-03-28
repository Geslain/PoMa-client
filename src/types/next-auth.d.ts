// eslint-disable-next-line @typescript-eslint/no-unused-vars
import NextAuth, { DefaultUser, Session as NextSession } from "next-auth";
interface User extends DefaultUser {
  accessToken: string;
}

declare module "next-auth" {
  interface Session extends NextSession {
    user: User;
  }
}
