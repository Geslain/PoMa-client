import {
  Button,
  Card,
  CardContent,
  Divider,
  FormControl,
  Input,
  InputLabel,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@mui/material";
import useProjects from "@/hooks/useProjects";
import { useEffect, useState } from "react";
import Project from "@/types/project";
import { useRouter } from "next/router";
import AddIcon from "@mui/icons-material/Add";

export default function ProjectsPage() {
  const router = useRouter();
  const projectId = router?.query?.id;
  const { getProject } = useProjects();
  const [project, setProject] = useState<Project>();

  useEffect(() => {
    if (projectId && typeof projectId === "string")
      getProject(projectId).then((p) => {
        if (p) setProject(p);
      });
  }, [getProject, projectId]);

  if (!project) return null;

  const { name, owner, tasks } = project;
  const { firstname, lastname } = owner;

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
            <>
              <ListItem alignItems="flex-start">
                <ListItemText
                  primary={task.name}
                  secondary={task.description}
                ></ListItemText>
              </ListItem>
              <Divider variant="inset" component="li" />
            </>
          ))}
          <ListItem className={"flex flex-col"} alignItems={"flex-start"}>
            <FormControl className={"my-6"}>
              <InputLabel htmlFor="name">Name</InputLabel>
              <Input id="name" />
            </FormControl>
            <FormControl fullWidth className={"mb-8"}>
              <InputLabel htmlFor="descripiton">Description</InputLabel>
              <Input multiline id="descripiton" />
            </FormControl>
            <Button startIcon={<AddIcon />}>Add a task</Button>
          </ListItem>
        </List>
      </CardContent>
    </Card>
  );
}
