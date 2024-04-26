import Entity from "@/types/entity";

export default interface User extends Entity {
  firstname: string;
  lastname: string;
  email: string;
}

export type Signup = Pick<User, "firstname" | "lastname" | "email"> & {
  password: string;
};
