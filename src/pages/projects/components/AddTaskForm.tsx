import { Button, FormControl, Input, InputLabel } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import React, { ChangeEvent, useState } from "react";
import Task from "@/types/task";

type Props = {
  onSubmit: (data: Pick<Task, "name" | "description">) => void;
};
export default function AddTaskForm({ onSubmit }: Props) {
  const [taskName, setTaskName] = useState("");
  const [taskDescription, setTaskDescription] = useState("");
  const [formErrors, setFormErrors] = useState({
    name: false,
    description: false,
  });

  function handleTaskNameChange(e: ChangeEvent<HTMLInputElement>) {
    const value = e.target.value;
    setTaskName(value);
    if (value) setFormErrors((v) => ({ ...v, name: false }));
  }

  function handleTaskDescriptionChange(e: ChangeEvent<HTMLInputElement>) {
    const value = e.target.value;
    setTaskDescription(value);
    if (value) setFormErrors((v) => ({ ...v, description: false }));
  }

  function handleSubmit() {
    if (!taskName) {
      setFormErrors((value) => ({ ...value, name: true }));
    }

    if (!taskDescription) {
      setFormErrors((value) => ({ ...value, description: true }));
    }

    if (taskName && taskDescription) {
      onSubmit({ name: taskName, description: taskDescription });
      setTaskDescription("");
      setTaskName("");
      setFormErrors({
        name: false,
        description: false,
      });
    }
  }

  return (
    <>
      <FormControl className={"my-6"} required error={formErrors["name"]}>
        <InputLabel htmlFor="name">Name</InputLabel>
        <Input id="name" onChange={handleTaskNameChange} value={taskName} />
      </FormControl>
      <FormControl
        fullWidth
        className={"mb-8"}
        required
        error={formErrors["description"]}
      >
        <InputLabel htmlFor="description">Description</InputLabel>
        <Input
          multiline
          id="description"
          onChange={handleTaskDescriptionChange}
          value={taskDescription}
        />
      </FormControl>
      <Button startIcon={<AddIcon />} onClick={handleSubmit}>
        Add a task
      </Button>
    </>
  );
}
