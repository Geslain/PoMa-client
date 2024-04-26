import React, { ReactNode } from "react";
import Link from "next/link";
import Image from "next/image";
import { auth } from "@/auth";
import { Button } from "@mui/material";
import FolderIcon from "@mui/icons-material/Folder";
import GroupIcon from "@mui/icons-material/Group";
import LogoutButton from "@/components/LogoutButton";
import { DEFAULT_REDIRECT } from "@/lib/routes";

export default async function Layout({ children }: { children: ReactNode }) {
  const session = await auth();

  return (
    <>
      <div className="h-full">
        <div className="flex flex-row flex-wrap h-full">
          <aside className="w-full h-full sm:w-1/3 md:w-1/4 px-2 shadow">
            <div className="sticky top-0 p-4 w-full">
              <div className={"flex justify-between mb-8"}>
                <span className={"flex items-center"}>
                  <Link href={DEFAULT_REDIRECT}>
                    <Image
                      alt={"logo"}
                      src="/logo-simple.png"
                      className={"mr-2"}
                      width={45}
                      height={45}
                    />
                  </Link>
                  {session?.user?.name}
                </span>
                <LogoutButton />
              </div>
              <ul className="flex flex-col overflow-hidden">
                <li className={"my-2 flex"}>
                  <Link href={"/projects"} className="flex flex-grow">
                    <Button
                      startIcon={<FolderIcon />}
                      className="flex flex-grow justify-start p-2"
                    >
                      Projects
                    </Button>
                  </Link>
                </li>
                <li className={"my-2  flex"}>
                  <Link href={"/users"} className="flex flex-grow">
                    <Button
                      startIcon={<GroupIcon />}
                      className="flex flex-grow justify-start p-2"
                    >
                      Users
                    </Button>
                  </Link>
                </li>
              </ul>
            </div>
          </aside>
          <div
            role="main"
            className="container w-full sm:w-2/3 md:w-3/4 p-8 overflow-scroll h-full"
          >
            {children}
          </div>
        </div>
      </div>
      <footer className="mt-auto"></footer>
    </>
  );
}
