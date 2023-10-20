import axios from 'axios'
import LoginData from '@/models/LoginData'
import API from '@/settings'

const { getItem, setItem, removeItem } = useStorage()

const api = axios.create({
  baseURL: API.DOMAIN,
  withCredentials: true
})

api.interceptors.request.use(config => {
  config.headers.workspace = getItem('workspace')

  const token = getItem('token')
  if (token) config.headers.Authorization = `Bearer ${token}`

  return config
}, error => {
  return Promise.reject(error)
})

api.interceptors.response.use((config): any => {
  return config
}, async error => {
  const originalRequest = error.config
  if (error.response.status === 401 && error.config && error.response.data.message !== 'EXPIRED_TOKEN') {
    await refreshToken()
    api(originalRequest)
    return
  }

  if (error.response.status === 401 && error.response.data.message === 'EXPIRED_TOKEN') removeAuthorization()

  if (error.response.data.message === 'UNAVAILABLE_WORKSPACE') window.location.replace(process.env.CLIENT_URL + '/workspaces')
  throw error
})

const { refreshToken, removeAuthorization } = (function () {
  let subscribers = [] as Array<any>
  let isRefreshing = false

  const refreshToken = () => {
    if (!isRefreshing) {
      isRefreshing = true
      return doRefresh()
    }

    return new Promise(resolve => subscribers.push(resolve))
  }

  const doRefresh = async () => {
    try {
      const { data } = await axios.post<LoginData>('auth/refresh')
      if (data) isRefreshing = false

      setItem('token', data.accessToken)

      subscribers.forEach(resolveSubscription => resolveSubscription(data))

      return data
    } catch {
      removeAuthorization()
    } finally {
      subscribers = []
    }
  }

  function removeAuthorization() {
    window.location.replace(process.env.CLIENT_URL + '/login')

    removeItem('token')
  }

  return { refreshToken, removeAuthorization }
})()

export default api
