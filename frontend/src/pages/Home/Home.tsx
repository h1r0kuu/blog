import { ReactElement } from "react"
import Header from "../../components/Header/Header"
import Feed from "../../components/Feed/Feed"

const Home = (): ReactElement => {
  return (
    <>
      <Header />
      <Feed />
    </>
  )
}

export default Home
