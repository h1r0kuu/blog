import { Navigate, Outlet } from "react-router-dom"
import { useAuth } from "../context/AuthContext"
import { LOGIN } from "../constants/pathConstants"
import { ReactElement } from "react"

const ProtectedRoute = (): ReactElement => {
  const { isAuthenticated } = useAuth()
  return isAuthenticated() ? <Outlet /> : <Navigate to={LOGIN} />
}

export default ProtectedRoute
