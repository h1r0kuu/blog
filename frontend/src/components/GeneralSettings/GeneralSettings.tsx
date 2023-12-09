import { ChangeEvent, ReactElement, useEffect, useState } from "react"
import { Box, Button, Card, Grid, IconButton, Switch, Typography } from "@mui/material"
import { ButtonWrapper, StyledTextField, SwitchWrapper, UploadButton } from "../StyledComponents/StyledComponents"
import { Error, PhotoCamera } from "@mui/icons-material"
import { Small, Tiny } from "../Text/Text"
import { SubmitHandler, useForm } from "react-hook-form"
import useTitle from "../../hooks/useTitle"
import { useAuth } from "../../context/AuthContext"
import AuthService from "../../services/AuthService"
import { Link } from "react-router-dom"
import UserService from "../../services/UserService"
import { ChangeGeneralSettingsForm } from "../../models/forms/ChangeGeneralSettingsForm"
import { yupResolver } from "@hookform/resolvers/yup"
import { changeGeneralSchema } from "../../schemas/validationSchemas"
import { palette } from "@mui/system"

const GeneralSettings = (): ReactElement => {
  useTitle("General Settings")
  const { user } = useAuth()
  const [avatarImage, setAvatarImage] = useState<string>(user.avatar)
  const [coverImage, setCoverImage] = useState<string>(user.cover)

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>, type: "avatar" | "cover") => {
    if (e.target.files !== null) {
      const file = e.target.files[0]
      if (file) {
        const reader = new FileReader()
        reader.onloadend = () => {
          if (type === "avatar") setAvatarImage(reader.result as string)
          else setCoverImage(reader.result as string)
        }
        reader.readAsDataURL(file)
      }
    }
  }

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ChangeGeneralSettingsForm>({
    defaultValues: {
      username: user.username,
      email: user.email,
      about: user.about,
    },
    resolver: yupResolver(changeGeneralSchema),
  })
  const onSubmit: SubmitHandler<ChangeGeneralSettingsForm> = async (data: ChangeGeneralSettingsForm) => {
    await UserService.changeGeneralSettings(data)
  }
  return (
    <Box pt={2} pb={4}>
      <Card sx={{ padding: 4 }}>
        <form encType="multipart/form-data" onSubmit={handleSubmit(onSubmit)}>
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
                <Small mb={1} color="text.disabled">
                  Profile avatar image
                </Small>
                <ButtonWrapper
                  sx={{
                    backgroundImage: `url(${avatarImage})`,
                    backgroundPosition: "center",
                    backgroundSize: "cover",
                    ...(errors.avatar && {
                      border: "2px solid",
                      borderColor: "error.main",
                    }),
                  }}
                >
                  <UploadButton>
                    <label htmlFor="upload-avatar">
                      <input
                        accept="image/*"
                        id="upload-avatar"
                        type="file"
                        style={{ display: "none" }}
                        {...register("avatar")}
                        onChange={(e) => {
                          register("avatar").onChange(e)
                          handleImageChange(e, "avatar")
                        }}
                      />
                      <IconButton component="span">
                        <PhotoCamera sx={{ fontSize: 26, color: "white" }} />
                      </IconButton>
                    </label>
                  </UploadButton>
                </ButtonWrapper>
                {errors.avatar && <Small color="error.main">{errors.avatar.message}</Small>}
                <Small mt={1} mb={1} color="text.disabled">
                  Profile cover image
                </Small>
                <ButtonWrapper
                  sx={{
                    borderRadius: "0%",
                    width: 150,
                    backgroundImage: `url(${coverImage})`,
                    backgroundPosition: "center",
                    backgroundSize: "cover",
                    ...(errors.cover && {
                      border: "2px solid",
                      borderColor: "error.main",
                    }),
                  }}
                >
                  <UploadButton>
                    <label htmlFor="upload-cover">
                      <input
                        accept="image/*"
                        id="upload-cover"
                        type="file"
                        style={{ display: "none" }}
                        {...register("cover")}
                        onChange={(e) => {
                          register("cover").onChange(e)
                          handleImageChange(e, "cover")
                        }}
                      />
                      <IconButton component="span">
                        <PhotoCamera sx={{ fontSize: 26, color: "white" }} />
                      </IconButton>
                    </label>
                  </UploadButton>
                </ButtonWrapper>
                {errors.cover && <Small color="error.main">{errors.cover.message}</Small>}
                <Small
                  marginTop={2}
                  maxWidth={200}
                  lineHeight={1.9}
                  display="block"
                  textAlign="center"
                  color="text.disabled"
                >
                  Allowed *.jpeg, *.jpg, *.png, *.gif max size of 3.0 MB
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
                <Grid container spacing={3}>
                  <Grid item sm={12} xs={12}>
                    <StyledTextField
                      fullWidth
                      placeholder="Username"
                      {...register("username")}
                      error={Boolean(errors.username)}
                      helperText={errors?.username?.message}
                    />
                  </Grid>
                  <Grid item sm={12} xs={12}>
                    <StyledTextField
                      fullWidth
                      placeholder="Email"
                      {...register("email")}
                      error={Boolean(errors.email)}
                      helperText={errors?.email?.message}
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
                      helperText={errors?.about?.message}
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
              </Card>
            </Grid>
          </Grid>
        </form>
      </Card>
    </Box>
  )
}

export default GeneralSettings
