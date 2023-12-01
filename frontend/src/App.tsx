import React from "react"
import {Route, Routes} from "react-router-dom"
import {HOME, LOGIN, PROFILE, REGISTRATION, SETTINGS} from "./constants/pathConstants"
import Home from "./pages/Home/Home"
import Login from "./pages/Login/Login"
import Registration from "./pages/Registration/Registration"
import Profile from "./pages/Profile/Profile";
import Settings from "./pages/Settings/Settings";
import {createTheme, CssBaseline, ThemeProvider} from "@mui/material";
import {commonTheme} from "./theme";

const App = () => {
    return (
        <ThemeProvider theme={createTheme(commonTheme)}>
            <CssBaseline/>
            <Routes>
                <Route path={HOME} element={<Home/>}/>
                <Route path={LOGIN} element={<Login/>}/>
                <Route path={REGISTRATION} element={<Registration/>}/>

                <Route path={`${PROFILE}/:username`} element={<Profile/>}/>
                <Route path={SETTINGS} element={<Settings/>}/>
            </Routes>
        </ThemeProvider>
    )
}

export default App
