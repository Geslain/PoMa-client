import Entity from "@/types/entity";
import User from "@/types/user";
import Task from "@/types/task";

export default interface Project extends Entity {
  name: string;
  owner: User;
  members: User[];
  tasks: Task[];
}
