import fetchData from "@/helpers/fetchData";
import { useSession } from "next-auth/react";
import { useCallback } from "react";
import { toast } from "react-toastify";
import Project from "@/types/project";
import { useRouter } from "next/router";

const useProjects = () => {
  const url = "/projects";
  const session = useSession();
  const router = useRouter();
  const accessToken = session.data?.user.accessToken;

  const fetchProject = async function (
    projectUrl: string,
    init: Parameters<typeof fetch>[1],
  ) {
    if (!accessToken) return null;
    const res = await fetchData(`${url}${projectUrl}`, {
      headers: {
        authorization: `Bearer ${accessToken}`,
        "content-type": "application/json",
      },
      ...init,
    });

    if (res.status === 404) {
      toast("This project does not exists 🙅‍");
      router.push("/projects");
      return;
    }

    return await res.json();
  };

  const getProjects = useCallback(
    () =>
      fetchProject("", {
        method: "GET",
      }),
    [accessToken],
  );

  const getProject = useCallback(
    (id: string) =>
      fetchProject(`/${id}`, {
        method: "GET",
      }),
    [accessToken],
  );

  const createProject = useCallback(
    (data: Partial<Project>) =>
      fetchProject("", {
        method: "POST",
        body: JSON.stringify(data),
      }),
    [accessToken],
  );

  const editProject = useCallback(
    (id: string, data: Partial<Project>) =>
      fetchProject(`/${id}`, {
        method: "PATCH",
        body: JSON.stringify(data),
      }),
    [accessToken],
  );

  const deleteProject = useCallback(
    async (id: string) => {
      const res = await fetchProject(`/${id}`, {
        method: "DELETE",
      });

      toast("Project has been deleted with great success ! 💥");

      return res;
    },
    [accessToken],
  );

  const addProjectTask = useCallback(
    async (projectId: string, name: string, description: string) => {
      const res = await fetchProject(`/${projectId}/tasks`, {
        method: "POST",
        body: JSON.stringify({
          name,
          description,
        }),
      });
      toast("Task has been added with great success ! 🦄");

      return res;
    },
    [accessToken],
  );

  const deleteProjectTask = useCallback(
    async (projectId: string, taskId: string) => {
      const res = await fetchProject(`/${projectId}/tasks/${taskId}`, {
        method: "DELETE",
      });

      toast("Task has been deleted with great success ! 💥");

      return res;
    },
    [accessToken],
  );

  const addProjectMember = useCallback(
    async (projectId: string, memberId: string) => {
      const res = await fetchProject(`/${projectId}/members`, {
        method: "POST",
        body: JSON.stringify({
          _id: memberId,
        }),
      });
      toast("Member has been added with great success ! 👩‍🦰/🧑‍🦰");

      return res;
    },
    [accessToken],
  );

  const deleteProjectMember = useCallback(
    async (projectId: string, memberId: string) => {
      const res = await fetchProject(`/${projectId}/members/${memberId}`, {
        method: "DELETE",
      });

      toast("Member has been deleted with great success ! 👋");

      return res;
    },
    [accessToken],
  );

  return {
    getProjects,
    getProject,
    createProject,
    editProject,
    deleteProject,
    addProjectTask,
    deleteProjectTask,
    addProjectMember,
    deleteProjectMember,
  };
};

export default useProjects;
