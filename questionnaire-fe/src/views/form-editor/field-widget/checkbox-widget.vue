<template>
  <FormItem
    :form-item-props="widget.formItemProps"
    :widget="widget"
    :purpose="purpose"
  >
    <a-checkbox-group
      v-bind="widget.nodeProps"
      :style="
        getDevice === 'H5' || widget.layout === 'vertical' ? groupStyle : {}
      "
      v-model:value="formData[widget.key]"
      @change="checkboxChange"
    />
  </FormItem>
</template>

<script lang="ts">
import { defineComponent, reactive, computed, getCurrentInstance } from 'vue'
import FormItem from './form-item.vue'
import { useEditorHelpers } from '@/store/helpers/editorhelpers'
import Common from './common'

export default defineComponent({
  name: 'CheckboxWidget',
  components: { FormItem },
  props: {
    widget: { type: Object, default: () => {} },
    // render 渲染，setting 设置，drag 拖拽
    purpose: { type: String, default: 'render' }
  },
  setup (props) {
    const groupStyle = reactive({
      display: 'flex',
      flexDirection: 'column',
      gap: '8px'
    })

    const { getDevice } = useEditorHelpers()

    const instance = getCurrentInstance()
    const { valueChange, getFormData } = Common(instance, props)
    const checkboxChange = (checkedValue: any) => {
      valueChange(checkedValue)
    }
    const formData: { [key: string]: any } = computed(getFormData)
    return {
      formData,
      groupStyle,
      getDevice,
      checkboxChange
    }
  }
})
</script >

<style>
</style>
