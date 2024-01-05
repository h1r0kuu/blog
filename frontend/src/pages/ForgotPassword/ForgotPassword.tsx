import { Box, Button, Checkbox, Container, FormControlLabel, Grid, Typography } from "@mui/material"
import { StyledTextField } from "../../components/StyledComponents/StyledComponents"
import { Link } from "react-router-dom"
import { LOGIN, REGISTRATION } from "../../constants/pathConstants"
import { useAuth } from "../../context/AuthContext"
import { SubmitHandler, useForm } from "react-hook-form"
import { AuthRequest } from "../../models/auth/AuthRequest"
import { yupResolver } from "@hookform/resolvers/yup"
import { authSchema, passwordRestoringSchema, registrationSchema } from "../../schemas/validationSchemas"
import { RestorePasswordRequest } from "../../models/auth/RestorePasswordRequest"
import AuthService from "../../services/AuthService"

const ForgotPassword = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RestorePasswordRequest>({
    resolver: yupResolver(passwordRestoringSchema),
  })

  const onSubmit: SubmitHandler<RestorePasswordRequest> = (data: RestorePasswordRequest) => {
    AuthService.restorePassword(data).then((res) => {})
  }

  return (
    <Container component="main" maxWidth="sm">
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography component="h1" variant="h5">
          Forget Password
        </Typography>
        <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate sx={{ mt: 3, width: "100%" }}>
          <Grid container>
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
          </Grid>
          <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
            Restore
          </Button>
          <Typography align="center">
            <Link to={LOGIN}>Back to Sign In</Link>
          </Typography>
        </Box>
      </Box>
    </Container>
  )
}

export default ForgotPassword
