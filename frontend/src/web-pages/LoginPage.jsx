import { useNavigate } from "react-router-dom"
import { Eye, EyeOff } from "lucide-react"
import { useState } from "react"
import { useAuth } from "../hooks/useAuth"

export default function LoginPage(){
    const navigate = useNavigate()
    const {user, token, login, isLoading, isError} = useAuth()
    const [showPassword, setShowPassword] = useState(false)
    
    const handleLogin = (e) => {
        e.preventDefault()
        const formData = new FormData(e.target)
        const credentials = {
            username: formData.get('username'),
            password: formData.get('password'),
        }

        console.log(credentials)
        login(credentials)
        
    }

    return(
        <div className="flex flex-col h-full w-full justify-center">
            <div className="w-full flex flex-col gap-10 sm:flex-row bg-secondary p-10 rounded-[5px] border-accent border-1 shadow-sm shadow-black">
                <div className="w-full ">
                    <h1 className="font-medium">Login Page</h1>
                    <h4 className="text-subtext">Lorem ipsum dolor sit amet consectetur adipisicing elit.</h4>
                </div>
                
                <form onSubmit={handleLogin} className="w-full flex flex-col gap-5 ">
                    <div>
                        <label className="text-[14px]" htmlFor="username">Username</label>
                        <input id="username" name="username" type='text' required={true} placeholder="Your username" />
                    </div>
                    
                    <div>
                        <label className="text-[14px]" htmlFor="password">Password</label>
                        <div className="flex gap-1 items-center">
                            <input id="password" name="password" type={showPassword ? 'text' : 'password'} required={true} placeholder="Your password" />

                            {showPassword 
                                ? <Eye onClick={() => setShowPassword(false)} size={28} className="border-1 border-accent p-1 rounded-[2px] hover:bg-primary active:bg-secondary cursor-pointer"/>
                                : <EyeOff onClick={() => setShowPassword(true)}  size={28} className="border-1 border-accent p-1 rounded-[2px] hover:bg-primary active:bg-secondary cursor-pointer"/>
                            }
                            
                        </div>
                        
                        
                    </div>
                    
                    <button 
                        type="submit"
                        className="flex items-center justify-center bg-primary py-2 mt-5 rounded-[5px] cursor-pointer border-accent border-1 hover:bg-accent active:bg-primary"
                        >Login
                    </button>

                    <h5 
                        className="self-end text-subtext"
                        >Don't have an account? <span 
                                                    onClick={() => navigate('/signup')}
                                                    className="hover:text-text active:text-subtext cursor-pointer"
                                                    >Register Now
                                                </span>
                    </h5>
                </form>
            </div>
            
            
        </div>
    )
}