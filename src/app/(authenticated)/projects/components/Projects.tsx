"use client";

import React, { useState } from "react";
import {
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import Project from "@/types/project";
import { useRouter } from "next/navigation";
import AddIcon from "@mui/icons-material/Add";
import NewProjectModal from "./NewProjectModal";
import { create } from "@/lib/actions/projects";
import { toast } from "react-toastify";

type Props = {
  data: Project[];
};

export default function Projects({ data = [] }: Props) {
  const router = useRouter();
  const [projects] = useState(data);
  // State of modal
  const [isOpen, setIsOpen] = useState(false);

  function handleRowClick(id: string) {
    router.push(`/projects/${id}`);
  }

  function handleClose() {
    setIsOpen(false);
  }

  async function handleSubmit(name: string) {
    const project = await create({ name });

    setIsOpen(false);
    toast("Project has been updated with great success ! ✨");
    router.push(`/projects/${project._id}`);
  }

  function handleClick() {
    setIsOpen(true);
  }

  return (
    <>
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
              <TableCell align="left">Created at</TableCell>
              <TableCell align="left">Updated at</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {projects.map((project) => (
              <TableRow
                hover
                key={project._id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                onClick={() => handleRowClick(project._id)}
              >
                <TableCell align="left">{project.name}</TableCell>
                <TableCell align="left">{`${project.owner.firstname} ${project.owner.lastname}`}</TableCell>
                <TableCell align="center">{project.tasks.length}</TableCell>
                <TableCell align="center">{project.members.length}</TableCell>
                <TableCell align="left">{project.createdAt}</TableCell>
                <TableCell align="left">{project.updatedAt}</TableCell>
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
