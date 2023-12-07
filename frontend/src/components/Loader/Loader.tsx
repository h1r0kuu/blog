import { ReactElement } from "react"
import { Box, CircularProgress } from "@mui/material"

const Loader = (): ReactElement => {
  return (
    <Box sx={{ display: "flex", justifyContent: "center" }}>
      <CircularProgress color="primary" variant="indeterminate" />
    </Box>
  )
}

export default Loader
