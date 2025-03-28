<template>
  <FormItem
    :form-item-props="widget.formItemProps"
    :widget="widget"
    :purpose="purpose"
  >
    <a-radio-group
      v-bind="widget.nodeProps"
      :style="
        getDevice === 'H5' || widget.layout === 'vertical' ? groupStyle : {}
      "
      v-model:value="formData[widget.key]"
      @change="radioChange"
    >
      <!-- <a-radio
        :style="getDevice === 'H5' ? radioStyle : {}"
        v-for="item in widget.nodeProps.options"
        :key="item.value"
        v-bind="item"
      >
        {{ item.label }}
      </a-radio> -->
    </a-radio-group>
  </FormItem>
</template>

<script lang="ts">
import { defineComponent, reactive, computed, getCurrentInstance } from 'vue'
import FormItem from './form-item.vue'
import { useEditorHelpers } from '@/store/helpers/editorhelpers'
import Common from './common'

export default defineComponent({
  name: 'RadioWidget',
  components: { FormItem },
  props: {
    widget: { type: Object, default: () => {} },
    // render 渲染，setting 设置，drag 拖拽
    purpose: { type: String, default: 'render' }
  },
  setup (props) {
    const radioStyle = reactive({
      display: 'block',
      height: '30px',
      lineHeight: '30px'
    })

    const groupStyle = reactive({
      display: 'flex',
      flexDirection: 'column',
      gap: '8px'
    })

    const { getDevice } = useEditorHelpers()

    const instance = getCurrentInstance()
    const { valueChange, getFormData } = Common(instance, props)
    const radioChange = (e: any) => {
      valueChange(e.target.value)
    }
    const formData: { [key: string]: any } = computed(getFormData)
    return {
      formData,
      radioStyle,
      groupStyle,
      getDevice,
      radioChange
    }
  }
})
</script >

<style>
</style>
