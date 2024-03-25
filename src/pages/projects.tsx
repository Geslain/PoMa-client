import {useSession} from "next-auth/react";

export default function ProjectsPage() {
 const session = useSession()
 console.log(session)
 return "projects"
}
