import User from '@/models/User'

export default interface LoginData {
  accessToken: string;
  refreshToken: string;
  user: User;
}
