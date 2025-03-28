<template>
  <div class="questionnaire">
    <template v-if="!isSubmit">
      <h2 class="title">
        {{ QSFormData.name }}
      </h2>
      <a-alert
        :message="QSFormData.note"
        type="info"
        class="info"
      />
      <FormRender
        ref="formRenderRef"
        :form-list="formList"
        :form-props="formProps"
        purpose="render"
        @submitData="submitData"
      />
    </template>
    <!-- 成功后 -->
    <a-result
      v-else
      status="success"
      :title="QSFormData.success_note"
      sub-title=""
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, unref, onUpdated, watch } from 'vue'
import { message } from 'ant-design-vue'
import { useRouter } from 'vue-router'
import FormRender from '@/views/form-editor/form-render/index.vue'
import { useEditorHelpers } from '@/store/helpers/editorhelpers'
import { questionTemplateGET, questionSubmit } from '@/api/editor'
import { getUser } from '@/utils/auth'

export default defineComponent({
  components: { FormRender },
  setup () {
    const {
      getDragFormProps,
      getQSettingFormData,
      getRenderFormData,
      setRenderFormData,
      setRelationData,
      setWidgetList
    } = useEditorHelpers()

    const formList = ref([])
    const formRenderRef = ref()
    const formProps = ref(getDragFormProps.value)
    const QSFormData = ref(getQSettingFormData.value)
    const tempalateData = ref({})
    const isSubmit = ref<boolean>(false)

    const router = useRouter()
    const { currentRoute } = router
    const route = unref(currentRoute)
    const query = route.query

    watch(getRenderFormData.value, (formData) => {
      formProps.value.model = formData
    })

    onMounted(() => {
      getQuestionTemplateGET()
    })
    onUpdated(() => {
    })
    // 获取模版
    const getQuestionTemplateGET = async () => {
      if (!query.id) return
      try {
        const data = {
          question_id: query.id
        }
        const res = await questionTemplateGET(data)
        const config = JSON.parse(res.config)
        //
        QSFormData.value = config.QSFormData || {}
        setRelationData(config.RSFormData || [])
        tempalateData.value = res
        //
        formList.value = config.components || []
        const model: { [key: string]: any } = {}
        formList.value?.map((item: any) => {
          model[item.key] = ''
          delete item.nodeProps?.value
          return item
        })
        // 组件列表回显
        setWidgetList(formList.value)
        if (config.FormProps) config.FormProps.model = model
        formProps.value = config.FormProps || getDragFormProps.value
        setRenderFormData(model)
      } catch (e) {
        console.error(e)
      }
    }
    // 提交数据
    const submitData = async (formData: any) => {
      for (const key in formData) {
        if (Array.isArray(formData[key])) {
          formData[key] = formData[key]?.join(',')
        }
      }
      try {
        const data = {
          question_id: query.id,
          username: getUser()?.username,
          workcode: getUser()?.workcode,
          department: getUser()?.department,
          form_data: JSON.stringify(formData)
        }
        await questionSubmit(data)
        message.success('提交成功！')
        isSubmit.value = true
      } catch (e) {
        console.error(e)
      }
    }
    return {
      formList,
      formRenderRef,
      formProps,
      QSFormData,
      isSubmit,
      submitData
    }
  }
})
</script>

<style lang="less">
.questionnaire {
  max-width: 888px;
  padding: 30px 50px;
  margin: auto;
  background: #fff;
  .info{
    margin: 30px auto;
  }
  .title {
    text-align: center;
    line-height: 50px;
    margin-bottom: 30px;
  }
}
</style>
