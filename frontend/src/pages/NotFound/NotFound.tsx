import { ReactElement } from "react"
import { Box, Typography } from "@mui/material"
import { NavLink } from "react-router-dom"
import { HOME } from "../../constants/pathConstants"

const NotFound = (): ReactElement => {
  return (
    <Box
      sx={{ display: "flex" }}
      p={4}
      height="100%"
      alignItems="center"
      flexDirection="column"
      justifyContent="center"
    >
      <Typography component={"h1"} fontSize={64} fontWeight={700} color="primary.main" mt={3}>
        Ooops... 404!
      </Typography>
      <Typography component={"p"} color="text.disabled" fontWeight="500">
        The page you requested could not be found.
      </Typography>

      <NavLink
        to={HOME}
        style={{
          display: "block",
          marginTop: "1.5rem",
          fontWeight: 600,
          textDecoration: "underline",
        }}
      >
        Back to Home page
      </NavLink>
    </Box>
  )
}

export default NotFound
