import  { useMutation, useQueryClient } from '@tanstack/react-query'
import { login } from '../api/auth.api.js';
import { createContext, useContext, useState, useEffect } from "react";
import { useNavigate} from 'react-router-dom';


const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const navigate = useNavigate()
    const queryClient = useQueryClient()
    const [token, setToken] = useState(null);
    const [user, setUser ] = useState(null);

    //
    // ADD VERIFICATION (VERIFY IT ACCESS TOKEN EXISTS, IF NOT REFRESH (if there is a refresh token -> generate new token))
    //

    const loginMutation = useMutation({
        mutationFn: (credentials) => login(credentials),
        onSuccess: (data) => {
            setToken(data.credentials.token);
            setUser({user_id: data.credentials.user_id, username: data.credentials.username});
            localStorage.setItem('token', data.credentials.token);
            localStorage.setItem('user', {user_id: data.credentials.user_id, username: data.credentials.username});
            queryClient.setQueryData(['user'], data.user);

            navigate('/');
        },
        onError:(error) => {
            console.log(error)
        }
    })

    const logout = () => {
        setUser(null);
        setToken(null);
        localStorage.removeItem('token')
    }

    const value = {
        token,
        user,
        login: loginMutation.mutate,
        isLoading: loginMutation.isLoading,
        isError: loginMutation.isError,
        logout
    }

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => {
    return useContext(AuthContext);
};