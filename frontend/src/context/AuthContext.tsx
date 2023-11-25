import React, {
    Context,
    createContext,
    Dispatch,
    FC,
    ReactElement,
    SetStateAction,
    useContext,
    useEffect,
    useState
} from "react";
import AuthService from "../services/AuthService";
import {AuthRequest} from "../models/auth/AuthRequest";
import {UserResponse} from "../models/user/UserResponse";

type AuthContextType = {
    user: UserResponse;
    setUser: Dispatch<SetStateAction<UserResponse>>;
    login: (data: AuthRequest) => void;
    logout: () => void;
    isAuthenticated: () => boolean;
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

const AuthProvider: FC<any> = ({children}): ReactElement => {
    const [user, setUser] = useState<UserResponse>({} as UserResponse)

    useEffect(() => {
        const storedUser = localStorage.getItem("user")
        if(storedUser !== null) setUser(JSON.parse(storedUser))
    }, [])

    const login = (data: AuthRequest) => {
        AuthService.login(data).then(res => {
            const user = JSON.stringify(res.data.user)
            localStorage.setItem("user", user)
            setUser(JSON.parse(user))
        })
    }

    const logout = () => {
        localStorage.removeItem('user')
        setUser({} as UserResponse)
    }

    const isAuthenticated = (): boolean => {
        const storedUser = localStorage.getItem("user")
        if (!storedUser) {
            return false
        }
        return true
    }

    const values = {
        user,
        setUser,
        login,
        logout,
        isAuthenticated
    }

    return (
        <AuthContext.Provider value={values}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => {
    return useContext(AuthContext);
}

export default AuthContext;

export {AuthProvider}