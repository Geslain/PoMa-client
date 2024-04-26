"use client";
import {
  IconButton,
  Input,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import React, {
  FocusEvent,
  FormEvent,
  useEffect,
  useRef,
  useState,
} from "react";
import User from "@/types/user";
import { edit, remove } from "@/lib/actions/users";
import DeleteIcon from "@mui/icons-material/Delete";
import ConfirmationWrapper from "@/components/ConfirmationWrapper";

type Props = {
  data: User[];
};

export default function Users({ data }: Props) {
  const [users, setUsers] = useState(data);
  const [isEdited, setIsEdited] = useState(false);
  const [editedUser, setEditedUser] = useState<User>();
  const firstnameInputRef = useRef<HTMLInputElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const [isAboutToDeleteUserId, setIsAboutToDeleteUserId] = useState("");

  useEffect(() => {
    if (!isEdited) return;

    firstnameInputRef.current?.focus();
  }, [isEdited, firstnameInputRef]);

  function handleRowClick(user: User) {
    if (!isEdited) {
      setIsEdited(true);
      setEditedUser(user);
      firstnameInputRef.current?.focus();
    }
  }

  const onRowBlur = (e: FocusEvent<HTMLDivElement>) => {
    const currentTarget = e.currentTarget;
    requestAnimationFrame(() => {
      const hasOneFieldFocused = currentTarget.contains(document.activeElement);
      if (!hasOneFieldFocused) {
        setIsEdited(false);
        // Trigger form submit
        formRef.current?.dispatchEvent(
          new Event("submit", { cancelable: true, bubbles: true }),
        );
      }
    });
  };

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    -event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const firstname = formData.get("firstname") as string;
    const lastname = formData.get("lastname") as string;
    const email = formData.get("email") as string;

    if (
      editedUser?._id &&
      firstname &&
      lastname &&
      email &&
      (firstname !== editedUser.firstname ||
        lastname !== editedUser.lastname ||
        email !== editedUser.email)
    ) {
      const res = await edit(editedUser?._id, {
        firstname,
        lastname,
        email,
      });

      setUsers((u) =>
        u.reduce<User[]>((acc, curr) => {
          if (curr._id === res._id) return [...acc, res];
          return [...acc, curr];
        }, []),
      );
    }
  }

  async function handleDelete(id: string) {
    // If "want to delete" user is different, update isAboutToDeleteUserId
    if (!isAboutToDeleteUserId || isAboutToDeleteUserId !== id)
      setIsAboutToDeleteUserId(id);

    // Delete confirmation logic
    if (isAboutToDeleteUserId && isAboutToDeleteUserId === id) {
      const res = await remove(id);

      setUsers((u) =>
        u.reduce<User[]>((acc, curr) => {
          if (curr._id === res._id) return acc;
          return [...acc, curr];
        }, []),
      );
      setIsAboutToDeleteUserId("");
    }
  }

  function handleDeleteButtonMouseLeave() {
    setIsAboutToDeleteUserId("");
  }

  return (
    <form ref={formRef} onSubmit={handleSubmit}>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="left">First name</TableCell>
              <TableCell align="left">Last name</TableCell>
              <TableCell align="left">Email</TableCell>
              <TableCell align="left">Created at</TableCell>
              <TableCell align="left">Updated at</TableCell>
              <TableCell align="left"></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => (
              <TableRow
                hover
                key={user._id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                onClick={() => handleRowClick(user)}
                onBlur={onRowBlur}
              >
                {isEdited && editedUser?._id === user._id ? (
                  <>
                    <TableCell>
                      <Input
                        type={"text"}
                        inputRef={firstnameInputRef}
                        name={"firstname"}
                        defaultValue={editedUser.firstname}
                        required
                      />
                    </TableCell>
                    <TableCell>
                      <Input
                        name={"lastname"}
                        defaultValue={editedUser.lastname}
                        required
                      />
                    </TableCell>
                    <TableCell>
                      <Input
                        name={"email"}
                        defaultValue={editedUser.email}
                        required
                      />
                    </TableCell>
                  </>
                ) : (
                  <>
                    <TableCell align="left">{user.firstname}</TableCell>
                    <TableCell align="left">{user.lastname}</TableCell>
                    <TableCell align="left">{user.email}</TableCell>
                  </>
                )}
                <TableCell align="left">{user.createdAt}</TableCell>
                <TableCell align="left">{user.updatedAt}</TableCell>
                <TableCell align="left">
                  <ConfirmationWrapper
                    open={isAboutToDeleteUserId === user._id}
                    onConfirm={() => handleDelete(user._id)}
                    onCancel={handleDeleteButtonMouseLeave}
                    text={"Are you sure ? (Press one more time to delete)"}
                  >
                    <IconButton color={"error"} aria-label="delete">
                      <DeleteIcon />
                    </IconButton>
                  </ConfirmationWrapper>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </form>
  );
}
