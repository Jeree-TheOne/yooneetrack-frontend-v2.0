import DeskController from '@/controllers/deskController'

export default class DeskService {
  static async select(id: string) {
    try {
      const { data } = await DeskController.select(id)
      return data
    } catch {}
  }
}
