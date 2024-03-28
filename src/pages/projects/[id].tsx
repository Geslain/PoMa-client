import {
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

export default function ProjectsPage() {
  const router = useRouter();
  const projectId = router?.query?.id as string;
  const {
    getProject,
    addProjectTask,
    deleteProjectTask,
    addProjectMember,
    deleteProjectMember,
  } = useProjects();
  const [project, setProject] = useState<Project>();

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
      // TODO handle promise resolution
      setProject(p);
    });
  }

  function handleDeleteTask(taskId: string) {
    // TODO Add confirmation modal
    deleteProjectTask(projectId as string, taskId).then((p) => {
      // TODO handle promise resolution
      setProject(p);
    });
  }

  function handleAddMember({ _id }: Pick<User, "_id">) {
    addProjectMember(projectId as string, _id).then((p) => {
      // TODO handle promise resolution
      setProject(p);
    });
  }

  function handleDeleteMember(memberId: string) {
    // TODO Add confirmation modal
    deleteProjectMember(projectId as string, memberId).then((p) => {
      // TODO handle promise resolution
      setProject(p);
    });
  }

  const { name, owner, tasks, members } = project;
  const { firstname, lastname } = owner;
  // List of user you can add as member : all users - members - owner

  return (
    <Card>
      <CardContent>
        <Typography variant="h1" gutterBottom>
          Project: {name}
        </Typography>
        <Typography className={"italic mb-10"}>
          Created by: {firstname} {lastname}
        </Typography>
        <Typography variant="h3">Tasks</Typography>
        <List sx={{ width: "100%" }}>
          {tasks.map((task) => (
            <Fragment key={task._id}>
              <ListItem
                alignItems="flex-start"
                secondaryAction={
                  <IconButton
                    edge="end"
                    aria-label="delete"
                    onClick={() => handleDeleteTask(task._id)}
                  >
                    <DeleteIcon />
                  </IconButton>
                }
              >
                <ListItemText
                  primary={task.name}
                  secondary={task.description}
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
                  <IconButton
                    edge="end"
                    aria-label="delete"
                    onClick={() => handleDeleteMember(_id)}
                  >
                    <DeleteIcon />
                  </IconButton>
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
      </CardContent>
    </Card>
  );
}
