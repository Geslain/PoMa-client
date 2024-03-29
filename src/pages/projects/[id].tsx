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
import useProjects from "@/hooks/useProjects";
import React, { Fragment, useEffect, useState } from "react";
import Project from "@/types/project";
import { useRouter } from "next/router";
import DeleteIcon from "@mui/icons-material/Delete";
import AddTaskForm from "@/pages/projects/components/AddTaskForm";
import AddMemberForm from "@/pages/projects/components/AddMemberForm";
import Task from "@/types/task";
import User from "@/types/user";
import EditableTitle from "@/components/EditableTitle";
import ConfirmationWrapper from "@/components/ConfirmationWrapper";

export default function ProjectsPage() {
  const router = useRouter();
  const projectId = router?.query?.id as string;
  const {
    getProject,
    addProjectTask,
    deleteProjectTask,
    addProjectMember,
    deleteProjectMember,
    editProject,
    deleteProject,
  } = useProjects();
  const [project, setProject] = useState<Project>();
  const [isAboutToDeleteMemberId, setIsAboutToDeleteMemberId] = useState("");
  const [isAboutToDeleteTaskId, setIsAboutToDeleteTaskId] = useState("");
  const [isAboutToDeleteProject, setIsAboutToDeleteProject] = useState(false);

  useEffect(() => {
    if (projectId)
      getProject(projectId).then((p) => {
        if (p) setProject(p);
      });
  }, [getProject, projectId]);

  if (!project) return null;

  function handleAddTask({
    name,
    description,
  }: Pick<Task, "name" | "description">) {
    addProjectTask(projectId as string, name, description).then((p) => {
      setProject(p);
    });
  }

  function handleDeleteTask(taskId: string) {
    if (!isAboutToDeleteTaskId || isAboutToDeleteTaskId !== taskId)
      setIsAboutToDeleteTaskId(taskId);

    // Delete confirmation logic
    if (isAboutToDeleteTaskId && isAboutToDeleteTaskId === taskId) {
      deleteProjectTask(projectId as string, taskId).then((p) => {
        setProject(p);
      });
    }
  }

  function handleAddMember({ _id }: Pick<User, "_id">) {
    addProjectMember(projectId as string, _id).then((p) => {
      setProject(p);
    });
  }

  function handleDeleteMember(memberId: string) {
    if (!isAboutToDeleteMemberId || isAboutToDeleteMemberId !== memberId)
      setIsAboutToDeleteMemberId(memberId);

    // Delete confirmation logic
    if (isAboutToDeleteMemberId && isAboutToDeleteMemberId === memberId) {
      deleteProjectMember(projectId as string, memberId).then((p) => {
        setProject(p);
      });
    }
  }

  const { name, owner, tasks, members } = project;
  const { firstname, lastname } = owner;

  function handleTitleChange(value: string) {
    editProject(projectId, { name: value }).then((p) => {
      setProject(p);
    });
  }

  function handleDelete() {
    if (!isAboutToDeleteProject) setIsAboutToDeleteProject(true);

    // Delete confirmation logic
    if (isAboutToDeleteProject) {
      deleteProject(projectId).then(() => {
        router.push("/projects");
      });
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
