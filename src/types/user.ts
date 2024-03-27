import Entity from "@/pages/types/entity";

export default interface User extends Entity {
  firstname: string
  lastname: string,
  email: string
}
