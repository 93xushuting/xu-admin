import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

/* Layout */
import Layout from '@/layout'

// 公共页面
export const constantRoutes = [
  {
    path: '/redirect',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/redirect/:path(.*)',
        component: () => import('@/views/redirect/index')
      }
    ]
  },
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true // 路由不会在侧边栏展示
  },
  {
    path: '/404',
    component: () => import('@/views/errorPage/404'),
    hidden: true
  }
]

// 动态路由
export const asyncRoutes = [
  // {
  //   path: '/',
  //   component: Layout,
  //   redirect: '/dashboard',
  //   children: [
  //     {
  //       path: 'dashboard',
  //       name: 'Dashboard',
  //       component: () => import('@/views/Home'),
  //       meta: { title: 'Dashboard', icon: 'dashboard' }
  //     }
  //   ]
  // },
  // {
  //   path: '/table',
  //   component: Layout,
  //   redirect: '/table/complex-table',
  //   name: 'Table',
  //   meta: { title: 'Table', icon: 'table' },
  //   children: [
  //     {
  //       path: 'complex-table',
  //       name: 'DynamicTable',
  //       component: () => import('@/views/table/index'),
  //       meta: { title: 'Table Index', roles: ['admin'] }
  //     },
  //     {
  //       path: 'table-index1',
  //       name: 'DragTable',
  //       component: () => import('@/views/table/table'),
  //       meta: { title: 'Table Index1' }
  //     },
  //     {
  //       path: 'table-index2',
  //       name: 'InlineEditTable',
  //       component: () => import('@/views/table/table1'),
  //       meta: { title: 'Table Index2' }
  //     }
  //   ]
  // },
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () =>
  new VueRouter({
    // mode: 'history', // require service support
    scrollBehavior: () => ({ y: 0 }),
    routes: constantRoutes
  })

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
