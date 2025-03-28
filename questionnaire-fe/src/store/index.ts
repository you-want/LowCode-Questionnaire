import { createStore, Store, useStore as defaultUseStore } from 'vuex'
import { InjectionKey } from 'vue'
import common from './modules/common'
import layout, { ILayoutState } from './modules/layout/layout'
import user, { IUserState } from './modules/user'
import editor, { IEditorState } from './modules/editor'

export interface IStore {
  layout: ILayoutState;
  user: IUserState;
  editor: IEditorState;
}

export const key: InjectionKey<Store<IStore>> = Symbol('')

export function useStore () {
  return defaultUseStore(key)
}

export default createStore<IStore>({
  modules: {
    layout,
    user,
    editor,
    common
  }
})
