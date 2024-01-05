import React from "react"
import { Route, Routes } from "react-router-dom"
import {
  HOME,
  LOGIN,
  PROFILE,
  REGISTRATION,
  SETTINGS,
  POST,
  POST_CREATE,
  VERIFY_TOKEN,
  FORGOT_PASSWORD,
} from "./constants/pathConstants"
import Home from "./pages/Home/Home"
import Login from "./pages/Login/Login"
import Registration from "./pages/Registration/Registration"
import Profile from "./pages/Profile/Profile"
import Settings from "./pages/Settings/Settings"
import PostPage from "./pages/PostPage/PostPage"
import PostCreationPage from "./pages/PostCreationPage/PostCreationPage"
import PostUpdatePage from "./pages/PostUpdatePage/PostUpdatePage"
import { createTheme, CssBaseline, ThemeProvider } from "@mui/material"
import { commonTheme } from "./theme"
import ProtectedRoute from "./utils/ProtectedRoute"
import NotFound from "./pages/NotFound/NotFound"
import VerifyToken from "./pages/VerifyToken/VerifyToken"
import ForgotPassword from "./pages/ForgotPassword/ForgotPassword"

const App = () => {
  return (
    <ThemeProvider theme={createTheme(commonTheme)}>
      <CssBaseline />
      <Routes>
        <Route path={HOME} element={<Home />} />

        <Route path={LOGIN} element={<Login />} />
        <Route path={REGISTRATION} element={<Registration />} />
        <Route path={`${PROFILE}/:username`} element={<Profile />} />
        <Route path={`${POST}/:id`} element={<PostPage />} />
        <Route path={FORGOT_PASSWORD} element={<ForgotPassword />} />
        <Route path={VERIFY_TOKEN} element={<VerifyToken />} />
        <Route path={`${POST}/:id/update`} element={<PostUpdatePage />} />
        <Route path={POST_CREATE} element={<PostCreationPage />} />

        {/*  AUTHORIZED USER ROUTES */}
        <Route element={<ProtectedRoute />}>
          <Route path={SETTINGS} element={<Settings />} />
        </Route>
        <Route path={"*"} element={<NotFound />} />
      </Routes>
    </ThemeProvider>
  )
}

export default App
