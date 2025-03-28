<template>
  <div class="preview">
    <h2 class="title">
      {{ title }}
    </h2>
    <a-alert
      :message="getQSettingFormData.note"
      type="info"
      class="info"
    />
    <FormRender
      ref="formRenderRef"
      :form-list="formList"
      :form-props="formProps"
      purpose="render"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, reactive } from 'vue'
import FormRender from '@/views/form-editor/form-render/index.vue'
import { useEditorHelpers } from '@/store/helpers/editorhelpers'

export default defineComponent({
  components: { FormRender },
  setup () {
    const { getWidgetList, getDragFormProps, getQSettingFormData } =
      useEditorHelpers()

    const formList = ref(getWidgetList.value)
    const formRenderRef = ref()
    const formProps = reactive(getDragFormProps.value)
    const title = ref(getQSettingFormData.value.name)

    return {
      formList,
      formRenderRef,
      formProps,
      title,
      getQSettingFormData
    }
  }
})
</script>

<style lang="less">
.preview {
  width: 800px;
  padding: 30px 50px;
  margin: auto;
  .title {
    text-align: center;
    line-height: 50px;
    margin-bottom: 30px;
  }
  .info {
    margin: 30px auto;
  }
}
</style>
