import { ReactElement } from "react"
import { Box, Button, Card, Grid, IconButton, Switch, Typography } from "@mui/material"
import {
  ButtonWrapper,
  StyledButton,
  StyledTextField,
  SwitchWrapper,
  UploadButton,
} from "../StyledComponents/StyledComponents"
import { Error, PhotoCamera } from "@mui/icons-material"
import { Small, Tiny } from "../Text/Text"
import { SubmitHandler, useForm } from "react-hook-form"
import useTitle from "../../hooks/useTitle"
import { useAuth } from "../../context/AuthContext"
import AuthService from "../../services/AuthService"
import { Link } from "react-router-dom"

type SomeProps = {
  username: string
  about: string
  email: string
  isEmailVerified: boolean
}

const GeneralSettings = (): ReactElement => {
  useTitle("General Settings")
  const { user } = useAuth()

  // const initialValues: SomeProps = {
  //   username: user.username,
  //   email: user.email,
  //   about: "",
  //   isEmailVerified: user.isEmailVerified,
  // }

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SomeProps>({
    defaultValues: user,
  })
  const onSubmit: SubmitHandler<SomeProps> = (data: SomeProps) => {}
  return (
    <Box pt={2} pb={4}>
      <Card sx={{ padding: 4 }}>
        <Grid container spacing={3}>
          <Grid item md={4} xs={12}>
            <Card
              sx={{
                padding: 3,
                boxShadow: 2,
                minHeight: 400,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <ButtonWrapper
                sx={{
                  backgroundImage: `url(${user.avatar})`,
                  backgroundPosition: "center",
                  backgroundSize: "cover",
                }}
              >
                <UploadButton>
                  <label htmlFor="upload-btn">
                    <input accept="image/*" id="upload-btn" type="file" style={{ display: "none" }} />
                    <IconButton component="span">
                      <PhotoCamera sx={{ fontSize: 26, color: "white" }} />
                    </IconButton>
                  </label>
                </UploadButton>
              </ButtonWrapper>

              <Small
                marginTop={2}
                maxWidth={200}
                lineHeight={1.9}
                display="block"
                textAlign="center"
                color="text.disabled"
              >
                Allowed *.jpeg, *.jpg, *.png, *.gif max size of 3.1 MB
              </Small>

              <Box maxWidth={250} marginTop={5} marginBottom={1}>
                <SwitchWrapper>
                  <Typography display="block" fontWeight={600}>
                    Private Profile
                  </Typography>
                  <Switch />
                </SwitchWrapper>
              </Box>
            </Card>
          </Grid>
          <Grid item md={8} xs={12}>
            <Card sx={{ padding: 3, boxShadow: 2 }}>
              <form onSubmit={handleSubmit(onSubmit)}>
                <Grid container spacing={3}>
                  <Grid item sm={12} xs={12}>
                    <StyledTextField
                      fullWidth
                      placeholder="Username"
                      {...register("username")}
                      error={Boolean(errors.username)}
                    />
                  </Grid>
                  <Grid item sm={12} xs={12}>
                    <StyledTextField
                      fullWidth
                      placeholder="Email"
                      {...register("email")}
                      error={Boolean(errors.email)}
                    />
                    {!user.isEmailVerified && (
                      <Tiny color="warning.main">
                        <Error sx={{ fontSize: 16 }} /> Your email isn't verified!
                        <Typography
                          color={"info.main"}
                          sx={{ display: "inline-block", fontSize: 12 }}
                          ml={1}
                          component={Link}
                          to={""}
                          onClick={() => AuthService.resendActivationCode()}
                        >
                          Resend verification code
                        </Typography>
                      </Tiny>
                    )}
                  </Grid>

                  <Grid item xs={12}>
                    <StyledTextField
                      multiline
                      fullWidth
                      rows={10}
                      placeholder="About"
                      {...register("about")}
                      error={Boolean(errors.about)}
                      sx={{
                        "& .MuiOutlinedInput-root textarea": { padding: 0 },
                      }}
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <Button type="submit" variant="contained">
                      Save changes
                    </Button>
                  </Grid>
                </Grid>
              </form>
            </Card>
          </Grid>
        </Grid>
      </Card>
    </Box>
  )
}

export default GeneralSettings
