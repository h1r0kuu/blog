import { ReactElement } from "react"
import { SubmitHandler, useForm } from "react-hook-form"
import AuthService from "../../services/AuthService"
import { RegistrationRequest } from "../../models/registration/RegistrationRequest"
import { Link, useNavigate } from "react-router-dom"
import { HOME, LOGIN } from "../../constants/pathConstants"
import { Box, Button, Container, Grid, IconButton, InputAdornment, Typography } from "@mui/material"
import { yupResolver } from "@hookform/resolvers/yup"
import { registrationSchema } from "../../schemas/validationSchemas"
import { StyledTextField } from "../../components/StyledComponents/StyledComponents"
import { AttachFile } from "@mui/icons-material"

const Registration = (): ReactElement => {
  const nav = useNavigate()

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<RegistrationRequest>({
    resolver: yupResolver(registrationSchema),
  })

  const onSubmit: SubmitHandler<RegistrationRequest> = (data: RegistrationRequest) => {
    AuthService.register(data)
      .then((res) => {
        nav(HOME)
      })
      .catch((e) => {
        const errors = e.response.data
        Object.keys(errors).forEach((key: any) => {
          setError(key, {
            type: "server",
            message: errors[key],
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
          <Grid container spacing={3}>
            <Grid item sm={12} xs={12}>
              <StyledTextField
                fullWidth
                type="text"
                placeholder="Email Address"
                label="Email Address"
                {...register("email")}
                error={Boolean(errors.email)}
                helperText={errors?.email?.message}
              />
            </Grid>
            <Grid item sm={12} xs={12}>
              <StyledTextField
                fullWidth
                type="text"
                placeholder="Username"
                label="Username"
                {...register("username")}
                error={Boolean(errors.username)}
                helperText={errors?.username?.message}
              />
            </Grid>
            <Grid item sm={12} xs={12}>
              <StyledTextField
                fullWidth
                type="passowrd"
                placeholder="Password"
                label="Password"
                {...register("password")}
                error={Boolean(errors.password)}
                helperText={errors?.password?.message}
              />
            </Grid>
            <Grid item sm={12} xs={12}>
              <StyledTextField
                fullWidth
                type="passowrd"
                placeholder="Confirm Password"
                label="Confirm Password"
                {...register("confirmPassword")}
                error={Boolean(errors.confirmPassword)}
                helperText={errors?.confirmPassword?.message}
              />
            </Grid>
            <Grid item sm={12} xs={12}>
              <StyledTextField
                fullWidth
                type="file"
                placeholder="Select a file"
                // label="Upload Image"
                {...register("avatar")}
                error={Boolean(errors.avatar)}
                helperText={errors?.avatar?.message}
                inputProps={{
                  accept: ".jpg,.jpeg,.png,.gif",
                  endAdornment: (
                    <InputAdornment position="end">
                      <label htmlFor="avatar">
                        <IconButton color="primary" aria-label="upload file" component="span">
                          <AttachFile />
                        </IconButton>
                      </label>
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
          </Grid>
          <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
            Sign Up
          </Button>
          <Typography align="center">
            <Link to={LOGIN}>{"Already have an account? Sign In"}</Link>
          </Typography>
        </Box>
      </Box>
    </Container>
  )
}

export default Registration
