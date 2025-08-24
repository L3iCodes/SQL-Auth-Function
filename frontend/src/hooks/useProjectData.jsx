import { useQuery } from "@tanstack/react-query";
import { get_Project } from "../api/project.api";
import { useAuth } from "./useAuth";

export default function useProjectData(){
    const { token } = useAuth()

    const projectsQuery = useQuery({
        queryKey: ['projects'],
        queryFn: () => get_Project(token)
    })

    return{projectsQuery}
}
