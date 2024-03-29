import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import React, { useEffect, useState } from "react";
import User from "@/types/user";
import useUsers from "@/hooks/useUsers";

type Props = {
  onSubmit: (data: Pick<User, "_id">) => void;
  existingMembers: User[];
};
export default function AddMemberForm({ onSubmit, existingMembers }: Props) {
  const [member, setMember] = useState("");
  const [users, setUsers] = useState<User[]>();
  const { getUsers } = useUsers();
  const [formErrors, setFormErrors] = useState({ member: false });

  useEffect(() => {
    getUsers().then((u) => {
      if (u) setUsers(u);
    });
  }, [getUsers]);

  function handleMemberChange(e: SelectChangeEvent) {
    setMember(e.target.value);
  }

  function handleSubmit() {
    if (!member) {
      setFormErrors((value) => ({ ...value, member: true }));
    } else {
      onSubmit({ _id: member });
      setFormErrors({
        member: false,
      });
      setMember("");
    }
  }

  // List of user you can add as member : all users - members - owner
  const addableMembers =
    users?.filter(
      (u) => !existingMembers.map((m) => m._id).find((id) => id === u._id),
    ) || [];

  return (
    <>
      <FormControl className={"my-6"} required error={formErrors["member"]}>
        <InputLabel id="member">Member</InputLabel>
        <Select
          labelId="member"
          id="member"
          value={member}
          onChange={handleMemberChange}
          className={"min-w-40"}
        >
          {addableMembers.length ? (
            addableMembers.map(({ _id, firstname, lastname }) => (
              <MenuItem key={_id} value={_id}>
                {firstname} {lastname}
              </MenuItem>
            ))
          ) : (
            <MenuItem disabled>No member to add</MenuItem>
          )}
        </Select>
      </FormControl>
      <Button startIcon={<AddIcon />} onClick={handleSubmit}>
        Add member
      </Button>
    </>
  );
}
