import { signOut, useSession } from "next-auth/react";
import { ReactNode } from "react";
import Link from "next/link";
import { Button } from "@mui/material";
import FolderIcon from "@mui/icons-material/Folder";
import GroupIcon from "@mui/icons-material/Group";
import PersonIcon from "@mui/icons-material/Person";

export default function Layout({ children }: { children: ReactNode }) {
  const session = useSession();

  async function logout() {
    await signOut();
  }

  return (
    <>
      <div className="h-full">
        <div className="flex flex-row flex-wrap h-full">
          <aside className="w-full h-full sm:w-1/3 md:w-1/4 px-2 shadow">
            <div className="sticky top-0 p-4 w-full">
              <div className={"flex justify-between"}>
                <span className={"flex items-center"}>
                  <PersonIcon className={"mr-2"} />
                  {session.data?.user?.name}
                </span>
                <button
                  onClick={logout}
                  className={
                    "px-3 py-1 m-2 rounded-md bg-indigo-600 text-white"
                  }
                >
                  Logout
                </button>
              </div>
              <ul className="flex flex-col overflow-hidden">
                <li className={"my-2 flex"}>
                  <Button
                    startIcon={<FolderIcon />}
                    className="flex-grow justify-start"
                  >
                    <Link href={"/projects"}>Projects</Link>
                  </Button>
                </li>
                <li className={"my-2 flex"}>
                  <Button
                    startIcon={<GroupIcon />}
                    className="flex-grow justify-start"
                  >
                    <Link href={"/users"}>Users</Link>
                  </Button>
                </li>
              </ul>
            </div>
          </aside>
          <main
            role="main"
            className="container w-full sm:w-2/3 md:w-3/4 p-8 overflow-scroll h-full"
          >
            {children}
          </main>
        </div>
      </div>
      <footer className="mt-auto"></footer>
    </>
  );
}
