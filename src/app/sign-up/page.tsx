import React from "react";
import { Card, Typography } from "@mui/material";
import SignupForm from "./components/SignupForm";

export default async function SignupPage() {
  return (
    <div className={"h-full w-full flex"}>
      <Card className={"w-1/3 p-8 m-auto"}>
        <Typography variant={"h2"} className={"mb-4"}>
          Sign up
        </Typography>
        <SignupForm />
      </Card>
    </div>
  );
}
