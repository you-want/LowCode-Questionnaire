export interface IUserInfo {
  name: string;
  role: number;
}
export interface IUserState {
  userInfo: IUserInfo,
  setUserInfo: (state: IUserState, userInfo: IUserState) => void,
  getters: {
    roleName: string
  }
}
export const ROLE_MAP:{[key: string]: string} = {
  1: '超级管理员'
}
const state = {
  userInfo: {
    name: '游客',
    role: '1'
  }
}
const getters = {
  roleName (state: IUserState) {
    return ROLE_MAP[state.userInfo.role]
  }
}
const mutations = {
  setUserInfo (state: IUserState, userInfo: IUserState) {
    state.userInfo = {
      ...state.userInfo,
      ...userInfo
    }
  }
}

export default {
  namespace: true,
  state,
  getters,
  mutations
}
