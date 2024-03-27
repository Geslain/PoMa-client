import fetchData from "@/helpers/fetchData";
import { useSession } from "next-auth/react";
import { useCallback } from "react";

const useProjects = () => {
  const url = "/projects";
  const session = useSession();
  const accessToken = session.data?.user.accessToken;

  const fetchProject = useCallback(
    async function (projectUrl: string, init: Parameters<typeof fetch>[1]) {
      if (!accessToken) return null;
      return await (
        await fetchData(`${url}${projectUrl}`, {
          headers: {
            authorization: `Bearer ${accessToken}`,
          },
          ...init,
        })
      ).json();
    },
    [accessToken],
  );

  const getProjects = () =>
    fetchProject("", {
      method: "GET",
    });

  const getProject = (id: string) =>
    fetchProject(id, {
      method: "GET",
    });

  return { getProjects, getProject };
};

export default useProjects;
