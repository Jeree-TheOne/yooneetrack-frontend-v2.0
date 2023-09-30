export default async function (this: any, callback: () => Promise<void>, loadState = 'isLoading'): Promise<void> {
  this[loadState] = true

  try {
    return await callback()
  } finally {
    this[loadState] = false
  }
}
