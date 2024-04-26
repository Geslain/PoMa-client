"use client";

import React, { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import {
  Button,
  FormControl,
  Input,
  InputLabel,
  FormHelperText,
} from "@mui/material";
import { signup } from "@/lib/actions/auth";

export default function SignupForm() {
  const router = useRouter();
  const [isPasswordDifferent, setIsPasswordDifferent] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const firstname = formData.get("firstname") as string;
    const lastname = formData.get("lastname") as string;
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const passwordConfirmation = formData.get("passwordConfirmation");

    if (password !== passwordConfirmation) {
      setIsPasswordDifferent(true);
      return;
    } else {
      setIsPasswordDifferent(false);
    }

    try {
      const data = await signup({
        firstname,
        lastname,
        email,
        password,
      });

      if (!data) {
        toast("User already exists ❌");
      } else {
        toast(
          `Congratulation dear ${data.firstname} ${data.lastname}, let's start your new journey ! 🥳`,
        );
        router.push("/login");
      }
    } catch (e) {
      toast("Something went wrong, please try again later ❌");
    }
  }

  return (
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
          autoComplete={"new-password"}
        />
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
          autoComplete={"new-password"}
        />
        {isPasswordDifferent && (
          <FormHelperText error>Password must be identical</FormHelperText>
        )}
      </FormControl>
      <Button type="submit">Sign-up</Button>
    </form>
  );
}
