import { ReactElement } from "react"
import { Box, Button, Card, Grid, IconButton } from "@mui/material"
import { StyledTextField } from "../StyledComponents/StyledComponents"
import { SubmitHandler, useForm } from "react-hook-form"
import { Tiny } from "../Text/Text"
import useTitle from "../../hooks/useTitle"
import { ChangePasswordFormProps } from "../../models/forms/ChangePasswordForm"
import { yupResolver } from "@hookform/resolvers/yup"
import { changePasswordSchema } from "../../schemas/validationSchemas"
import { Error } from "@mui/icons-material"

const ChangePassword = (): ReactElement => {
  useTitle("Change Password")
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ChangePasswordFormProps>({
    resolver: yupResolver(changePasswordSchema),
  })
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
                  type="password"
                  placeholder="Old Password"
                  {...register("oldPassword")}
                  error={Boolean(errors.oldPassword)}
                  helperText={errors?.oldPassword?.message}
                />
              </Grid>
              <Grid item sm={12} xs={12}>
                <StyledTextField
                  fullWidth
                  type="password"
                  placeholder="New Password"
                  {...register("newPassword")}
                  error={Boolean(errors.newPassword)}
                  helperText={errors?.newPassword?.message}
                />
                <Tiny color="text.disabled">
                  <IconButton>
                    <Error /> password must contain a minimum of 8 characters
                  </IconButton>
                </Tiny>
              </Grid>
              <Grid item sm={12} xs={12}>
                <StyledTextField
                  fullWidth
                  type="password"
                  placeholder="Confirm New Password"
                  {...register("confirmNewPassword")}
                  error={Boolean(errors.confirmNewPassword)}
                  helperText={errors?.confirmNewPassword?.message}
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
