import api from './api'
import Workspace from '@/models/Workspace'

export async function getAll() {
  try {
    const { data } = await await api.get<{id: string, name: string}[]>('/workspace')
    return data
  } catch {}
}

export async function getOne(workspaceId: string) {
  try {
    const { data } = await await api.get<Workspace>(`/workspace/${workspaceId}`)
    return data
  } catch {}
}
