"use server";

import fetchData from "@/lib/fetchData";
import User, { Signup } from "@/types/user";

export const signup = async (body: Signup) =>
  fetchData<User>(`/auth/sign-up`, { method: "POST", body });
