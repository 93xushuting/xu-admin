import router from './router'
import { Message } from 'element-ui'
import NProgress from 'nprogress' // 浏览器顶部的进度条
import 'nprogress/nprogress.css'
import { getToken } from '@/utils/auth'
import store from './store'
import getPageTitle from '@/utils/get-page-title'

NProgress.configure({ showSpinner: false }) // 进度环显示隐藏

const whiteList = ['/login']

router.beforeEach(async (to, from, next) => {
  NProgress.start()

  // set page title
  document.title = getPageTitle(to.meta.title)

  const hasToken = getToken()

  if (hasToken) {
    if (to.path === '/login') {
      next({ path: '/' })
      NProgress.done()
    } else {
      // 判断当前用户是否已拉取完user_info信息
      const hasRoles = store.getters.roles && store.getters.roles.length > 0
      if (hasRoles) {
        next()
      } else {
        try {
          // 拉取user_info
          // roles must be a object array! such as: ['admin'] or ,['developer','editor']
          const { role, menu } = await store.dispatch('getUserInfo')
          if (role.length > 0) {
            // 动态路由，拉取菜单
            const accessRoutes = await store.dispatch('generateRoutes', { role, menu })
            // 动态添加可访问路由
            router.addRoutes(accessRoutes)
            next({ ...to, replace: true })
          }
        } catch (error) {
          Message.error(error || 'Has Error')
          NProgress.done()
        }
      }
    }
  } else {
    if (whiteList.indexOf(to.path) !== -1) {
      next()
    } else {
      next(`/login?redirect=${to.path}`)
      NProgress.done()
    }
  }
})

router.afterEach(() => {
  NProgress.done()
})
