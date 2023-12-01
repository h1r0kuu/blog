import * as yup from "yup"
import { ChangePasswordFormProps } from "../models/forms/ChangePasswordForm"
import { AuthRequest } from "../models/auth/AuthRequest"
import { RegistrationRequest } from "../models/registration/RegistrationRequest"

type ObjectShapeValues = yup.ObjectShape extends Record<string, infer V> ? V : never

export const changePasswordSchema: yup.ObjectSchema<ChangePasswordFormProps> = yup.object().shape({
  oldPassword: yup.string().required("Old password is required"),
  newPassword: yup.string().required("New password is required").min(8),
  confirmNewPassword: yup
    .string()
    .oneOf([yup.ref("newPassword")], "Passwords do not match.")
    .required("Confirm new password is required"),
})

export const authSchema: yup.ObjectSchema<AuthRequest> = yup.object().shape({
  username: yup.string().required("Username is required"),
  password: yup.string().required("Password is required"),
})

export const registrationSchema: yup.ObjectSchema<RegistrationRequest> = yup.object().shape({
  username: yup
    .string()
    .required("Username is required")
    .matches(
      /^[a-zA-Z0-9]{3,25}$/,
      "Use only letters (A-Z a-z) and numbers (0-9). Ensure the length is between 3 and 25 characters.",
    ),
  email: yup.string().required("Email is required").email(),
  password: yup.string().required("Password is required").min(8),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password")], "Passwords do not match.")
    .required("Confirm new password is required"),
  avatar: yup
    .mixed<FileList>()
    .test("fileSize", "The file is too large", (value) => {
      return value && value[0] && value[0].size <= 3000000
    })
    .test("type", "Only the following formats are accepted: .jpeg, .jpg, .png, .gif", (value) => {
      return (
        value &&
        (value[0]?.type == "image/jpeg" ||
          value[0]?.type == "image/jpg" ||
          value[0]?.type == "image/png" ||
          value[0]?.type == "image/gif")
      )
    }),
})
