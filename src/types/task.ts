import Entity from "@/pages/types/entity";

export default interface Task extends Entity {
  name: string,
  description: string,
}
