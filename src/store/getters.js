const getters = {
  token: state => state.user.token,
  avatar: state => state.user.avatar,
  name: state => state.user.name,
  sidebar: state => state.app.sidebar,
  roles: state => state.user.roles,
  permission_routes: state => state.permission.routes
}
export default getters
