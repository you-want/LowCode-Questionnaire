import { createApp } from 'vue'
import router from '@/router'
import store, { key } from './store'
import antd from '@/plugins/antd'
import App from './App.vue'
import '@/styles/index.less'

import {
  renderWithQiankun,
  qiankunWindow
} from 'vite-plugin-qiankun/dist/helper'
import { createWebHistory } from 'vue-router'

// const app = createApp(App)
// app
//   .use(router)
//   .use(store, key)
//   .use(antd)
//   .mount('#app')

let instance: any = null
let history: any = null
function render (props: any = {}) {
  const { container } = props
  history = createWebHistory(
    qiankunWindow.__POWERED_BY_QIANKUN__ ? '/question-fe/' : '/'
  )
  instance = createApp(App)
  instance
    .use(router)
    .use(store, key)
    .use(antd)
    .mount(
      container
        ? container.querySelector('#app')
        : document.getElementById('app')
    )
  if (qiankunWindow.__POWERED_BY_QIANKUN__) {
    console.info('我正在作为子应用运行')
  }
}

renderWithQiankun({
  mount (props: any) {
    console.info('viteapp mount')
    render(props)
    instance.config.globalProperties.pRouter = props.parentRouter
    instance.config.globalProperties.pStore = props.parentStore
  },
  bootstrap () {
    console.info('bootstrap')
  },
  unmount (props: any) {
    console.info('vite被卸载了')
    instance.unmount()
    instance._container.innerHTML = ''
    history.destroy() // 不卸载  router 会导致其他应用路由失败
    instance = null
  }
})

if (!qiankunWindow.__POWERED_BY_QIANKUN__) {
  render()
}
