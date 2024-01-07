import { ReactElement, useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import TokenService from "../../services/TokenService"
import { useAuth } from "../../context/AuthContext"
import Home from "../Home/Home"
import { Box, IconButton, Modal, Typography } from "@mui/material"
import CloseIcon from "@mui/icons-material/Close"
import DoneAllIcon from "@mui/icons-material/DoneAll"

const VerifyToken = (): ReactElement => {
  const [open, setOpen] = useState(false)

  const handleClose = () => setOpen(false)

  const { token } = useParams()
  const { refreshUser } = useAuth()
  useEffect(() => {
    if (token !== undefined) {
      TokenService.verifyToken(token).then((res) => {
        setOpen(true)
        refreshUser()
      })
    }
  }, [])

  return (
    <>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            border: "2px solid #000",
            boxShadow: 24,
            p: 4,
          }}
        >
          <IconButton
            aria-label="close"
            onClick={handleClose}
            sx={{
              position: "absolute",
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <CloseIcon />
          </IconButton>

          <Typography
            id="modal-modal-description"
            sx={{
              color: (theme) => theme.palette.success.light,
            }}
          >
            <IconButton
              sx={{
                "&.Mui-disabled": {
                  color: (theme) => theme.palette.success.light,
                },
              }}
              disabled
            >
              <DoneAllIcon />
            </IconButton>
            You successfully verified your email
          </Typography>
        </Box>
      </Modal>
      <Home />
    </>
  )
}

export default VerifyToken
