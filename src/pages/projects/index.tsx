import {
  Button,
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
import React, { useEffect, useState } from "react";
import Project from "@/types/project";
import { useRouter } from "next/router";
import AddIcon from "@mui/icons-material/Add";
import NewProjectModal from "@/pages/projects/components/NewProjectModal";

export default function ProjectsPage() {
  const { getProjects, createProject } = useProjects();
  const router = useRouter();
  const [projects, setProjects] = useState<Project[]>([]);
  // State of modal
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    getProjects().then((p) => {
      if (p) setProjects(p);
    });
  }, [getProjects]);

  function handleRowClick(id: string) {
    router.push(`/projects/${id}`);
  }

  function handleClose() {
    setIsOpen(false);
  }

  function handleSubmit(name: string) {
    createProject({ name }).then((p) => {
      router.push(`/projects/${p._id}`);
    });
    setIsOpen(false);
  }

  function handleClick() {
    setIsOpen(true);
  }

  return (
    <>
      <Typography variant="h1" gutterBottom>
        Projects
      </Typography>
      <Button startIcon={<AddIcon />} onClick={handleClick}>
        Create project
      </Button>
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
                hover
                key={project.name}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                onClick={() => handleRowClick(project._id)}
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
      <NewProjectModal
        open={isOpen}
        handleClose={handleClose}
        handleSubmit={handleSubmit}
      />
    </>
  );
}
