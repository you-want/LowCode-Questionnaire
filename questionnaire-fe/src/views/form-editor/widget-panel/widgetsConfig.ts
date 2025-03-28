export const BasicFields = [
  {
    tag: 'input',
    tagName: '单行输入框',
    key: '', // 前端自动生成， question_id_xxxxx, 提交表单的值
    formItemProps: {
      label: '单行输入框的label' // 标题
    },
    nodeProps: {
      value: '' // 默认值
    },
    hidden: false // true/ false 隐藏
  },
  {
    tag: 'textarea',
    tagName: '多行输入框',
    key: '', // 前端自动生成， question_id_xxxxx, 提交表单的值
    formItemProps: {
      label: '多行输入框的label' // 标题
    },
    nodeProps: {
      value: '', // 默认值
      autoSize: { minRows: 2, maxRows: 6 }, // 自适应内容高度，可设置为 true | false 或对象：{ minRows: 2, maxRows: 6 }
      showCount: false // true/ false, 显示字数统计
    },
    hidden: false // true/ false 隐藏
  },
  {
    tag: 'inputNumber',
    tagName: '数字输入框',
    key: '', // 前端自动生成， question_id_xxxxx, 提交表单的值
    formItemProps: {
      label: '数字输入框的label' // 标题
    },
    nodeProps: {
    },
    hidden: false // true/ false 隐藏
  },
  {
    tag: 'radio',
    tagName: '单选框',
    key: '', // 前端自动生成， question_id_xxxxx, 提交表单的值
    formItemProps: {
      label: '单选项的label' // 标题
    },
    nodeProps: {
      options: [
        { value: '1', label: 'label1' },
        { value: '2', label: 'label2' },
        { value: '3', label: 'label3' }
      ]
    },
    layout: 'horizontal', // horizontal/vertical 排列方式
    hidden: false // true/ false 隐藏
  },
  {
    tag: 'checkbox',
    tagName: '多选框',
    key: '', // 前端自动生成， question_id_xxxxx, 提交表单的值
    formItemProps: {
      label: '多选项的label' // 标题
    },
    nodeProps: {
      options: [
        { value: '1', label: 'label1' },
        { value: '2', label: 'label2' },
        { value: '3', label: 'label3' }
      ]
    },
    layout: 'horizontal', // horizontal/vertical 排列方式
    hidden: false // true/ false 隐藏
  },
  {
    tag: 'select',
    tagName: '选择框',
    key: '', // 前端自动生成， question_id_xxxxx, 提交表单的值
    formItemProps: {
      label: '下拉的label' // 标题
    },
    nodeProps: {
      options: [
        { value: '1', label: 'label1' },
        { value: '2', label: 'label2' },
        { value: '3', label: 'label3' }
      ]
    },
    hidden: false // true/ false 隐藏
  },
  {
    tag: 'rate',
    tagName: '评分项',
    key: '', // 前端自动生成， question_id_xxxxx, 提交表单的值
    formItemProps: {
      label: '评分的label' // 标题
    },
    nodeProps: {
      allowHalf: false, // 是否允许半选
      count: 5, // star 总数
      tooltips: ['不满意', '', '一般', '', '满意']
    },
    hidden: false // true/ false 隐藏
  }
]
