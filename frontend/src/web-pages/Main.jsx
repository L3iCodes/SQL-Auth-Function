import { useEffect } from "react"
import { useAuth } from "../hooks/useAuth"
import useProjectData from "../hooks/useProjectData"
import Card from "../components/Card"
import { data } from "react-router-dom"

export default function Main(){
    const { logout, token, user } = useAuth()
    const { projectsQuery } = useProjectData();
    const { data: projects, isLoading } = projectsQuery;

    console.log(projects)
   
    return(
        <div className="mt-10 flex flex-col gap-8 w-full h-full">
            <div className="flex flex-col">
                <h1 className="font-medium">Welcome <span className="text-text font-bold und">{user.username}</span>!</h1>
                <h5 className="mt-1 text-subtext border-accent border p-1 break-words rounded-[5px]">
                    Access Token: '{token}'
                </h5>
            </div>
            
            
            <div className="w-full flex flex-col gap-2">
                <div className="flex gap-4 items-center">
                    <h2>Projects</h2>
                    <button className="h-[30px] w-[30px] bg-secondary rounded-[5px] border-1 border-accent cursor-pointer hover:bg-accent active:bg-secondary">+</button>
                </div>

                <div className="grid grid-cols-2 gap-3">
                        {isLoading 
                            ? <h3>Getting Projects</h3>
                            : projects.result.map(element => (
                                <Card key={element.project_id} data={element} />
                            ))
                        }
                    </div>
                
            </div>
        </div>
    )
}