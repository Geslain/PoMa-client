import fetchData from "@/helpers/fetchData";
import { useSession } from "next-auth/react";
import { useCallback } from "react";
import { toast } from "react-toastify";

const useProjects = () => {
  const url = "/projects";
  const session = useSession();
  const accessToken = session.data?.user.accessToken;

  const fetchProject = async function (
    projectUrl: string,
    init: Parameters<typeof fetch>[1],
  ) {
    if (!accessToken) return null;
    return await (
      await fetchData(`${url}${projectUrl}`, {
        headers: {
          authorization: `Bearer ${accessToken}`,
          "content-type": "application/json",
        },
        ...init,
      })
    ).json();
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

  return { getProjects, getProject, addProjectTask, deleteProjectTask };
};

export default useProjects;
