"use client";

import { signOut } from "next-auth/react";
import { Button } from "@mui/material";

export default function LogoutButton() {
  async function logout() {
    await signOut();
  }

  return (
    <Button onClick={logout} className={"px-3 py-1"} variant="contained">
      Logout
    </Button>
  );
}
