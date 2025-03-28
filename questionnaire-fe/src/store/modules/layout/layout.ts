import { IMenuData } from '@/layouts/components/Menu'
import menus from './menus'
import layoutConfig from '@/layouts/layout.config'
import { MenuTheme } from 'ant-design-vue'

export type TMenuType = 'left' | 'top' | 'topLeft'
export interface IMenuState {
    collapsed: boolean,
    data: IMenuData[],
    subData: IMenuData[]
}
export interface ILayoutState {
  menu: IMenuState,
  breadcrumb: boolean,
  menuType: TMenuType,
  theme: MenuTheme,
  logo: boolean,
  footer: {
    show: boolean,
    text1: string,
    text2: string
  }
}

const state = {
  menu: {
    collapsed: false,
    data: menus,
    subData: []
  },
  ...layoutConfig
}
const mutations = {
  setMenuCollapsed (state: ILayoutState, isCollapsed: boolean) {
    state.menu.collapsed = isCollapsed
  },
  setMenuData (state: ILayoutState, data: IMenuData[]) {
    state.menu.data = data
  },
  setSubData (state: ILayoutState, data: IMenuData[]) {
    state.menu.subData = data
  },
  setMenuType (state: ILayoutState, menuType: TMenuType) {
    state.menuType = menuType
  },
  toggleCollapsed (state: ILayoutState) {
    state.menu.collapsed = !state.menu.collapsed
  }
}
const actions = {}
const getters = {}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
