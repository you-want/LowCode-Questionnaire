import {
  createRouter,
  createWebHashHistory,
  NavigationFailure,
  NavigationGuardNext,
  RouteLocationNormalized
} from 'vue-router'
import NProgress from 'nprogress'
import { TITLE_SUFFIX } from '@/constants/common'
import routes from './router.config'
import { getToken } from '@/utils/auth' // 验权

const hostname = window.location.hostname
const loginUrl = location.origin + '/#/login?type=question/#'

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

router.beforeEach(routerEachCallback)
router.afterEach(routerAfterEachCallback)

function routerEachCallback (
  to: RouteLocationNormalized,
  from: RouteLocationNormalized,
  next: NavigationGuardNext
) {
  NProgress.start()
  if (getToken()) {
    setDomTitle(to)
    next()
  } else {
    // window.location.href = `${loginUrl}${location.href || to.fullPath}`
    if (hostname.indexOf('cloud') !== -1) {
      window.location.href = `${loginUrl}${to.fullPath}`
    } else {
      setDomTitle(to)
      next()
    }
  }
}
function routerAfterEachCallback (
  to: RouteLocationNormalized,
  from: RouteLocationNormalized,
  failure: NavigationFailure | void
) {
  NProgress.done()
}

function setDomTitle (to: RouteLocationNormalized) {
  const title = to.meta.title ? to.meta.title + ' - ' : ''
  document.title = title + TITLE_SUFFIX
}

export default router
