import React, {
  createContext,
  Dispatch,
  FC,
  ReactElement,
  ReactNode,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react"
import AuthService from "../services/AuthService"
import { AuthRequest } from "../models/auth/AuthRequest"
import { UserResponse } from "../models/user/UserResponse"
import { useNavigate } from "react-router-dom"
import { HOME } from "../constants/pathConstants"

type AuthContextType = {
  user: UserResponse
  setUser: Dispatch<SetStateAction<UserResponse>>
  login: (data: AuthRequest) => void
  refreshUser: () => void
  logout: () => void
  isAuthenticated: () => boolean
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType)

type ProviderProps = {
  children: ReactNode
}

const AuthProvider: FC<ProviderProps> = ({ children }): ReactElement => {
  const [user, setUser] = useState<UserResponse>({} as UserResponse)
  const nav = useNavigate()

  useEffect(() => {
    const storedUser = localStorage.getItem("user")
    if (storedUser !== null) setUser(JSON.parse(storedUser))
  }, [])

  const login = (data: AuthRequest) => {
    AuthService.login(data).then((res) => {
      const user = JSON.stringify(res.data.user)
      const token = res.data.jwt
      localStorage.setItem("user", user)
      localStorage.setItem("token", token)
      setUser(JSON.parse(user))
      nav(HOME)
    })
  }

  const refreshUser = () => {
    AuthService.refresh().then((res) => {
      const user = JSON.stringify(res.data.user)
      const token = res.data.jwt
      localStorage.setItem("user", user)
      localStorage.setItem("token", token)
      setUser(JSON.parse(user))
    })
  }

  const logout = () => {
    localStorage.removeItem("user")
    localStorage.removeItem("token")
    setUser({} as UserResponse)
    AuthService.logout()
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
    refreshUser,
    logout,
    isAuthenticated,
  }

  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>
}

export const useAuth = () => {
  return useContext(AuthContext)
}

export default AuthContext

export { AuthProvider }
