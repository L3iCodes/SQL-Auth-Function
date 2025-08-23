import  { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { login, refresh, verify } from '../api/auth.api.js';
import { createContext, useContext, useState, useEffect } from "react";
import { useNavigate} from 'react-router-dom';


const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const navigate = useNavigate()
    const queryClient = useQueryClient()
    const [token, setToken] = useState(localStorage.getItem('token'));
    const [user, setUser ] = useState(null);
    const [authenticated, setAuthenticated] = useState(false)
    const [isRefreshing, setIsRefreshing] = useState(false);
    const [loading, setLoading] = useState(true)

    // Verify access token
    const { data, isSuccess, error, isError } = useQuery({
        queryKey: ['authenticate', token],
        queryFn: ({ queryKey }) => verify(queryKey[1]),
        enabled: !!token && !isRefreshing,
        retry: false,
    });

    // Create new access token 
    const refreshMutation = useMutation({
        mutationFn: refresh,
        onMutate: () => {
            // Stop verification query
            setIsRefreshing(true);
        },
        onSuccess: (data) => {
            setToken(data.accessToken)
            localStorage.setItem('token', data.accessToken)

            // Enable verification query
            setIsRefreshing(false);
        },
        onError: (error) => {
            console.log('Refresh failed:', error);
            setIsRefreshing(false);
            logout()
        },
        retry: false,
    })

    useEffect(() => {
        if(isSuccess && data) {
            setUser(data.user);
            setAuthenticated(true);
            setLoading(false)
        }

        if(isError){
            // If access token is invalid / expired, refresh or generate token
            refreshMutation.mutate()
        }
    }, [data, isError, isSuccess])


    const loginMutation = useMutation({
        mutationFn: (credentials) => login(credentials),
        onSuccess: (data) => {
            setToken(data.credentials.token);
            setUser({user_id: data.credentials.user_id, username: data.credentials.username});
            localStorage.setItem('token', data.credentials.token);
            queryClient.setQueryData(['user'], data.user);
            setAuthenticated(true);
            navigate('/');
        },
        onError:(error) => {
            console.log(error)
        }
    })

    const logout = () => {
        setUser(null);
        setToken(null);
        setAuthenticated(false)
        localStorage.removeItem('token')
    }

    const value = {
        token,
        authenticated,
        user,
        login: loginMutation.mutate,
        isLoading: loginMutation.isLoading,
        isError: loginMutation.isError,
        logout,
        loading
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