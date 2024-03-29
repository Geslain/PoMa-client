import fetchData from "@/helpers/fetchData";
import { useSession } from "next-auth/react";
import { useCallback } from "react";
import { toast } from "react-toastify";
import User from "@/types/user";

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
    (): Promise<User[]> =>
      fetchUser("", {
        method: "GET",
      }),
    [accessToken],
  );

  const getUser = useCallback(
    (id: string): Promise<User> =>
      fetchUser(`/${id}`, {
        method: "GET",
      }),
    [accessToken],
  );

  const editUser = useCallback(
    async (id: string, data: Partial<User>): Promise<User> => {
      const res = await fetchUser(`/${id}`, {
        method: "PATCH",
        body: JSON.stringify(data),
      });

      toast("User has been updated with great success ! ✨");

      return res;
    },
    [accessToken],
  );

  const deleteUser = useCallback(
    async (id: string): Promise<User> => {
      const res = await fetchUser(`/${id}`, {
        method: "DELETE",
      });

      toast("User has been deleted with great success ! 💥");

      return res;
    },
    [accessToken],
  );

  return { getUsers, getUser, editUser, deleteUser };
};

export default useUsers;
