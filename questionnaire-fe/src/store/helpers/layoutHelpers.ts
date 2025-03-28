import { useStore } from '@/store'

export const useMenuState = () => {
  const store = useStore()
  return {
    menu: store.state.layout.menu,
    toggleCollapsed: () => store.commit('layout/toggleCollapsed')
  }
}

export const useLayoutConfig = () => {
  const store = useStore()
  return store.state.layout
}
