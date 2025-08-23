import { useNavigate } from "react-router-dom"

export default function SignupPage(){
    const navigate = useNavigate()

    return(
        <div className="flex flex-col h-full w-full justify-center">
            <div className="w-full flex flex-col gap-10 sm:flex-row bg-secondary p-10 rounded-[5px] border-accent border-1 shadow-sm shadow-black">
                <div className="w-full ">
                    <h1 className="font-medium">Create Account</h1>
                    <h4 className="text-subtext">Lorem ipsum dolor sit amet consectetur adipisicing elit.</h4>
                </div>
                
                <form className="w-full flex flex-col gap-5 ">
                    <div>
                        <label className="text-[14px]" htmlFor="username">Username</label>
                        <input id="username" type='text' required={true} placeholder="Your username" ></input>
                    </div>
                    
                    <div>
                        <label className="text-[14px]" htmlFor="password">Password</label>
                        <input id="password" type="text" required={true} placeholder="Your password" />
                    </div>
                    
                    <button type="submit"
                        className="flex items-center justify-center bg-primary py-2 mt-5 rounded-[5px] cursor-pointer border-accent border-1 hover:bg-accent active:bg-primary"
                        >Create Account
                    </button>

                    <h5 
                        className="self-end text-subtext"
                        >Already have an account? <span 
                                                    onClick={() => navigate('/')}
                                                    className="hover:text-text active:text-subtext cursor-pointer"
                                                    >Login
                                                </span>
                    </h5>
                </form>
            </div>
            
            
        </div>
    )
}