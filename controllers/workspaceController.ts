import axios, { AxiosResponse } from 'axios'
import Workspace from '@/models/Workspace'

export default class AuthController {
  static async getAll(): Promise<AxiosResponse<{id: string, name: string}[]>> {
    return await axios.get('/workspace')
  }

  static async getOne(workspaceId: string): Promise<AxiosResponse<Workspace>> {
    return await axios.get(`/workspace/${workspaceId}`)
  }
}
