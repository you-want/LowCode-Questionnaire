/* token */
const TokenKey = 'Authorization'
const UserKey = 'userInfo'

export function getToken () {
  return localStorage.getItem(TokenKey)
}

export function setToken (token: string) {
  return localStorage.setItem(TokenKey, token)
}

export function removeToken () {
  return localStorage.removeItem(TokenKey)
}

export function getUser () {
  const userInfo: string | null = localStorage.getItem(UserKey)
  return userInfo && JSON.parse(userInfo)
}

export function getLimitUser () {
  const workcodes = []
  return workcodes
}

export function isLimitUser () {
  if (getLimitUser().includes(getUser()?.workcode)) return false
  return true
}
