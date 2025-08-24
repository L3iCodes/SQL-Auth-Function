import { useNavigate } from "react-router-dom"
import { useAuth } from "../hooks/useAuth"

export default function Navbar(){
    const { user, logout } = useAuth()
    const navigate = useNavigate()

    return(
        <div className="flex items-center py-2 px-5 w-full h-[40px] bg-secondary border-1 border-accent shadow-2xs shadow-black rounded-[5px] sticky top-0 left-0">
            <h3 className="text-subtext font-medium">Projects</h3>
            
            {user 
                ? <h4 onClick={logout} className=" ml-auto text-subtext hover:text-text active:text-subtext cursor-pointer">Log Out</h4>
                : <h4 onClick={() => navigate('login')} className=" ml-auto text-subtext hover:text-text active:text-subtext cursor-pointer">Log In</h4>
            }
        </div>
    )
}