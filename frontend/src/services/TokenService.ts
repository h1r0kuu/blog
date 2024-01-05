import api from "../http"
import { VERIFY_TOKEN } from "../constants/apiConstants"

export default class TokenService {
  static async verifyToken(token: string) {
    return await api.get(VERIFY_TOKEN(token))
  }
}
