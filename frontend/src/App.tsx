import React from "react"
import { Route, Routes } from "react-router-dom"
import { HOME, LOGIN, REGISTRATION } from "./constants/pathConstants"
import Home from "./pages/Home/Home"
import Login from "./pages/Login/Login"
import Registration from "./pages/Registration/Registration"

const App = () => {
  return (
    <Routes>
      <Route path={HOME} element={<Home />} />
      <Route path={LOGIN} element={<Login />} />
      <Route path={REGISTRATION} element={<Registration />} />
    </Routes>
  )
}

export default App
