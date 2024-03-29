import React, { FormEvent, ReactNode, useState } from "react";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import {
  Button,
  Card,
  FormControl,
  Input,
  InputLabel,
  Typography,
  FormHelperText,
} from "@mui/material";
import fetchData from "@/helpers/fetchData";

export default function SignInPage() {
  const router = useRouter();
  const [isPasswordDifferent, setIsPasswordDifferent] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const firstname = formData.get("firstname");
    const lastname = formData.get("lastname");
    const email = formData.get("email");
    const password = formData.get("password");
    const passwordConfirmation = formData.get("passwordConfirmation");

    if (password !== passwordConfirmation) {
      setIsPasswordDifferent(true);
      return;
    } else {
      setIsPasswordDifferent(false);
    }

    const res = await fetchData(`/auth/sign-up`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        firstname,
        lastname,
        email,
        password,
      }),
    });

    const data = await res.json();

    if (data?.error === "Conflict" && res.status === 409) {
      toast("User already exists ❌");
    } else {
      toast(
        `Congratulation dear ${data.firstname} ${data.lastname}, let's start your new journey ! 🥳`,
      );
      router.push("/login");
    }
  }

  return (
    <div className={"h-full w-full flex"}>
      <Card className={"w-1/3 p-8 m-auto"}>
        <Typography variant={"h2"} className={"mb-4"}>
          Sign up
        </Typography>
        <form onSubmit={handleSubmit}>
          <FormControl fullWidth className={"mb-8"} required>
            <InputLabel htmlFor="firstname">Firstname</InputLabel>
            <Input id="firstname" name="firstname" />
          </FormControl>
          <FormControl fullWidth className={"mb-8"} required>
            <InputLabel htmlFor="lastname">Lastname</InputLabel>
            <Input id="lastname" name="lastname" />
          </FormControl>
          <FormControl fullWidth className={"mb-8"} required>
            <InputLabel htmlFor="email">Email</InputLabel>
            <Input id="email" name="email" type={"email"} />
          </FormControl>
          <FormControl fullWidth className={"mb-8"} required>
            <InputLabel htmlFor="password">Password</InputLabel>
            <Input id="password" name="password" type={"password"} />
          </FormControl>
          <FormControl
            fullWidth
            className={"mb-8"}
            required
            error={isPasswordDifferent}
          >
            <InputLabel htmlFor="passwordConfirmatioon">
              Password confirmation
            </InputLabel>
            <Input
              id="passwordConfirmatioon"
              name="passwordConfirmation"
              type={"password"}
            />
            {isPasswordDifferent && (
              <FormHelperText error>Password must be identical</FormHelperText>
            )}
          </FormControl>
          <Button type="submit">Sign-up</Button>
        </form>
      </Card>
    </div>
  );
}

SignInPage.getLayout = function getLayout(page: ReactNode) {
  return page;
};
