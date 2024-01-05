import { ReactElement } from "react"
import Header from "../../components/Header/Header"
import Feed from "../../components/Feed/Feed"
import { useAuth } from "../../context/AuthContext"

const Home = (): ReactElement => {
  const { user } = useAuth()
  return (
    <>
      <Header />
      <Feed />
    </>
  )
}

export default Home
