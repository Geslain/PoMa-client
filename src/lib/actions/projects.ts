"use server";

import fetchData from "@/lib/fetchData";
import Project from "@/types/project";
import { revalidateTag } from "next/cache";

const url = "/projects";

export const fetchProjects = async <T = Project>(
  {
    url: projectUrl,
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
  const res = await fetchData<T>(`${url}${projectUrl}`, { method, body, tag });

  if (revalidate) {
    revalidate.forEach((tag) => revalidateTag(tag));
  }

  return res;
};

export const getOne = async (id: string) =>
    fetchProjects({ url: `/${id}`, method: "GET", tag: "getOneProject" }),
  getMany = async () =>
    fetchProjects<Project[]>({
      url: "/",
      method: "GET",
      tag: "getManyProject",
    }),
  create = async (body: Partial<Project>) =>
    fetchProjects({ url: "/", method: "POST", body }, ["getManyProject"]),
  edit = async (id: string, body: Partial<Project>) =>
    fetchProjects({ url: `/${id}`, method: "PATCH", body }),
  remove = async (id: string) =>
    fetchProjects({ url: `/${id}`, method: "DELETE" }, ["getManyProject"]),
  addTask = async (id: string, body: { name: string; description: string }) =>
    fetchProjects(
      {
        url: `/${id}/tasks`,
        method: "POST",
        body,
      },
      ["getOneProject"],
    ),
  removeTask = async (id: string, taskId: string) =>
    fetchProjects({ url: `/${id}/tasks/${taskId}`, method: "DELETE" }, [
      "getOneProject",
    ]),
  addMember = async (id: string, body: { _id: string }) =>
    fetchProjects(
      {
        url: `/${id}/members`,
        method: "POST",
        body,
      },
      ["getOneProject"],
    ),
  removeMember = async (id: string, memberId: string) =>
    fetchProjects(
      {
        url: `/${id}/members/${memberId}`,
        method: "DELETE",
      },
      ["getOneProject"],
    );
