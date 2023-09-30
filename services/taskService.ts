import TaskController from '@/controllers/taskController'

export default class TaskService {
  static async select(id: string) {
    const { data } = await TaskController.select(id)
    return data
  }
}
