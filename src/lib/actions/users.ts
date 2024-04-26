"use server";

import fetchData from "@/lib/fetchData";
import User from "@/types/user";
import { revalidateTag } from "next/cache";

const url = "/users";

export const fetchUsers = async <T = User>(
  {
    url: usersUrl,
    method,
    body,
    tag,
  }: {
    url: string;
    method: string;
    body?: Record<string, unknown>;
    tag?: string;
  },
  revalidate?: string[],
) => {
  const res = await fetchData<T>(`${url}${usersUrl}`, { method, body, tag });

  if (revalidate) {
    revalidate.forEach((tag) => revalidateTag(tag));
  }

  return res;
};
export const getOne = async (id: string) =>
    fetchUsers({ url: `/${id}`, method: "GET", tag: "getOneUser" }),
  getMany = async () =>
    fetchUsers<User[]>({ url: "/", method: "GET", tag: "getManyUser" }),
  edit = async (id: string, body: Partial<User>) =>
    fetchUsers({ url: `/${id}`, method: "PATCH", body }, ["getOneUser"]),
  remove = async (id: string) =>
    fetchUsers({ url: `/${id}`, method: "DELETE" }, ["getManyUser"]);
