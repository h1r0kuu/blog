import { ReactElement } from "react"
import { Box, Button, Card, Grid, IconButton, Switch, Typography } from "@mui/material"
import { ButtonWrapper, StyledTextField, SwitchWrapper, UploadButton } from "../StyledComponents/StyledComponents"
import { PhotoCamera } from "@mui/icons-material"
import { Small, Tiny } from "../Text/Text"
import { SubmitHandler, useForm } from "react-hook-form"
import useTitle from "../../hooks/useTitle"

type SomeProps = {
  username: string
  about: string
}

const GeneralSettings = (): ReactElement => {
  useTitle("General Settings")

  const initialValues = {
    username: "",
    about: "",
  }

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SomeProps>({
    defaultValues: initialValues,
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
              <ButtonWrapper>
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
                <Tiny display="block" color="text.disabled" fontWeight={500}>
                  Apply disable account
                </Tiny>
                <SwitchWrapper>
                  <Small display="block" fontWeight={600}>
                    Email Verified
                  </Small>
                  <Switch defaultChecked />
                </SwitchWrapper>
                <Tiny display="block" color="text.disabled" fontWeight={500}>
                  Disabling this will automatically send the user a verification email
                </Tiny>
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
