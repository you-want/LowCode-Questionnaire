import { computed } from 'vue'
import { useStore } from '@/store/index'
import { IWidget } from '@/store/modules/editor'

export const useEditorHelpers = () => {
  const store = useStore()

  return {
    widgetList: store.state.editor.widgetList,
    getDevice: computed(() => store.getters.getDevice),
    getWidgetList: computed(() => store.getters.getWidgetList),
    getDragFormProps: computed(() => store.getters.getDragFormProps),
    getSelectedWidget: computed(() => store.getters.getSelectedWidget),
    getCSettingFormData: computed(() => store.getters.getCSettingFormData),
    getQSettingFormData: computed(() => store.getters.getQSettingFormData),
    getDragFormData: computed(() => store.getters.getDragFormData),
    getRenderFormData: computed(() => store.getters.getRenderFormData),
    getCSettingFormDataMap: computed(() => store.getters.getCSettingFormDataMap),
    getRelationData: computed(() => store.getters.getRelationData),
    setDevice: (data: string) => store.commit('setDevice', data),
    copyNewWidget: (data: any) => store.commit('copyNewWidget', data),
    addNewWidget: (data: any) => store.commit('addNewWidget', data),
    setWidgetList: (data: IWidget[]) => store.commit('setWidgetList', data),
    setSelected: (data: any) => store.commit('setSelected', data),
    emitHistoryChange: () => store.commit('emitHistoryChange'),
    checkWidgetMove: (data: any) => store.commit('checkWidgetMove', data),
    clearSelected: () => store.commit('checkWidgetMove'),
    moveUpWidget: (data: number) => store.commit('moveUpWidget', data),
    moveDownWidget: (data: number) => store.commit('moveDownWidget', data),
    removeFieldWidget: (data: number) => store.commit('removeFieldWidget', data),
    copyFieldWidget: (data: number) => store.commit('copyFieldWidget', data),
    setSelectedWidget: (data: any) => store.commit('setSelectedWidget', data),
    setQSettingFormData: (data: any) => store.commit('setQSettingFormData', data),
    setRenderFormData: (data: any) => store.commit('setRenderFormData', data),
    setDragFormData: (data: any) => store.commit('setDragFormData', data),
    setDragFormProps: (data: any) => store.commit('setDragFormProps', data),
    setRelationData: (data: any) => store.commit('setRelationData', data),
    setCSettingFormDataMap: (data: any) => store.commit('setCSettingFormDataMap', data),
    clearWidgetList: () => store.commit('clearWidgetList')
  }
}
