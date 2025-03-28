const components = [
  {
    tag: 'input',
    key: '', // 前端自动生成， question_id_xxxxx, 提交表单的值
    formItemProps: {
      label: '单行输入框的label', // 标题
      required: true // true/false 必填
    },
    nodeProps: {
      defaultValue: '默认内容', // 默认值
      maxlength: 50, // 最大长度
      minlength: 10, // 最小长度
      showCount: true // true/ false, 显示字数统计
    },
    error: [{
      type: 'number', // number/letter/number_letter/phone/email/website/no_chinese/only_chinese // 字段校验
      message: '请输入正确的数字' // 校验失败提示
    }],
    show: true // true/ false 隐藏
  },
  {
    tag: 'textarea',
    key: '', // 前端自动生成， question_id_xxxxx, 提交表单的值
    formItemProps: {
      label: '多行输入框的label', // 标题
      required: true // true/false 必填
    },
    nodeProps: {
      defaultValue: '默认内容', // 默认值
      maxlength: 50, // 最大长度
      minlength: 10, // 最小长度,
      autosize: { minRows: 2, maxRows: 6 }, // 自适应内容高度，可设置为 true | false 或对象：{ minRows: 2, maxRows: 6 }
      showCount: true // true/ false, 显示字数统计
    },
    error: [{
      type: 'number', // number/letter/number_letter/phone/email/website/no_chinese/only_chinese // 字段校验
      message: '请输入正确的数字' // 校验失败提示
    }],
    show: true // true/ false 隐藏
  },
  {
    tag: 'rate',
    key: '', // 前端自动生成， question_id_xxxxx, 提交表单的值
    formItemProps: {
      label: '评分的label', // 标题
      required: true // true/false 必填
    },
    nodeProps: {
      allowHalf: false, // 是否允许半选
      count: 5, // star 总数
      tooltips: ['不满意', '', '一般', '', '满意']
    },
    show: true // true/ false 隐藏
  },
  {
    tag: 'radio',
    key: '', // 前端自动生成， question_id_xxxxx, 提交表单的值
    formItemProps: {
      label: '单选项的label', // 标题
      required: true // true/false 必填
    },
    nodeProps: {
      options: [
        {
          label: '单选按钮1',
          value: 1,
          disabled: false
        },
        {
          label: '单选按钮2',
          value: 2,
          disabled: true
        },
        {
          label: '单选按钮3',
          value: 3,
          disabled: false
        }
      ]
    },
    layout: 'horizontal', // horizontal/vertical 排列方式
    show: true // true/ false 隐藏
  },
  {
    tag: 'checkbox',
    key: '', // 前端自动生成， question_id_xxxxx, 提交表单的值
    formItemProps: {
      label: '多选项的label', // 标题
      required: true // true/false 必填
    },
    nodeProps: {
      options: [
        {
          label: '多选按钮1',
          value: 1,
          disabled: false
        },
        {
          label: '多选按钮2',
          value: 2,
          disabled: true
        },
        {
          label: '多选按钮3',
          value: 3,
          disabled: false
        }
      ]
    },
    layout: 'horizontal', // horizontal/vertical 排列方式
    show: true // true/ false 隐藏
  },
  {
    tag: 'select',
    key: '', // 前端自动生成， question_id_xxxxx, 提交表单的值
    formItemProps: {
      label: '下拉的label', // 标题
      required: true // true/false 必填
    },
    nodeProps: {
      options: [
        {
          label: '下拉按钮1',
          value: 1,
          disabled: false
        },
        {
          label: '下拉按钮2',
          value: 2,
          disabled: true
        },
        {
          label: '下拉按钮3',
          value: 3,
          disabled: false
        }
      ]
    },
    show: true // true/ false 隐藏
  }
]

const formData = {}

export {
  components,
  formData
}
