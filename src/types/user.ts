import Entity from "@/types/entity";

export default interface User extends Entity {
  firstname: string;
  lastname: string;
  email: string;
}
