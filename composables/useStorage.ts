export default function useStorage () {
  function getStorage(): Storage {
    return localStorage
  }

  function setItem(key: string, value: any) {
    localStorage.setItem(
      key,
      (typeof value === 'object')
        ? JSON.stringify(value)
        : value
    )
  }

  function getItem(key: string): any {
    const item = localStorage.getItem(key) ?? ''
    if (!item) return item
    try {
      return JSON.parse(item)
    } catch (error) {
      return item
    }
  }

  function removeItem(key: string) {
    localStorage.removeItem(key)
  }

  return { getStorage, setItem, getItem, removeItem }
}
