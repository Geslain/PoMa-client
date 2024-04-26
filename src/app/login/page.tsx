import React, { Suspense } from "react";
import Image from "next/image";
import { Card } from "@mui/material";
import LoginForm from "@/app/login/components/LoginForm";

export default async function LoginPage() {
  return (
    <div className={"h-full w-full flex"}>
      <Card className={"p-8 m-auto"}>
        <Image
          alt={"Logo"}
          width={404}
          height={208}
          src={"https://github.com/Geslain/PoMa/blob/main/logo.png?raw=true"}
          className={"mb-4 rounded-md"}
          priority={true}
        />
        <Suspense fallback={"loading"}>
          <LoginForm />
        </Suspense>
      </Card>
    </div>
  );
}
