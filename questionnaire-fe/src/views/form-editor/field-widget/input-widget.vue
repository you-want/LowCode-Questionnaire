<template>
  <FormItem
    :form-item-props="widget.formItemProps"
    :widget="widget"
    :purpose="purpose"
  >
    <a-input
      v-bind="widget.nodeProps"
      :allow-clear="true"
      placeholder="请输入"
      v-model:value="formData[widget.key]"
      @change="inputChange"
    />
  </FormItem>
</template>

<script lang="ts">
import { defineComponent, computed, getCurrentInstance } from 'vue'
import FormItem from './form-item.vue'
import Common from './common'

export default defineComponent({
  name: 'InputWidget',
  components: { FormItem },
  props: {
    widget: { type: Object, default: () => {} },
    // render 渲染，csetting 组件设置，qsetting表单设置，drag 拖拽
    purpose: { type: String, default: 'render' }
  },
  setup (props, context) {
    const instance = getCurrentInstance()
    const { valueChange, getFormData } = Common(instance, props)
    const inputChange = (e: any) => {
      valueChange(e.target.value)
    }
    const formData: { [key: string]: any } = computed(getFormData)
    return {
      formData,
      inputChange
    }
  }
})
</script >

<style>
</style>
