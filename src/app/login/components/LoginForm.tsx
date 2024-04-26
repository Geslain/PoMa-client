"use client";
import { useSearchParams, useRouter } from "next/navigation";
import React, { FormEvent } from "react";
import { signIn } from "next-auth/react";
import { toast } from "react-toastify";
import { Button, FormControl, Input, InputLabel, Link } from "@mui/material";

export default function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const callbackUrl = searchParams?.get("callbackUrl") || "/projects";

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const email = formData.get("email");
    const password = formData.get("password");

    const res = await signIn("credentials", {
      email,
      password,
      // The page where you want to redirect to after a
      // successful login
      callbackUrl: `${window.location.origin}${callbackUrl}`,
      redirect: false,
    });

    if (res?.error) {
      switch (res.error) {
        case "CredentialsSignin":
          toast("Wrong email / password ❌");
          break;
        default:
          toast("Something wrong happened, retry later 😵!", { type: "error" });
      }
    } else if (res?.url) {
      toast(`Welcome ! Make yourself at home and enjoy your time here ! 🏠🔥`);
      router.push(res.url);
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <FormControl fullWidth className={"mb-8"} required>
        <InputLabel htmlFor="email">Email</InputLabel>
        <Input
          id="email"
          name="email"
          type={"email"}
          autoComplete={"username"}
        />
      </FormControl>
      <FormControl fullWidth className={"mb-8"} required>
        <InputLabel htmlFor="password">Password</InputLabel>
        <Input
          id="password"
          name="password"
          type={"password"}
          autoComplete={"current-password"}
        />
      </FormControl>
      <Button type="submit" className={"mb-6"}>
        Login
      </Button>
      <Link href={"/sign-up"} className={"text-xs flex"}>
        No account ? Start your journey here ! 🥳
      </Link>
    </form>
  );
}
