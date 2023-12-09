import { Maybe } from "yup"

export type RegistrationRequest = {
  username: string
  email: string
  password: string
  confirmPassword: string
  avatar?: Maybe<FileList | undefined>
}
