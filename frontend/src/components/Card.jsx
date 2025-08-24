export default function Card({ data }){
    return(
        <div className="flex  flex-col  gap-1 bg-secondary border-1 border-accent p-2 rounded-[5px]
                        transition-transform ease-in
                        hover:scale-102">
            <h3 className="font-medium">{data.project_name}</h3>
            <h5 className="font-medium ">{data.project_description}</h5>
            <h5 className="">Owner: {data.owner}</h5>
            <h5 className="">Members: {data.collaborators}</h5>
        </div>
    )
}