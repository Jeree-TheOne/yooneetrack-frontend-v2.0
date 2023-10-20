import api from './api'
import { WallItem } from 'models/Wall'
import Task from '@/models/Task'

export async function selectTask (id: string) {
  try {
    const { data } = await api.get<Task>(`/task/${id}`)
    return data
  } catch {}
}

export async function getWall (id: string) {
  try {
    const { data } = await api.get<WallItem[]>(`/task/wall/${id}`)
    return data
  } catch {}
}
