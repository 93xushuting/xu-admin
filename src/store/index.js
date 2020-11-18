import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
import user from './modules/user'
import app from './modules/app'
import settings from './modules/settings'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    user,
    app,
    settings
  },
  getters
  // state: {},
  // actions: {},
  // modules: {}
})

export default store
