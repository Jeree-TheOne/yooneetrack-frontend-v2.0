import axios, { AxiosResponse } from 'axios'

export default class DeskController {
  static async select(id: string): Promise<AxiosResponse<any>> {
    return await axios.get(`/desk/${id}`)
  }
}
