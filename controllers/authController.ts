import axios, { AxiosResponse } from 'axios'
import LoginData from '@/models/LoginData'

export default class AuthController {
  static async login(loginData: { login: string, password: string }): Promise<AxiosResponse<LoginData>> {
    return await axios.post<LoginData>('/auth/login', loginData)
  }

  static async register(registrationData: { email: string, password: string }): Promise<AxiosResponse<LoginData>> {
    return await axios.post<LoginData>('/auth/registration', registrationData)
  }
}
