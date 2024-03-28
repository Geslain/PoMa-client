import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import { FormEvent } from "react";

type Props = {
  open: boolean;
  handleClose: () => void;
  handleSubmit: (name: string) => void;
};

export default function NewProjectModal({
  open,
  handleClose,
  handleSubmit,
}: Props) {
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      PaperProps={{
        component: "form",
        onSubmit: (event: FormEvent<HTMLFormElement>) => {
          event.preventDefault();
          const formData = new FormData(event.currentTarget);
          const formJson = Object.fromEntries(formData.entries());
          const name = formJson.name;
          handleSubmit(name as string);
        },
      }}
    >
      <DialogTitle>Create new project</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          required
          margin="dense"
          name="name"
          id="name"
          label="Project's name"
          fullWidth
          variant="standard"
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button type="submit">Create</Button>
      </DialogActions>
    </Dialog>
  );
}
