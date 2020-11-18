const getters = {
  token: state => state.user.token,
  avatar: state => state.user.avatar,
  name: state => state.user.name,
  sidebar: state => state.app.sidebar
}
export default getters
