<template>
  <FormItem
    :form-item-props="widget.formItemProps"
    :widget="widget"
    :purpose="purpose"
  >
    <a-select
      v-bind="widget.nodeProps"
      :allow-clear="true"
      placeholder="请选择"
      v-model:value="formData[widget.key]"
      @change="selectChange"
    />
  </FormItem>
</template>

<script lang="ts">
import { defineComponent, computed, getCurrentInstance } from 'vue'
import FormItem from './form-item.vue'
import Common from './common'

export default defineComponent({
  name: 'SelectWidget',
  components: { FormItem },
  props: {
    widget: { type: Object, default: () => {} },
    // render 渲染，setting 设置，drag 拖拽
    purpose: { type: String, default: 'render' }
  },
  setup (props) {
    const instance = getCurrentInstance()
    const { valueChange, getFormData } = Common(instance, props)
    const selectChange = (value: any) => {
      valueChange(value)
    }
    const formData: { [key: string]: any } = computed(getFormData)

    return {
      formData,
      selectChange
    }
  }
})
</script >

<style>

</style>
