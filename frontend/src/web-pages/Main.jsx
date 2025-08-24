import { useEffect } from "react"
import { useAuth } from "../hooks/useAuth"
import useProjectData from "../hooks/useProjectData"
import Card from "../components/Card"
import { data } from "react-router-dom"
import { useState } from "react"

export default function Main(){
    const { logout, token, user } = useAuth()
    const { projectsQuery, addProjectMutation, deleteProjectMutation } = useProjectData();
    const { mutate: addMutate, isLoading, error } = addProjectMutation;
    const { data: projects, isLoading: projectLoading } = projectsQuery;
    const { mutate: deleteMutate } = deleteProjectMutation;
    const [ openAdd, setOpenAdd ] = useState(false)

    const handleAddproject = async (e) => {
        e.preventDefault()
        const formData = new FormData(e.target);
        const newProject = {
            project_name: formData.get('project_name'),
            project_description: formData.get('project_description')
        }
   
        addMutate({token, newProject});

        if(!error){
            e.target.reset();
        }else{
            console.log(error)
        }
    }

    const handleDelete = async (project_id) => {
        deleteMutate({token, project_id})
    }
   
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
                    <button 
                        onClick={() => setOpenAdd(s => !s)}
                        className="h-[30px] w-[30px] bg-secondary rounded-[5px] border-1 border-accent cursor-pointer hover:bg-accent active:bg-secondary"
                        >{openAdd ? 'x' : '+'}
                    </button>
                </div>

                
                <form onSubmit={handleAddproject} className={`flex flex-col border-1 gap-2 border-accent rounded-[5px]
                                 transition-all
                                ${!openAdd ? 'opacity-0 h-0' : 'opacity-100 h-fit p-2 mb-4'}`}>
                    
                    <h3 className="font-medium">Add Project Information</h3>
                    <div className="flex flex-col sm:flex-row w-full gap-2">
                        <div className="w-full">
                            <label className={'text-[12px]'} htmlFor="project_name">Project Name</label>
                            <input type="text" required={true} name="project_name" placeholder="project name"/>
                        </div>
                        
                        <div className="w-full">
                            <label className={'text-[12px]'} htmlFor="project_description">Project Description</label>
                            <input type="text" required={true} name="project_description" placeholder="project description"/>
                        </div>
                    </div>
                    <button 
                        type="submit"
                        className="mt-3 w-full h-[40px] bg-secondary rounded-[5px] border-1 border-accent cursor-pointer hover:bg-accent active:bg-secondary"
                        >{isLoading ? 'Adding...' : 'Add Project'}
                    </button>
                </form>
                
                
                <div className="grid grid-cols-2 gap-3">
                        {projectLoading 
                            ? <h3>Getting Projects</h3>
                            : projects.result.map(element => (
                                <Card 
                                    key={element.project_id} 
                                    data={element} 
                                    onDelete={() => handleDelete(element.project_id)}
                                />
                            ))
                        }
                    </div>
                
            </div>
        </div>
    )
}