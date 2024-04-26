import { auth } from "@/auth";
import { notFound, redirect } from "next/navigation";

async function fetchData<T>(
  url: string,
  initConfig: {
    method: RequestInit["method"];
    body?: Record<string, unknown>;
    tag?: string;
  },
): Promise<T> {
  const session = await auth();
  const accessToken = session?.user.accessToken;
  const init: RequestInit = { method: initConfig.method };

  const headers: RequestInit["headers"] = {
    "content-type": "application/json",
  };

  if (accessToken) {
    headers["authorization"] = `Bearer ${accessToken}`;
  }

  if (initConfig?.body) {
    init["body"] = JSON.stringify(initConfig.body);
  }

  if (initConfig?.tag) {
    init["next"] = { tags: [initConfig.tag] };
  }

  init["headers"] = headers;

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_API_URL}${url}`,
      init,
    );

    if (accessToken && response.status === 401) {
      redirect("/api/logout");
    }

    if (accessToken && response.status === 404) {
      notFound();
    }

    return (await response.json()) as T;
  } catch (e) {
    console.error(e);
    throw e;
  }
}

export default fetchData;
