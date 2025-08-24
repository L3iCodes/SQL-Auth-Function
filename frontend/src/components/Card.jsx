import { useState } from "react"

export default function Card({ data, onDelete }){
    const [openDelete, setOpenDelete] = useState(false)

    return(
        <div 
            onMouseEnter={() => setOpenDelete(true)}
            onMouseLeave={() => setOpenDelete(false)}
            className="flex  flex-col  gap-1 bg-secondary border-1 border-accent p-2 rounded-[5px] relative
                        transition-transform ease-in
                        hover:scale-102">
            <h3 className="font-medium">{data.project_name}</h3>
            <h5 className="font-medium ">{data.project_description}</h5>
            <h5 className="">Owner: {data.owner}</h5>
            <h5 className="">Members: {data.collaborators}</h5>

            {openDelete && (
                <button onClick={onDelete} className="flex justify-center items-center bg-red-600 border-1 border-accent w-fit px-2 text-[12px] absolute right-2 rounded-[5px] hover:bg-red-700 active:bg-red-500 cursor-pointer">Delete</button>
            )}
            
        </div>
    )
}