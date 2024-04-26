"use server";
import { Typography } from "@mui/material";
import { getMany } from "@/lib/actions/projects";
import Projects from "./components/Projects";

export default async function ProjectsPage() {
  const projects = await getMany();

  return (
    <>
      <Typography variant="h1" gutterBottom>
        Projects
      </Typography>
      <Projects data={projects} />
    </>
  );
}
