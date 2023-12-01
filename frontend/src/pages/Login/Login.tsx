import { ReactElement } from "react"
import { SubmitHandler, useForm } from "react-hook-form"
import { AuthRequest } from "../../models/auth/AuthRequest"
import { useAuth } from "../../context/AuthContext"
import { Box, Button, Checkbox, Container, FormControlLabel, Grid, TextField, Typography } from "@mui/material"
import { Link } from "react-router-dom"
import { REGISTRATION } from "../../constants/pathConstants"
import { yupResolver } from "@hookform/resolvers/yup"
import { authSchema } from "../../schemas/validationSchemas"
import { StyledTextField } from "../../components/StyledComponents/StyledComponents"

const Login = (): ReactElement => {
  const auth = useAuth()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AuthRequest>({
    resolver: yupResolver(authSchema),
  })

  const onSubmit: SubmitHandler<AuthRequest> = (data: AuthRequest) => {
    auth.login(data)
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
          Sign in
        </Typography>
        <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate sx={{ mt: 1 }}>
          <Grid container spacing={3}>
            <Grid item sm={12} xs={12}>
              <StyledTextField
                fullWidth
                type="text"
                placeholder="Usernames"
                label="Username"
                {...register("username")}
                error={Boolean(errors.username)}
                helperText={errors?.username?.message}
              />
            </Grid>
            <Grid item sm={12} xs={12}>
              <StyledTextField
                fullWidth
                type="password"
                placeholder="Password"
                label="Password"
                {...register("password")}
                error={Boolean(errors.password)}
                helperText={errors?.password?.message}
              />
            </Grid>
          </Grid>
          <FormControlLabel control={<Checkbox value="remember" color="primary" />} label="Remember me" />
          <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
            Sign In
          </Button>
          <Grid container>
            <Grid item xs>
              <Link to="#">Forgot password?</Link>
            </Grid>
            <Grid item>
              <Link to={REGISTRATION}>{"Don't have an account? Sign Up"}</Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  )
}

export default Login
