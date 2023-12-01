import { ReactElement } from "react"
import { Box, Button, Card, Grid } from "@mui/material"
import { StyledTextField } from "../StyledComponents/StyledComponents"
import { SubmitHandler, useForm } from "react-hook-form"
import { Tiny } from "../Text/Text"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faExclamationCircle } from "@fortawesome/free-solid-svg-icons"
import useTitle from "../../hooks/useTitle"

type ChangePasswordFormProps = {
  oldPassword: string
  newPassword: string
  confirmNewPassword: string
}

const ChangePassword = (): ReactElement => {
  useTitle("Change Password")

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ChangePasswordFormProps>()

  const onSubmit: SubmitHandler<ChangePasswordFormProps> = (data: ChangePasswordFormProps) => {}

  return (
    <Box pt={2} pb={4}>
      <Grid item md={8} xs={12}>
        <Card sx={{ padding: 3, boxShadow: 2 }}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={3}>
              <Grid item sm={12} xs={12}>
                <StyledTextField
                  fullWidth
                  placeholder="Old Password"
                  {...register("oldPassword")}
                  error={Boolean(errors.oldPassword)}
                />
              </Grid>
              <Grid item sm={12} xs={12}>
                <StyledTextField
                  fullWidth
                  placeholder="New Password"
                  {...register("newPassword")}
                  error={Boolean(errors.newPassword)}
                />
                <Tiny color="text.disabled">
                  <FontAwesomeIcon icon={faExclamationCircle} /> password must contain a minimum of 8 characters
                </Tiny>
              </Grid>
              <Grid item sm={12} xs={12}>
                <StyledTextField
                  fullWidth
                  placeholder="Confirm New Password"
                  {...register("confirmNewPassword")}
                  error={Boolean(errors.confirmNewPassword)}
                />
              </Grid>

              <Grid item xs={12}>
                <Button type="submit" variant="contained">
                  Update password
                </Button>
              </Grid>
            </Grid>
          </form>
        </Card>
      </Grid>
    </Box>
  )
}

export default ChangePassword
