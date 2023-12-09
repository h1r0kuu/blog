import * as yup from "yup"
import { ChangePasswordFormProps } from "../models/forms/ChangePasswordForm"
import { AuthRequest } from "../models/auth/AuthRequest"
import { RegistrationRequest } from "../models/registration/RegistrationRequest"
import { ChangeGeneralSettingsForm } from "../models/forms/ChangeGeneralSettingsForm"
import { IMAGE_TYPES, MAX_IMAGE_SIZE } from "../constants/appConstants"

const validateImage = (required: boolean) => {
  return yup
    .mixed<FileList>()
    .test("fileSize", "The file is too large", (value) => {
      if (value != null && value[0] != null) {
        return value[0] && value[0].size <= MAX_IMAGE_SIZE
      } else {
        return !required
      }
    })
    .test("type", "Only the following formats are accepted: .jpeg, .jpg, .png, .gif", (value) => {
      if (value != null && value[0] != null) {
        return IMAGE_TYPES.includes(value[0].type)
      } else {
        return !required
      }
    })
}

export const changePasswordSchema: yup.ObjectSchema<ChangePasswordFormProps> = yup.object().shape({
  oldPassword: yup.string().required("Old password is required"),
  newPassword: yup.string().required("New password is required").min(8),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("newPassword")], "Passwords do not match.")
    .required("Confirm new password is required"),
})

export const changeGeneralSchema: yup.ObjectSchema<ChangeGeneralSettingsForm> = yup.object().shape({
  username: yup
    .string()
    .matches(
      /^[a-zA-Z0-9]{3,25}$/,
      "Use only letters (A-Z a-z) and numbers (0-9). Ensure the length is between 3 and 25 characters.",
    ),
  about: yup.string(),
  email: yup.string().email(),
  avatar: validateImage(false),
  cover: validateImage(false),
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
  avatar: validateImage(true),
})
