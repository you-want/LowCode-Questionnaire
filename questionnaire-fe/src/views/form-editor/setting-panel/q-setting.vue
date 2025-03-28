<template>
  <div class="q-setting">
    <FormRender
      ref="formRenderRef"
      :form-list="formList"
      :form-props="formProps"
      :purpose="'qsetting'"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive, ref } from 'vue'
import FormRender from '../form-render/index.vue'
import { QSettingFormFields, QSettingFormProps } from './formConfig'
import { useEditorHelpers } from '@/store/helpers/editorhelpers'

export default defineComponent({
  components: { FormRender },
  setup () {
    const formRenderRef = ref()
    const formList = ref(QSettingFormFields)
    const formProps = reactive(QSettingFormProps)
    const { getQSettingFormData, setQSettingFormData } = useEditorHelpers()
    onMounted(() => {
      const model: { [key: string]: any } = {}
      formList.value?.map((item: any) => {
        model[item.key] = getQSettingFormData.value[item.key] || item.nodeProps?.value || undefined
        delete item.nodeProps?.value
        return item
      })
      formProps.model = model
      setQSettingFormData(model)
    })
    return {
      formList,
      formProps,
      formRenderRef
    }
  }
})
</script>

<style lang="less" scoped>
.q-setting{
  padding: 0 16px 16px;
}
</style>
