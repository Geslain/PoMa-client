import Project from "./components/Project";
import { getOne } from "@/lib/actions/projects";

export default async function ProjectsPage({
  params,
}: {
  params: { id: string };
}) {
  const project = await getOne(params.id);

  return <Project data={project} projectId={params.id} />;
}
