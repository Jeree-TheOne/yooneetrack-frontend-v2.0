import StorageService from '@/services/storageService'
import AuthController from '@/controllers/authController'

export default class AuthService {
  static async login(loginData: { login: string, password: string }) {
    try {
      const { data } = await AuthController.login(loginData)
      StorageService.setItem('token', data.accessToken)

      return data
    } catch {}
  }

  static async register(registrationData: { email: string, password: string }) {
    const { data } = await AuthController.register(registrationData)
    return data
  }
}
