import { CredentialsSignin } from "next-auth";

export const UNAUTHORIZED = "unauthorized";

export class UnauthorizedError extends CredentialsSignin {
  code = UNAUTHORIZED;
}
