<template>
  <div class="c-setting">
    <FormRender
      ref="formRenderRef"
      :form-list="formList"
      :form-props="formProps"
      purpose="csetting"
    />
    <OptionsSetting
      v-if="showOptionsSetting"
      :current-tag="currentTag"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref, watch } from 'vue'
import FormRender from '../form-render/index.vue'
import OptionsSetting from './components/optionsSetting.vue'
import { WidgetFormProps, WidgetMap } from './formConfig'
import { useEditorHelpers } from '@/store/helpers/editorhelpers'

export default defineComponent({
  components: { FormRender, OptionsSetting },
  setup () {
    const formList = ref([])
    const formRenderRef = ref()
    const formProps = reactive(WidgetFormProps)
    const showOptionsSetting = ref<boolean>(false)
    const currentTag = ref<string>('')

    const { getSelectedWidget, getCSettingFormDataMap } = useEditorHelpers()

    watch(getSelectedWidget, (SelectedWidget, prevSelectedWidget) => {
      if (SelectedWidget.key !== prevSelectedWidget.key) {
        formRenderRef.value?.resetFields()
        const selectedTag: string = SelectedWidget?.tag || ''
        const selectedKey: string = SelectedWidget?.key
        formList.value = WidgetMap[selectedTag]?.slice(0) || []
        //
        let model: { [key: string]: any } = {}
        if (getCSettingFormDataMap.value[selectedKey]) {
          model = getCSettingFormDataMap.value[selectedKey]
        } else {
          formList.value?.map((item: any) => {
            model[item.key] = item.nodeProps?.value || undefined
            delete item.nodeProps?.value
            return item
          })
        }
        formProps.model = model
        const tags = ['radio', 'checkbox', 'select']
        if (tags.includes(SelectedWidget.tag)) {
          showOptionsSetting.value = true
        } else {
          showOptionsSetting.value = false
        }
        currentTag.value = SelectedWidget.tag
      }
    })

    return {
      formList,
      formRenderRef,
      formProps,
      showOptionsSetting,
      currentTag
    }
  }
})
</script>

<style lang="less" scoped>
.c-setting {
  padding: 0 16px 16px;
}
</style>
