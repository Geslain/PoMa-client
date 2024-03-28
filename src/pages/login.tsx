import React, { FormEvent, ReactNode } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import { signIn } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import { Button, Card, FormControl, Input, InputLabel } from "@mui/material";
import { toast } from "react-toastify";

export default function LoginPage() {
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

    if (res?.error === "CredentialsSignin" && res.status === 401) {
      toast("Wrong email / password ❌");
    } else if (res?.url) router.push(res.url);
  }

  return (
    <div className={"h-full w-full flex"}>
      <Card className={"w-1/3 p-8 m-auto"}>
        <Image
          alt={"Logo"}
          width={400}
          height={200}
          src={
            "https://cdn.jaimelesstartups.fr/wp-content/uploads/2021/09/Logo-Saqara.jpg"
          }
          className={"m-auto"}
        />
        <form onSubmit={handleSubmit}>
          <FormControl fullWidth className={"mb-8"} required>
            <InputLabel htmlFor="email">Email</InputLabel>
            <Input id="email" name="email" />
          </FormControl>
          <FormControl fullWidth className={"mb-8"} required>
            <InputLabel htmlFor="password">Password</InputLabel>
            <Input id="password" name="password" type={"password"} />
          </FormControl>
          <Button type="submit">Login</Button>
        </form>
      </Card>
    </div>
  );
}

LoginPage.getLayout = function getLayout(page: ReactNode) {
  return page;
};
