import { ReactElement } from "react"
import Header from "../../components/Header/Header"
import { useAuth } from "../../context/AuthContext"

const Home = (): ReactElement => {
  const auth = useAuth()
  return (
    <>
      <Header />
      {auth.user.username}
    </>
  )
}

export default Home
