export interface IFormPropsType {
  model: object;
  rules: object;
  hideRequiredMark: boolean;
  labelAlign: 'left' | 'right';
  layout: 'horizontal' | 'vertical' | 'inline';
  labelCol: object;
  wrapperCol: object;
  colon: boolean;
  validateOnRuleChange: boolean;
  scrollToFirstError: boolean;
  name: string;
  validateTrigger: string | string[];
}

export interface IKeyValueType {
  [key:string]: any
}

export const FormProps: IFormPropsType = {
  model: {},
  rules: {},
  hideRequiredMark: false,
  labelAlign: 'right',
  layout: 'horizontal',
  labelCol: {},
  wrapperCol: {},
  colon: true,
  validateOnRuleChange: true,
  scrollToFirstError: true,
  name: '',
  validateTrigger: 'change'
}

export const QSettingFormFields = [
  {
    tag: 'input',
    tagName: '单行输入框',
    key: 'name',
    formItemProps: {
      label: '问卷标题'
    },
    nodeProps: {
      value: '容器问卷标题',
      maxlength: 50,
      minlength: 1
    },
    hidden: false
  },
  {
    tag: 'textarea',
    tagName: '多行输入框',
    key: 'note',
    formItemProps: {
      label: '问卷前置内容'
    },
    nodeProps: {
      value: '尊敬的问卷网用户您好，感谢您能抽几分钟时间参与本次答题。您的意见将有助于我们把问卷网变得更好，您的所有信息我们也将保密，仅作内部研究使用。现在，我们就马上开始吧！', // 默认值
      maxlength: 150,
      minlength: 10,
      autoSize: { minRows: 2, maxRows: 6 },
      showCount: true
    },
    hidden: false
  },
  {
    tag: 'textarea',
    tagName: '多行输入框',
    key: 'success_note',
    formItemProps: {
      label: '问卷提交后内容'
    },
    nodeProps: {
      value: '您已完成本次问卷，感谢您的帮助与支持',
      maxlength: 50,
      minlength: 1,
      autoSize: { minRows: 2, maxRows: 6 },
      showCount: true
    },
    hidden: false
  }
]

export const QSettingFormProps: IFormPropsType = {
  model: {},
  rules: {},
  hideRequiredMark: false,
  labelAlign: 'right',
  layout: 'vertical',
  labelCol: {
    span: 18
  },
  wrapperCol: {},
  colon: true,
  validateOnRuleChange: true,
  scrollToFirstError: true,
  name: '',
  validateTrigger: 'change'
}

export const WidgetFormProps: IFormPropsType = {
  model: {},
  rules: {
    // label: [
    //   { required: true, message: '请输入', trigger: 'change' }
    // ]
  },
  hideRequiredMark: false,
  labelAlign: 'right',
  layout: 'horizontal',
  labelCol: {
    span: 6
  },
  wrapperCol: {
    span: 18
  },
  colon: true,
  validateOnRuleChange: true,
  scrollToFirstError: true,
  name: '',
  validateTrigger: 'change'
}

export const rulesMap: IKeyValueType = {
  required: { required: true, message: '必填项', trigger: 'change' },
  array: { required: true, type: 'array', message: '必填项', trigger: 'change' },
  number: { required: true, type: 'number', message: '必填项', trigger: 'change' },
  letter: { required: true, type: 'string', message: '请输入正确的字符', trigger: 'change' },
  numberLetter: { required: true, type: 'string', message: '请输入正确的数字和字符', trigger: 'change' },
  phone: { required: true, type: 'string', message: '请输入正确的电话号码', trigger: 'change' },
  email: { required: true, type: 'email', message: '请输入正确的email', trigger: 'change' },
  website: { required: true, type: 'url', message: '请输入正确的网址', trigger: 'change' },
  noChinese: { required: true, type: 'string', message: '不可以输入中文', trigger: 'change' },
  onlyChinese: { required: true, type: 'string', message: '仅可以输入中文', trigger: 'change' }
}

export const rulesOptions: any[] = [
  // { label: '数字', value: rulesMap.number },
  { label: '字符', value: rulesMap.letter },
  // { label: '数字和字符', value: rulesMap.numberLetter },
  { label: '电话', value: rulesMap.phone },
  { label: '邮箱', value: rulesMap.email },
  { label: '网址', value: rulesMap.website }
  // { label: '非中文', value: rulesMap.noChinese },
  // { label: '仅中文', value: rulesMap.onlyChinese }
]

export const InputFormFields = [
  {
    tag: 'input',
    tagName: '单行输入框',
    key: 'label',
    formItemProps: {
      label: '标题'
    },
    nodeProps: {},
    hidden: false
  },
  {
    tag: 'input',
    tagName: '单行输入框',
    key: 'value',
    formItemProps: {
      label: '默认值'
    },
    nodeProps: {},
    hidden: false
  },
  // {
  //   tag: 'select',
  //   tagName: '选择框',
  //   key: 'rules',
  //   formItemProps: {
  //     label: '字段校验'
  //   },
  //   nodeProps: {
  //     options: rulesOptions
  //   },
  //   hidden: false // true/ false 隐藏
  // },
  // {
  //   tag: 'input',
  //   tagName: '单行输入框',
  //   key: 'help',
  //   formItemProps: {
  //     label: '检验提示'
  //   },
  //   nodeProps: {
  //   },
  //   hidden: false
  // },
  {
    tag: 'switch',
    tagName: '开关',
    key: 'required',
    formItemProps: {
      label: '必填'
    },
    nodeProps: {
      checkedChildren: '是',
      unCheckedChildren: '否'
    },
    hidden: false
  },
  {
    tag: 'switch',
    tagName: '开关',
    key: 'hidden',
    formItemProps: {
      label: '隐藏'
    },
    nodeProps: {
      checkedChildren: '是',
      unCheckedChildren: '否'
    },
    hidden: false
  },
  {
    tag: 'inputNumber',
    tagName: '数字输入框',
    key: 'minlength',
    formItemProps: {
      label: '最小长度'
    },
    nodeProps: {
    },
    hidden: false
  },
  {
    tag: 'inputNumber',
    tagName: '数字输入框',
    key: 'maxlength',
    formItemProps: {
      label: '最大长度'
    },
    nodeProps: {
    },
    hidden: false
  }
]

export const TextareaFormFields = [
  {
    tag: 'input',
    tagName: '单行输入框',
    key: 'label',
    formItemProps: {
      label: '标题'
    },
    nodeProps: {},
    hidden: false
  },
  {
    tag: 'input',
    tagName: '单行输入框',
    key: 'value',
    formItemProps: {
      label: '默认值'
    },
    nodeProps: {},
    hidden: false
  },
  // {
  //   tag: 'select',
  //   tagName: '选择框',
  //   key: 'rules',
  //   formItemProps: {
  //     label: '字段校验'
  //   },
  //   nodeProps: {
  //     options: rulesOptions
  //   },
  //   hidden: false // true/ false 隐藏
  // },
  // {
  //   tag: 'input',
  //   tagName: '单行输入框',
  //   key: 'help',
  //   formItemProps: {
  //     label: '检验提示'
  //   },
  //   nodeProps: {
  //   },
  //   hidden: false
  // },
  {
    tag: 'inputNumber',
    tagName: '数字输入框',
    key: 'minRows',
    formItemProps: {
      label: '行数'
    },
    nodeProps: {
      min: 2,
      max: 6
    },
    hidden: false
  },
  {
    tag: 'switch',
    tagName: '开关',
    key: 'required',
    formItemProps: {
      label: '必填'
    },
    nodeProps: {
      checkedChildren: '是',
      unCheckedChildren: '否'
    },
    hidden: false
  },
  {
    tag: 'switch',
    tagName: '开关',
    key: 'hidden',
    formItemProps: {
      label: '隐藏'
    },
    nodeProps: {
      checkedChildren: '是',
      unCheckedChildren: '否'
    },
    hidden: false
  },
  {
    tag: 'inputNumber',
    tagName: '数字输入框',
    key: 'minlength',
    formItemProps: {
      label: '最小长度'
    },
    nodeProps: {
      min: 0
    },
    hidden: false
  },
  {
    tag: 'inputNumber',
    tagName: '数字输入框',
    key: 'maxlength',
    formItemProps: {
      label: '最大长度'
    },
    nodeProps: {
      min: 0
    },
    hidden: false
  },
  {
    tag: 'switch',
    tagName: '开关',
    key: 'showCount',
    formItemProps: {
      label: '显示字数'
    },
    nodeProps: {
      checkedChildren: '是',
      unCheckedChildren: '否'
    },
    hidden: false
  }
]

export const InputNumberFormFields = [
  {
    tag: 'input',
    tagName: '单行输入框',
    key: 'label',
    formItemProps: {
      label: '标题'
    },
    nodeProps: {},
    hidden: false
  },
  {
    tag: 'inputNumber',
    tagName: '数字输入框',
    key: 'value',
    formItemProps: {
      label: '默认值'
    },
    nodeProps: {},
    hidden: false
  },
  {
    tag: 'switch',
    tagName: '开关',
    key: 'required',
    formItemProps: {
      label: '必填'
    },
    nodeProps: {
      checkedChildren: '是',
      unCheckedChildren: '否'
    },
    hidden: false
  },
  {
    tag: 'switch',
    tagName: '开关',
    key: 'hidden',
    formItemProps: {
      label: '隐藏'
    },
    nodeProps: {
      checkedChildren: '是',
      unCheckedChildren: '否'
    },
    hidden: false
  },
  {
    tag: 'inputNumber',
    tagName: '数字输入框',
    key: 'min',
    formItemProps: {
      label: '最小值'
    },
    nodeProps: {
      min: 0
    },
    hidden: false
  },
  {
    tag: 'inputNumber',
    tagName: '数字输入框',
    key: 'max',
    formItemProps: {
      label: '最大值'
    },
    nodeProps: {
      min: 0
    },
    hidden: false
  }
]

export const RadioFormFields = [
  {
    tag: 'input',
    tagName: '单行输入框',
    key: 'label',
    formItemProps: {
      label: '标题'
    },
    nodeProps: {},
    hidden: false
  },
  {
    tag: 'radio',
    tagName: '选择框',
    key: 'layout',
    formItemProps: {
      label: '排列方式'
    },
    nodeProps: {
      options: [
        {
          label: '水平',
          value: 'horizontal'
        },
        {
          label: '垂直',
          value: 'vertical'
        }
      ]
    },
    hidden: false
  },
  {
    tag: 'switch',
    tagName: '开关',
    key: 'required',
    formItemProps: {
      label: '必填'
    },
    nodeProps: {
      checkedChildren: '是',
      unCheckedChildren: '否'
    },
    hidden: false
  },
  {
    tag: 'switch',
    tagName: '开关',
    key: 'hidden',
    formItemProps: {
      label: '隐藏'
    },
    nodeProps: {
      checkedChildren: '是',
      unCheckedChildren: '否'
    },
    hidden: false
  }
]

export const CheckboxFormFields = [
  {
    tag: 'input',
    tagName: '单行输入框',
    key: 'label',
    formItemProps: {
      label: '标题'
    },
    nodeProps: {},
    hidden: false
  },
  {
    tag: 'radio',
    tagName: '选择框',
    key: 'layout',
    formItemProps: {
      label: '排列方式'
    },
    nodeProps: {
      options: [
        {
          label: '水平',
          value: 'horizontal'
        },
        {
          label: '垂直',
          value: 'vertical'
        }
      ]
    },
    hidden: false
  },
  {
    tag: 'switch',
    tagName: '开关',
    key: 'required',
    formItemProps: {
      label: '必填'
    },
    nodeProps: {
      checkedChildren: '是',
      unCheckedChildren: '否'
    },
    hidden: false
  },
  {
    tag: 'switch',
    tagName: '开关',
    key: 'hidden',
    formItemProps: {
      label: '隐藏'
    },
    nodeProps: {
      checkedChildren: '是',
      unCheckedChildren: '否'
    },
    hidden: false
  }
]

export const SelectFormFields = [
  {
    tag: 'input',
    tagName: '单行输入框',
    key: 'label',
    formItemProps: {
      label: '标题'
    },
    nodeProps: {
      value: '选择框'
    },
    hidden: false
  },
  {
    tag: 'switch',
    tagName: '开关',
    key: 'required',
    formItemProps: {
      label: '必填'
    },
    nodeProps: {
      checkedChildren: '是',
      unCheckedChildren: '否'
    },
    hidden: false
  },
  {
    tag: 'switch',
    tagName: '开关',
    key: 'hidden',
    formItemProps: {
      label: '隐藏'
    },
    nodeProps: {
      checkedChildren: '是',
      unCheckedChildren: '否'
    },
    hidden: false
  }
]

export const RateFormFields = [
  {
    tag: 'input',
    tagName: '单行输入框',
    key: 'label',
    formItemProps: {
      label: '标题'
    },
    nodeProps: {},
    hidden: false
  },
  // {
  //   tag: 'input',
  //   tagName: '单行输入框',
  //   key: 'options',
  //   formItemProps: {
  //     label: '选项'
  //   },
  //   nodeProps: {
  //   },
  //   hidden: false
  // },
  {
    tag: 'inputNumber',
    tagName: '单行输入框',
    key: 'value',
    formItemProps: {
      label: '默认值'
    },
    nodeProps: {
      min: 0,
      max: 5
    },
    hidden: false
  },
  {
    tag: 'switch',
    tagName: '开关',
    key: 'required',
    formItemProps: {
      label: '必填'
    },
    nodeProps: {
      checkedChildren: '是',
      unCheckedChildren: '否'
    },
    hidden: false
  },
  {
    tag: 'switch',
    tagName: '开关',
    key: 'hidden',
    formItemProps: {
      label: '隐藏'
    },
    nodeProps: {
      checkedChildren: '是',
      unCheckedChildren: '否'
    },
    hidden: false
  }
]

export const WidgetMap: IKeyValueType = {
  input: InputFormFields,
  textarea: TextareaFormFields,
  inputNumber: InputNumberFormFields,
  radio: RadioFormFields,
  checkbox: CheckboxFormFields,
  select: SelectFormFields,
  rate: RateFormFields
}
