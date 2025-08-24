import { useQuery, useMutation, QueryClient, useQueryClient } from "@tanstack/react-query";
import { get_Project, add_Project, delete_Project } from "../api/project.api";
import { useAuth } from "./useAuth";

export default function useProjectData(){
    const { token } = useAuth()
    const queryClient = useQueryClient()

    const projectsQuery = useQuery({
        queryKey: ['projects'],
        queryFn: () => get_Project(token)
    })

    const addProjectMutation = useMutation({
        mutationFn: ({token, newProject}) => {
            return add_Project(token, newProject);
        },
        onSuccess: () => {
            queryClient.invalidateQueries(['projects'])
        }
    })

    const deleteProjectMutation = useMutation({
        mutationFn: ({token, project_id}) => {
            console.log("IN MUTATE PROJECT_ID", project_id)
            console.log("IN MUTATE ", token)
            return delete_Project(token, project_id);
        },
        onSuccess: () => {
            queryClient.invalidateQueries(['projects'])
        }
    })

    return{projectsQuery, addProjectMutation, deleteProjectMutation}
}
