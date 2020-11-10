import router from './router'
import NProgress from 'nprogress' // 浏览器顶部的进度条
import 'nprogress/nprogress.css'
import { getToken } from '@/utils/auth'

NProgress.configure({ showSpinner: false }) // 进度环显示隐藏

const whiteList = ['/login']

router.beforeEach(async (to, from, next) => {
  NProgress.start()

  const hasToken = getToken()
  if (hasToken) {
  } else {
    if (whiteList.indexOf(to.path) !== -1) {
      next
    } else {
      next(`/login?redirect=${to.path}`)
      NProgress.done()
    }
  }
  next()
})

router.afterEach(() => {
  NProgress.done()
})
