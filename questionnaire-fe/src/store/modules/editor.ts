import { rulesMap } from '@/views/form-editor/setting-panel/formConfig'
import _ from 'lodash'
import { getRandomCode } from '@/utils/utils'

interface IFormItemProps {
  label: string;
  rules?: object | object[];
  help?: string;
  required?: boolean;
}

interface INodeProps {
  value?: any;
  maxlength?: number;
  minlength?: number;
  showCount?: boolean;
  options?: object;
  min?: number;
  max?: number;
  autoSize?: any
}
export interface IWidget {
  tag: string;
  tagName: string;
  key: string;
  formItemProps: IFormItemProps;
  nodeProps: INodeProps;
  hidden?: boolean;
  layout?: string
}
export interface IEditorState {
  device: string;
  widgetList: IWidget[];
  dragFormProps: any;
  newWidget: IWidget;
  dragFormData: any;
  renderFormData: any;
  cSettingFormData: any;
  qSettingFormData: any;
  cSettingFormDataMap: any;
  selectedWidget: IWidget;
  relationData: any[];
  formConfig: object;
}

const state = {
  device: 'PC', // PC H5
  widgetList: [],
  dragFormProps: {
    model: {},
    rules: {},
    layout: 'vertical',
    labelCol: { span: 20 },
    wrapperCol: { span: 20 }
  },
  newWidget: {},
  dragFormData: {},
  renderFormData: {},
  cSettingFormData: {}, // 组件设置的 formData
  qSettingFormData: {
    name: '容器问卷标题',
    note:
      '尊敬的问卷网用户您好，感谢您能抽几分钟时间参与本次答题。您的意见将有助于我们把问卷网变得更好，您的所有信息我们也将保密，仅作内部研究使用。现在，我们就马上开始吧！',
    success_note: '您已完成本次问卷，感谢您的帮助与支持！'
  }, // 表单设置的 formData
  cSettingFormDataMap: {}, // 组件设置的 formData map
  selectedWidget: {},
  relationData: [], // 关联规则
  formConfig: { cssCode: '' }
}

const getters = {
  getDevice (state: IEditorState) {
    return state.device
  },
  getWidgetList (state: IEditorState) {
    return state.widgetList
  },
  getDragFormProps (state: IEditorState) {
    return state.dragFormProps
  },
  getSelectedWidget (state: IEditorState) {
    return state.selectedWidget
  },
  getCSettingFormData (state: IEditorState) {
    return state.cSettingFormData
  },
  getQSettingFormData (state: IEditorState) {
    return state.qSettingFormData
  },
  getDragFormData (state: IEditorState) {
    return state.dragFormData
  },
  getRenderFormData (state: IEditorState) {
    return state.renderFormData
  },
  getCSettingFormDataMap (state: IEditorState) {
    return state.cSettingFormDataMap
  },
  getRelationData (state: IEditorState) {
    return state.relationData
  }
}

const actions = {}

const mutations = {
  setDevice (state: IEditorState, device: string) {
    state.device = device
  },
  copyNewWidget (state: IEditorState, newWidget: any) {
    state.newWidget = newWidget
    mutations.setSelected(state, newWidget)
  },
  addNewWidget (state: IEditorState, newWidget: any) {
    state.widgetList.push(newWidget)
    mutations.setSelected(state, newWidget)
    //
    state.dragFormData[newWidget.key] = ''
    state.dragFormProps.model[newWidget.key] = ''
  },
  setWidgetList (state: IEditorState, data: IWidget[] = []) {
    if (data.length > 0) {
      state.widgetList = data
    }
  },
  // 来源：1、新增的时候；2、手动点击的时候；3、移除；4、复制（逻辑点特殊，formData自行处理）
  setSelected (state: IEditorState, selected: any, flag?: string) {
    // 优先保存上一个组件设置内容
    let key: string = state.selectedWidget?.key
    if (key) state.cSettingFormDataMap[key] = _.cloneDeep(state.cSettingFormData)
    // 最后一个可能没有保存上，看看有影像不
    // 当前回显组件设置
    if (flag !== 'copy') {
      key = selected?.key // 当前选择的key
      const formData = state.cSettingFormDataMap[key] // 当前选择key存储过数据
      mutations.setCSettingFormData(state, formData)
    }
    //
    state.selectedWidget = selected
  },
  clearSelected () { },
  emitHistoryChange () { },
  checkWidgetMove (state: IEditorState, evt: any) {
    return true
  },
  moveUpWidget (state: IEditorState, indexOfParentList: number) {
    if (state.widgetList.length > 0) {
      const tempWidget = _.cloneDeep(state.widgetList[indexOfParentList])
      state.widgetList.splice(indexOfParentList, 1)
      state.widgetList.splice(indexOfParentList - 1, 0, tempWidget)
    }
  },
  moveDownWidget (state: IEditorState, indexOfParentList: number) {
    if (state.widgetList.length > 0) {
      const tempWidget = _.cloneDeep(state.widgetList[indexOfParentList])
      state.widgetList.splice(indexOfParentList, 1)
      state.widgetList.splice(indexOfParentList + 1, 0, tempWidget)
    }
  },
  removeFieldWidget (state: IEditorState, indexOfParentList: number) {
    if (state.widgetList.length > 0) {
      let nextSelected: any = {}
      delete state.dragFormData[state.widgetList[indexOfParentList].key]
      delete state.dragFormProps.model[state.widgetList[indexOfParentList].key]
      if (state.widgetList.length === 1) {
        state.widgetList = []
      } else if (indexOfParentList === state.widgetList.length - 1) {
        nextSelected = _.cloneDeep(state.widgetList[indexOfParentList - 1])
        state.widgetList.splice(indexOfParentList, 1)
      } else {
        nextSelected = _.cloneDeep(state.widgetList[indexOfParentList + 1])
        state.widgetList.splice(indexOfParentList, 1)
      }
      mutations.setSelected(state, nextSelected)
    }
  },
  copyFieldWidget (state: IEditorState, indexOfParentList: number) {
    if (state.widgetList.length > 0) {
      const nextSelected = _.cloneDeep(state.widgetList[indexOfParentList])
      // 复制的 formData 特殊，在自己逻辑里边单独处理
      // 组件内容也要复制
      const formData = _.cloneDeep(state.cSettingFormDataMap[nextSelected?.key])
      mutations.setCSettingFormData(state, formData)
      // 复制旧的 校验
      const rules = _.cloneDeep(state.dragFormProps.rules[nextSelected?.key] || {})
      //
      nextSelected.key = getRandomCode(5)
      // 每次组件设置保存到总map里边
      const key: string = nextSelected?.key
      if (key) state.cSettingFormDataMap[key] = _.cloneDeep(formData)
      // 给新的也加上 校验
      state.dragFormProps.rules[key] = rules
      //
      state.dragFormData[nextSelected.key] = ''
      state.dragFormProps.model[nextSelected.key] = ''
      state.widgetList.splice(indexOfParentList + 1, 0, nextSelected)
      mutations.setSelected(state, nextSelected, 'copy')
    }
  },
  setSelectedWidget (state: IEditorState, data: any) {
    if (!state.selectedWidget) return
    const {
      label,
      value,
      rules,
      help,
      required,
      hidden,
      maxlength,
      minlength,
      showCount,
      options,
      layout,
      max,
      min,
      minRows
    } = data
    // formItemProps 设置
    if (label !== undefined) { state.selectedWidget.formItemProps.label = data.label }
    if (rules !== undefined) {
      // state.selectedWidget.formItemProps.rules = data.rules
      state.dragFormProps.rules[state.selectedWidget.key] = rules
    }
    if (help !== undefined) state.selectedWidget.formItemProps.help = data.help
    if (required === true || required === false) {
      const numberValue = ['inputNumber', 'rate']
      const arrayValue = ['checkbox']
      let rule = rulesMap.required
      if (required === true) {
        if (numberValue.includes(state.selectedWidget.tag)) {
          rule = rulesMap.number
        } else if (arrayValue.includes(state.selectedWidget.tag)) {
          rule = rulesMap.array
        }
        state.dragFormProps.rules[state.selectedWidget.key] = rule
      } else {
        delete state.dragFormProps.rules[state.selectedWidget.key]
      }
      // state.selectedWidget.formItemProps.required = data.required
    }
    // nodeProps 设置
    if (value !== undefined) {
      state.selectedWidget.nodeProps.value = data.value
      state.dragFormData[state.selectedWidget.key] = value
      state.dragFormProps.model[state.selectedWidget.key] = value
    }
    if (maxlength !== undefined) { state.selectedWidget.nodeProps.maxlength = data.maxlength }
    if (minlength !== undefined) { state.selectedWidget.nodeProps.minlength = data.minlength }
    if (max !== undefined) { state.selectedWidget.nodeProps.max = max }
    if (min !== undefined) { state.selectedWidget.nodeProps.min = min }
    if (minRows !== undefined) {
      state.selectedWidget.nodeProps.autoSize.minRows = minRows
    }
    if (showCount === true || showCount === false) {
      state.selectedWidget.nodeProps.showCount = data.showCount
    }
    if (options) {
      state.selectedWidget.nodeProps.options = data.options
    }
    if (layout) state.selectedWidget.layout = layout
    // 其他的 设置
    if (hidden === true || hidden === false) {
      state.selectedWidget.hidden = data.hidden
    }
    // 保存当前设置表单的数据
    mutations.setCSettingFormData(
      state,
      Object.assign(state.cSettingFormData, data)
    )
    // 每次组件设置保存到总map里边
    const key: string = state.selectedWidget.key
    if (key) state.cSettingFormDataMap[key] = _.cloneDeep(state.cSettingFormData)
    //
    console.info(
      '组件设置数据：',
      state.cSettingFormData,
      state.selectedWidget,
      state.dragFormData
    )
  },
  setCSettingFormDataMap (state: IEditorState, data: any) {
    state.cSettingFormDataMap = data
  },
  setCSettingFormData (state: IEditorState, data: any) {
    state.cSettingFormData = data || {}
  },
  setQSettingFormData (state: IEditorState, data: any) {
    state.qSettingFormData = Object.assign(state.qSettingFormData, data)
  },
  setRenderFormData (state: IEditorState, data: any) {
    state.renderFormData = Object.assign(state.renderFormData, data)
    state.dragFormProps.model = state.renderFormData
  },
  setDragFormData (state: IEditorState, data: any) {
    state.dragFormData = Object.assign(state.dragFormData, data)
    state.dragFormProps.model = state.dragFormData
  },
  setDragFormProps (state: IEditorState, data: any) {
    state.dragFormProps = data
  },
  clearWidgetList (state: IEditorState) {
    state.widgetList = []
    // state.newWidget = {}
    state.dragFormData = {}
    state.dragFormProps.model = {}
    state.cSettingFormData = {}
    // state.selectedWidget = {}
  },
  setRelationData (state: IEditorState, data: any) {
    state.relationData = data
  }
}

export default {
  namespace: true,
  state,
  getters,
  actions,
  mutations
}
