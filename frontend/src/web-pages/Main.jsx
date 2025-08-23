import { useAuth } from "../hooks/useAuth"

export default function Main(){
    const { logout, token, user } = useAuth()
    console.log(`TOKEN: ${token} \nUSER: ${user.username}`)
    

    return(
        <>
            <button 
                onClick={logout}
                className="bg-accent p-2">Logout</button>
        </>
    )
}