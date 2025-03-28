// import BasicLayout from '@/layouts/BasicLayout.vue'
// import MenuLayout from '@/layouts/MenuLayout.vue'
import EditorLayout from '@/layouts/EditorLayout.vue'
import {
  RouteRecordRaw
  // RouterView
} from 'vue-router'

const routes: RouteRecordRaw[] = [
  // {
  //   path: '/',
  //   component: MenuLayout,
  //   children: [
  //     {
  //       path: '',
  //       name: 'Index',
  //       meta: {
  //         title: '首页'
  //       },
  //       component: () => import('@/views/index.vue')
  //     },
  //     {
  //       path: '',
  //       name: 'Table',
  //       component: RouterView,
  //       meta: {
  //         title: '表格'
  //       },
  //       children: [
  //         {
  //           path: 'table',
  //           name: 'TablePage',
  //           meta: {
  //             title: '表格示例'
  //           },
  //           component: () => import('@/views/table-page/tablePage.vue')
  //         }
  //       ]
  //     },
  //     {
  //       path: '',
  //       name: 'Form',
  //       component: RouterView,
  //       meta: {
  //         title: '表单'
  //       },
  //       children: [
  //         {
  //           path: 'form',
  //           name: 'FormPage',
  //           meta: {
  //             title: '表单示例'
  //           },
  //           component: () => import('@/views/form-page/formPage.vue')
  //         }
  //       ]
  //     }
  //   ]
  // },
  // {
  //   path: '/exception',
  //   name: 'Exception',
  //   component: BasicLayout,
  //   children: [
  //     {
  //       path: '404',
  //       name: '404',
  //       component: () => import('@/views/exceptions/404.vue')
  //     }
  //   ]
  // },
  {
    path: '/editor',
    component: EditorLayout,
    children: [
      {
        path: '',
        name: 'Editor',
        meta: {
          title: '编辑器'
        },
        component: () => import('@/views/form-editor/index.vue')
      }
    ]
  },
  {
    path: '/',
    component: EditorLayout,
    children: [
      {
        path: '',
        name: 'Question',
        meta: {
          title: '问卷列表'
        },
        component: () => import('@/views/question/index.vue')
      },
      {
        path: 'preview',
        name: 'Preview',
        meta: {
          title: '问卷预览'
        },
        component: () => import('@/views/question/preview.vue')
      },
      {
        path: 'analysis',
        name: 'Analysis',
        meta: {
          title: '问卷分析'
        },
        component: () => import('@/views/question/analysis.vue')
      }
    ]
  },
  {
    path: '/qn',
    name: 'Questionnaire',
    meta: {
      title: '问卷调查'
    },
    component: () => import('@/views/question/questionnaire.vue')
  }
  // {
  //   path: '/page-editor',
  //   name: 'PageEditor',
  //   meta: {
  //     title: '页面编辑器'
  //   },
  //   component: () => import('@/views/page-editor/index')
  // }
]

export default routes
