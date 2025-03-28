import { HomeOutlined } from '@ant-design/icons-vue'
export default [
  {
    path: '/',
    name: 'Index',
    meta: {
      title: '首页',
      icon: HomeOutlined
    }
  },
  {
    path: '/form',
    name: 'Form',
    meta: {
      title: '表单',
      icon: HomeOutlined
    },
    children: [
      {
        path: '/form',
        name: 'FormPage',
        meta: {
          title: '表单示例',
          icon: HomeOutlined
        }
      }
    ]
  },
  {
    path: '/table',
    name: 'Table',
    meta: {
      title: '表格',
      icon: HomeOutlined
    },
    children: [
      {
        path: '/table',
        name: 'TablePage',
        meta: {
          title: '表格示例',
          icon: HomeOutlined
        }
      }
    ]
  }
]
