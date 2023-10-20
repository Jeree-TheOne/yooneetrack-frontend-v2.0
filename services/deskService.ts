import api from './api'
import Desk from '@/models/Desk'

export async function selectDesk (id: string) {
  try {
    const { data } = await api.get<Desk>(`/desk/${id}`)
    return data
  } catch {}
}
