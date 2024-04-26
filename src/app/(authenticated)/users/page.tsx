import { Typography } from "@mui/material";
import Users from "./components/Users";
import { getMany } from "@/lib/actions/users";

export default async function UsersPage() {
  const users = await getMany();

  return (
    <>
      <Typography variant="h1" gutterBottom>
        Users
      </Typography>
      <Users data={users} />
    </>
  );
}
