import Entity from "@/types/entity";

export default interface Task extends Entity {
  name: string;
  description: string;
}
