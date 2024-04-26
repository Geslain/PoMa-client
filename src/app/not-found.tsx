import { Button, Typography } from "@mui/material";
import Link from "next/link";

export default function NotFoundPage() {
  return (
    <div className={"w-full h-full flex justify-center items-center"}>
      <div className={"m-auto flex flex-col gap-4 items-center"}>
        <Typography variant={"h2"}>Nothing to see here ! 👀</Typography>
        <Link href="/">
          <Button variant={"contained"}>Return to safety</Button>
        </Link>
      </div>
    </div>
  );
}
