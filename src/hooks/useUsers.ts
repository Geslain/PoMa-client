import fetchData from "@/helpers/fetchData";
import { useSession } from "next-auth/react";
import { useCallback } from "react";

const useUsers = () => {
  const url = "/users";
  const session = useSession();
  const accessToken = session.data?.user.accessToken;

  const fetchUser = async function (
    userUrl: string,
    init: Parameters<typeof fetch>[1],
  ) {
    if (!accessToken) return null;
    return await (
      await fetchData(`${url}${userUrl}`, {
        headers: {
          authorization: `Bearer ${accessToken}`,
          "content-type": "application/json",
        },
        ...init,
      })
    ).json();
  };

  const getUsers = useCallback(
    () =>
      fetchUser("", {
        method: "GET",
      }),
    [accessToken],
  );

  return { getUsers };
};

export default useUsers;
