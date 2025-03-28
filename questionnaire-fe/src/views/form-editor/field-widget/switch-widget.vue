<template>
  <FormItem
    :form-item-props="widget.formItemProps"
    :widget="widget"
    :purpose="purpose"
  >
    <a-switch
      v-bind="widget.nodeProps"
      v-model:checked="formData[widget.key]"
      @change="switchChange"
    />
  </FormItem>
</template>

<script lang="ts">
import { defineComponent, computed, getCurrentInstance } from 'vue'
import FormItem from './form-item.vue'
import Common from './common'

export default defineComponent({
  name: 'SwitchWidget',
  components: { FormItem },
  props: {
    widget: { type: Object, default: () => {} },
    // render 渲染，setting 设置，drag 拖拽
    purpose: { type: String, default: 'render' }
  },
  setup (props) {
    const instance = getCurrentInstance()
    const { valueChange, getFormData } = Common(instance, props)
    const switchChange = (checked: boolean) => {
      valueChange(checked)
    }
    const formData: { [key: string]: any } = computed(getFormData)

    return {
      formData,
      switchChange
    }
  }
})
</script >

<style>

</style>
