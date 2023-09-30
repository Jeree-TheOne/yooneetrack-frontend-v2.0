import WorkspaceController from '@/controllers/workspaceController'

export default class WorkspaceService {
  static async getAll() {
    const { data } = await WorkspaceController.getAll()
    return data
  }

  static async getOne(workspaceId: string) {
    const { data } = await WorkspaceController.getOne(workspaceId)
    return data
  }
}
