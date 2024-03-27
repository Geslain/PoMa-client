import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import useProjects from "@/hooks/useProjects";
import { useEffect, useState } from "react";
import Project from "@/types/project";

export default function ProjectsPage() {
  const { getProjects } = useProjects();
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    getProjects().then((p) => {
      if (p) setProjects(p);
    });
  }, [getProjects]);

  return (
    <>
      <Typography variant="h1" gutterBottom>
        Projects
      </Typography>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="left">Name</TableCell>
              <TableCell align="left">Owner</TableCell>
              <TableCell align="left">Tasks</TableCell>
              <TableCell align="left">Members</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {projects.map((project) => (
              <TableRow
                key={project.name}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell align="left">{project.name}</TableCell>
                <TableCell align="left">{`${project.owner.firstname} ${project.owner.lastname}`}</TableCell>
                <TableCell align="left">{project.tasks.length}</TableCell>
                <TableCell align="left">{project.members.length}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
