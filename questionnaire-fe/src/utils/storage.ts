const getStorage = (isSeesion: boolean) => isSeesion ? sessionStorage : localStorage

export function getItem <T> (key: string, isSession: boolean = false): T | null {
  const storage = getStorage(isSession)
  if (!storage) return null
  const data = storage.getItem(key) || 'null'
  try {
    return JSON.parse(data) as T
  } catch (e) {
    return null
  }
}

export function setItem (key: string, value: object | string | null, isSession: boolean = false) {
  const storage = getStorage(isSession)
  if (!storage) return false
  if (typeof value === 'object') {
    value = JSON.stringify(value)
  }
  storage.setItem(key, value)
}

export function removeItem (key: string, isSession: boolean = false) {
  const storage = getStorage(isSession)
  if (!storage) return false
  storage.removeItem(key)
}

export function clearLocal (isSession: boolean = false) {
  const storage = getStorage(isSession)
  if (!storage) return false
  storage.clear()
}
