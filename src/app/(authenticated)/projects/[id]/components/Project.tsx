"use client";

import {
  Button,
  Card,
  CardContent,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@mui/material";
import React, { Fragment, useState } from "react";
import ProjectType from "@/types/project";
import { useRouter } from "next/navigation";
import DeleteIcon from "@mui/icons-material/Delete";
import AddTaskForm from "./AddTaskForm";
import AddMemberForm from "./AddMemberForm";
import Task from "@/types/task";
import User from "@/types/user";
import EditableTitle from "@/components/EditableTitle";
import ConfirmationWrapper from "@/components/ConfirmationWrapper";
import {
  addTask,
  removeTask,
  addMember,
  removeMember,
  edit,
  remove,
} from "@/lib/actions/projects";
import { toast } from "react-toastify";

type Props = {
  data: ProjectType;
  projectId: string;
};

export default function Project({ data, projectId }: Props) {
  const router = useRouter();
  const [project, setProject] = useState(data);
  const [isAboutToDeleteMemberId, setIsAboutToDeleteMemberId] = useState("");
  const [isAboutToDeleteTaskId, setIsAboutToDeleteTaskId] = useState("");
  const [isAboutToDeleteProject, setIsAboutToDeleteProject] = useState(false);

  if (!project) return null;

  async function handleAddTask(data: Pick<Task, "name" | "description">) {
    const project = await addTask(projectId as string, data);
    toast("Task has been added with great success ! 🦄");
    setProject(project);
  }

  async function handleDeleteTask(taskId: string) {
    if (!isAboutToDeleteTaskId || isAboutToDeleteTaskId !== taskId)
      setIsAboutToDeleteTaskId(taskId);

    // Delete confirmation's logic
    if (isAboutToDeleteTaskId && isAboutToDeleteTaskId === taskId) {
      const project = await removeTask(projectId as string, taskId);
      toast("Task has been deleted with great success ! 💥");
      setProject(project);
    }
  }

  async function handleAddMember(data: Pick<User, "_id">) {
    const project = await addMember(projectId as string, data);
    toast("Member has been added with great success ! 👩‍🦰/🧑‍🦰");
    setProject(project);
  }

  async function handleDeleteMember(memberId: string) {
    if (!isAboutToDeleteMemberId || isAboutToDeleteMemberId !== memberId)
      setIsAboutToDeleteMemberId(memberId);

    // Delete confirmation logic
    if (isAboutToDeleteMemberId && isAboutToDeleteMemberId === memberId) {
      const project = await removeMember(projectId as string, memberId);
      setProject(project);
      toast("Member has been deleted with great success ! 👋");
    }
  }

  const { name, owner, tasks, members } = project;
  const { firstname, lastname } = owner;

  async function handleTitleChange(value: string) {
    const project = await edit(projectId, { name: value });
    toast("Project has been updated with great success ! ✨");
    setProject(project);
  }

  async function handleDelete() {
    if (!isAboutToDeleteProject) setIsAboutToDeleteProject(true);

    // Delete confirmation logic
    if (isAboutToDeleteProject) {
      await remove(projectId);
      toast("Project has been deleted with great success ! 💥");
      router.push("/projects");
    }
  }

  function handleDeleteButtonMouseLeave(itemType: string) {
    switch (itemType) {
      case "task":
        setIsAboutToDeleteTaskId("");
        break;
      case "member":
        setIsAboutToDeleteMemberId("");
        break;
      case "project":
        setIsAboutToDeleteProject(false);
        break;
    }
  }

  return (
    <Card>
      <CardContent>
        <EditableTitle
          variant="h1"
          text={`${name}`}
          onSubmit={handleTitleChange}
        />
        <Typography className={"italic mb-10"}>
          Created by: {firstname} {lastname}
        </Typography>
        <Typography variant="h3">Tasks</Typography>
        <List sx={{ width: "100%" }}>
          {tasks.map(({ _id, name, description }) => (
            <Fragment key={_id}>
              <ListItem
                alignItems="flex-start"
                secondaryAction={
                  <ConfirmationWrapper
                    open={isAboutToDeleteTaskId === _id}
                    onConfirm={() => handleDeleteTask(_id)}
                    onCancel={() => handleDeleteButtonMouseLeave("task")}
                    text={"Are you sure ? (Press one more time to delete)"}
                  >
                    <IconButton edge="end" aria-label="delete" color={"error"}>
                      <DeleteIcon />
                    </IconButton>
                  </ConfirmationWrapper>
                }
              >
                <ListItemText
                  primary={name}
                  secondary={description}
                  secondaryTypographyProps={{
                    className: "whitespace-pre-line",
                  }}
                ></ListItemText>
              </ListItem>
              <Divider variant="inset" component="li" />
            </Fragment>
          ))}
          <ListItem className={"flex flex-col"} alignItems={"flex-start"}>
            <AddTaskForm onSubmit={handleAddTask} />
          </ListItem>
        </List>
        <Typography variant="h3">Members</Typography>
        <List sx={{ width: "100%" }}>
          {members.map(({ _id, firstname, lastname }) => (
            <Fragment key={_id}>
              <ListItem
                alignItems="flex-start"
                secondaryAction={
                  <ConfirmationWrapper
                    open={isAboutToDeleteMemberId === _id}
                    onConfirm={() => handleDeleteMember(_id)}
                    onCancel={() => handleDeleteButtonMouseLeave("member")}
                    text={"Are you sure ? (Press one more time to delete)"}
                  >
                    <IconButton edge="end" aria-label="delete" color={"error"}>
                      <DeleteIcon />
                    </IconButton>
                  </ConfirmationWrapper>
                }
              >
                <ListItemText
                  primary={`${firstname} ${lastname}`}
                ></ListItemText>
              </ListItem>
              <Divider variant="inset" component="li" />
            </Fragment>
          ))}
          <ListItem className={"flex flex-col"} alignItems={"flex-start"}>
            <AddMemberForm
              onSubmit={handleAddMember}
              existingMembers={members.concat(owner)}
            />
          </ListItem>
        </List>
        <div className={"flex justify-end"}>
          <ConfirmationWrapper
            open={isAboutToDeleteProject}
            onConfirm={handleDelete}
            onCancel={() => handleDeleteButtonMouseLeave("project")}
            text={"Are you sure ? (Press one more time to delete)"}
          >
            <Button startIcon={<DeleteIcon />} color="error">
              Delete Project
            </Button>
          </ConfirmationWrapper>
        </div>
      </CardContent>
    </Card>
  );
}
