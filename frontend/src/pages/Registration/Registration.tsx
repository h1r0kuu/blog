import { ReactElement } from "react"
import {SubmitHandler, useForm} from "react-hook-form";
import AuthService from "../../services/AuthService";
import {RegistrationRequest} from "../../models/registration/RegistrationRequest";
import {Link, useNavigate} from "react-router-dom";
import {HOME, LOGIN} from "../../constants/pathConstants";
import {Box, Button, Container, TextField, Typography} from "@mui/material";

const Registration = (): ReactElement => {
  const nav = useNavigate();

  const {
    register,
    handleSubmit,
    setError,
    formState: {errors}
  } = useForm<RegistrationRequest>()

  const onSubmit: SubmitHandler<RegistrationRequest> = (data: RegistrationRequest) => {
    AuthService.register(data).then(res => {
      nav(HOME)
    }).catch(e => {
      const errors = e.response.data
      Object.keys(errors).forEach((key: any) => {
        setError(key, {
          type: "server",
          message: errors[key]
        })
      })
    })
  }

  return (
      <Container component="main" maxWidth="xs">
        <Box
            sx={{
              marginTop: 8,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
        >
          <Typography component="h1" variant="h5">
            Sign Up
          </Typography>
          <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate sx={{ mt: 1 }}>
            <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                autoComplete="email"
                autoFocus
                {...register("email")}
            />
            <TextField
                margin="normal"
                required
                fullWidth
                id="username"
                label="Username"
                autoComplete="username"
                autoFocus
                {...register("username")}
            />
            <TextField
                margin="normal"
                required
                fullWidth
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                {...register("password")}
            />
            <Button
                variant="outlined"
                component="label"
                fullWidth
            >
              Upload avatar
              <input
                  type="file"
                  {...register("avatar")}
                  hidden
              />
            </Button>
            <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
            >
              Sign Un
            </Button>
            <Typography align="center">
              <Link to={LOGIN}>
                {"Already have an account? Sign In"}
              </Link>
            </Typography>
          </Box>
        </Box>
      </Container>
  )
}

export default Registration;