import { useStore } from '..'

export const useUserInfo = () => {
  const store = useStore()
  return {
    userInfo: store.state.user.userInfo,
    roleName: store.getters.roleName
  }
}
