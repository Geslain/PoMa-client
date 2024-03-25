import { signOut } from "next-auth/react";
import { ReactNode } from "react";

export default function Layout({ children }: { children: ReactNode }) {
  async function logout() {
    await signOut();
  }

  return (
    <>
      <button onClick={logout}>logout</button>
      <main>{children}</main>
    </>
  );
}
