<template>
  <FormItem
    :form-item-props="widget.formItemProps"
    :widget="widget"
    :purpose="purpose"
  >
    <a-textarea
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
  name: 'TextareaWidget',
  components: { FormItem },
  props: {
    widget: { type: Object, default: () => {} },
    // render 渲染，setting 设置，drag 拖拽
    purpose: { type: String, default: 'render' }
  },
  setup (props) {
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
