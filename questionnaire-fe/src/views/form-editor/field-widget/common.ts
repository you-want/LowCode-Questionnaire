import {} from 'vue'
import _ from 'lodash'
import { useEditorHelpers } from '@/store/helpers/editorhelpers'
// import { rulesMap } from '@/views/form-editor/setting-panel/formConfig'

// render 渲染，csetting 组件设置，qsetting表单设置，drag 拖拽

export default function (instance: any, props: any): any {
  // console.log('common', instance, props)
  const {
    setSelectedWidget,
    getCSettingFormData,
    getQSettingFormData,
    getRenderFormData,
    getDragFormData,
    setQSettingFormData,
    setRenderFormData,
    setDragFormData
  } = useEditorHelpers()

  // 节流
  const _throttle = _.throttle((value: any) => {
    if (props.purpose === 'csetting') {
      // if (props.widget.key === 'rules') {
      //   value = rulesMap[value]
      // }
      setSelectedWidget({ [props.widget.key]: value })
    }
    if (props.purpose === 'qsetting') {
      setQSettingFormData({ [props.widget.key]: value })
    }
    if (props.purpose === 'render') {
      setRenderFormData({ [props.widget.key]: value })
    }
    if (props.purpose === 'drag') {
      setDragFormData({ [props.widget.key]: value })
    }
  }, 1000)

  const valueChange = (value: any) => {
    _throttle(value)
  }
  const getFormData = () => {
    if (props.purpose === 'csetting') return getCSettingFormData.value
    else if (props.purpose === 'qsetting') return getQSettingFormData.value
    else if (props.purpose === 'render') return getRenderFormData.value
    else if (props.purpose === 'drag') return getDragFormData.value
    else return {}
  }
  return {
    valueChange,
    getFormData
  }
}
