import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

/* Layout */
import Layout from '@/layout'

// 公共页面
const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true // 路由不会在侧边栏展示
  },
  {
    path: '/example',
    component: Layout,
    redirect: '/About',
    name: 'Example',
    meta: { title: 'Example', icon: 'el-icon-s-help' },
    children: [
      {
        path: 'About',
        name: 'About',
        component: () => import('@/views/About.vue'),
        meta: { title: 'About', icon: 'dashboard' }
      },
      {
        path: 'Home',
        name: 'Home',
        component: () => import('@/views/Home.vue'),
        meta: { title: 'Home', icon: 'dashboard' }
      }
    ]
  },
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [
      {
        path: 'dashboard',
        name: 'Dashboard',
        component: () => import('@/views/Home.vue'),
        meta: { title: 'Dashboard', icon: 'el-icon-s-help' }
      }
    ]
  }
]

const createRouter = () =>
  new VueRouter({
    // mode: 'history', // require service support
    scrollBehavior: () => ({ y: 0 }),
    routes: constantRoutes
  })

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
// export function resetRouter() {
//   const newRouter = createRouter()
//   router.matcher = newRouter.matcher // reset router
// }

export default router
