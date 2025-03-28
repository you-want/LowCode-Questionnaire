<template>
  <a-layout class="form-editor">
    <a-layout-sider
      theme="light"
      width="276"
    >
      <WidgetPanel />
    </a-layout-sider>
    <a-layout-content class="editor-center">
      <a-layout-header class="layout-header">
        <EditorHeader @common="common" />
      </a-layout-header>
      <FormWidget />
    </a-layout-content>
    <a-layout-sider
      theme="light"
      width="300"
    >
      <SettingPanel />
    </a-layout-sider>
    <!-- 预览弹框 -->
    <PreviewModal ref="previewModalRef" />
  </a-layout>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref, unref } from 'vue'
import { mapGetters } from 'vuex'
import { useRouter } from 'vue-router'
import SettingPanel from './setting-panel/index.vue'
import WidgetPanel from './widget-panel/index.vue'
import FormWidget from './form-widget/index.vue'
import EditorHeader from './components/editor-header.vue'
import PreviewModal from './components/preview-modal.vue'
import { useEditorHelpers } from '@/store/helpers/editorhelpers'
import { questionTemplateGET, questionTemplatePATCH } from '@/api/editor'
import { message } from 'ant-design-vue'

export default defineComponent({
  components: {
    SettingPanel,
    WidgetPanel,
    FormWidget,
    EditorHeader,
    PreviewModal
  },
  props: {},
  computed: {
    ...mapGetters(['getWidgetList'])
  },
  setup () {
    const {
      getWidgetList,
      getQSettingFormData,
      getDragFormProps,
      getRelationData,
      setWidgetList,
      setQSettingFormData,
      setDragFormProps,
      clearWidgetList,
      setRelationData,
      setCSettingFormDataMap
    } = useEditorHelpers()

    const router = useRouter()
    const { currentRoute } = router
    const route = unref(currentRoute)
    const query = route.query

    const previewModalRef = ref()

    onMounted(() => {
      getQuestionTemplateGET()
    })
    const setVisiblePreview = () => {
      previewModalRef.value.setVisiblePreview()
    }
    // 获取模版
    const getQuestionTemplateGET = async () => {
      if (!query.id) return
      try {
        const data = {
          question_id: query.id
        }
        const res = await questionTemplateGET(data)
        const config = JSON.parse(res.config)
        // 组件列表回显
        setWidgetList(config.components || [])
        config.QSFormData && (config.QSFormData.name = res.name)
        // 表单设置
        setQSettingFormData(config.QSFormData || { name: res.name })
        // 关联数据设置
        setRelationData(config.RSFormData || [])
        // 组件表单设置
        config.FormProps && setDragFormProps(config.FormProps)
        // 组件设置回显
        const obj: any = {}
        config.components?.map((item: any) => {
          obj[item.key] = {
            label: item.formItemProps?.label,
            value: item.nodeProps?.value,
            // 字段校验
            rules: config.FormProps?.rules[item.key],
            required: !!config.FormProps?.rules[item.key],
            hidden: item.hidden === true,
            minlength: item.nodeProps?.minlength,
            maxlength: item.nodeProps?.maxlength,
            minRows: item.nodeProps?.autoSize?.minRows,
            showCount: item.nodeProps?.showCount,
            min: item.nodeProps?.min,
            max: item.nodeProps?.max,
            layout: item.layout
          }
          return item
        })
        setCSettingFormDataMap(obj)
      } catch (e) {
        console.error(e)
      }
    }
    // 编辑
    const editClick = async () => {
      if (!query.id) return
      try {
        const data = {
          question_id: query.id,
          name: getQSettingFormData.value.name,
          config: JSON.stringify({
            components: getWidgetList.value,
            QSFormData: getQSettingFormData.value,
            FormProps: getDragFormProps.value,
            RSFormData: getRelationData.value
          })
        }
        await questionTemplatePATCH(data)
        message.success('保存成功！')
      } catch (e) {
        console.error(e)
      }
    }
    const common = (param: any = {}) => {
      const objClick: { [key: string]: any } = {
        editClick: editClick,
        clearClick: clearWidgetList,
        previewClick: setVisiblePreview
      }
      objClick[param.flag]()
    }
    return {
      previewModalRef,
      common
    }
  }
})
</script>

<style lang="less" scoped>
.form-editor {
  height: 100%;
  .editor-center {
    height: 100%;
    .layout-header {
      background: #fff;
      padding: 0;
      height: 46px;
      line-height: 46px;
    }
  }
}
</style >
