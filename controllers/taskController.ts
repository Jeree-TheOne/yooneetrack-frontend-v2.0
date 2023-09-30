import axios, { AxiosResponse } from 'axios'
import Task from '@/models/Task'

export default class TaskController {
  static async select(id: string): Promise<AxiosResponse<Task>> {
    return await axios.get(`/task/${id}`)
  }
}
