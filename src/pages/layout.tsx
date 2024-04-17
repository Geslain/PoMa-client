import { ReactNode } from "react";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
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
                  <Link href={"/projects"} className="flex-grow justify-start">
                    <Button
                      startIcon={<FolderIcon />}
                      className="w-full justify-start p-2"
                    >
                      Projects
                    </Button>
                  </Link>
                </li>
                <li className={"my-2 flex"}>
                  <Link href={"/users"} className="flex-grow justify-start">
                    <Button
                      startIcon={<GroupIcon />}
                      className="w-full justify-start p-2"
                    >
                      Users
                    </Button>
                  </Link>
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
