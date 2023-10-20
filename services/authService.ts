import api from './api'
import LoginData from '@/models/LoginData'

const { setItem } = useStorage()

export async function login (loginData: { login: string, password: string }) {
  try {
    const { data } = await api.post<LoginData>('/auth/login', loginData)
    setItem('token', data.accessToken)

    return data
  } catch {}
}

export async function register(registrationData: { email: string, password: string }) {
  const { data } = await api.post<LoginData>('/auth/registration', registrationData)
  return data
}
