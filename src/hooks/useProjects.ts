import fetchData from "@/helpers/fetchData";
import { useSession } from "next-auth/react";
import { useCallback } from "react";

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

  return { getProjects, getProject };
};

export default useProjects;
