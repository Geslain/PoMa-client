import Entity from "@/pages/types/entity";
import User from "@/pages/types/user";
import Task from "@/pages/types/task";

export default interface Project extends Entity {
  name: string,
  owner: User
  members: User[],
  tasks: Task[]
}
