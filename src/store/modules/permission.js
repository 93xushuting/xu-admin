import { asyncRoutes, constantRoutes } from '@/router'
import Layout from '@/layout'

/**
 * 通过meta.role判断是否与当前用户权限匹配
 * @param roles
 * @param route
 */
function hasPermission(roles, route) {
  if (route.meta && route.meta.roles) {
    return roles.some(role => route.meta.roles.includes(role))
  } else {
    return true
  }
}

/**
 * 递归过滤异步路由表，返回符合用户角色权限的路由表
 * @param routes asyncRoutes
 * @param roles
 */
export function filterAsyncRoutes(routes, roles) {
  const res = []
  routes.forEach(route => {
    const tmp = { ...route }
    if (hasPermission(roles, tmp)) {
      if (tmp.children) {
        tmp.children = filterAsyncRoutes(tmp.children, roles)
      }
      res.push(tmp)
    }
  })
  return res
}

export const loadView = link => {
  // return link => require('@/views/' + link + '.vue').default
  return () => import('@/views/' + link + '.vue')
}

const state = {
  routes: [],
  addRoutes: []
}

const mutations = {
  SET_ROUTES: (state, routes) => {
    state.addRoutes = routes
    state.routes = constantRoutes.concat(routes)
  }
}

const actions = {
  generateRoutes({ commit }, data) {
    return new Promise(resolve => {
      const { role, menu } = data
      for (var i = 0; i < menu.length; i++) {
        menu[i].component = Layout
        var children = menu[i].children
        if (children.length === 0) {
          menu[i].children.push({
            path: menu[i].path,
            component: loadView(menu[i].link),
            name: menu[i].name,
            meta: { title: menu[i].title, icon: menu[i].icon }
          })
          menu[i].path = ''
          menu[i].name = ''
        } else {
          for (var j = 0; j < children.length; j++) {
            menu[i].children[j].component = loadView(menu[i].children[j].link)
          }
        }
      }
      let accessedRoutes = filterAsyncRoutes(asyncRoutes.concat(menu), role)
      // if (roles.includes('admin')) {
      //   accessedRoutes = asyncRoutes || []
      // } else {
      //   accessedRoutes = filterAsyncRoutes(asyncRoutes, roles)
      // }
      commit('SET_ROUTES', accessedRoutes)
      resolve(accessedRoutes)
    })
  }
}

export default {
  state,
  mutations,
  actions
}
