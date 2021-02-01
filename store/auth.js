import Cookie from 'cookie'
import Cookies from 'js-cookie'

export const state = () => ({
  token: null
})

export const getters = {
  isAuthenticated: state => Boolean(state.token)
}

export const mutations = {
  setToken(state, token) {
    state.token = token
  },
  clearToken(state) {
    state.token = null
  }
}

export const actions = {
  async login({ commit, dispatch }, formData) {
    try {
      const response = await this.$axios.$post(`http://blog.garrykhr.ru/api/auth/auth/login?login=${formData.login}&password=${formData.password}`)

      const token = response.jwt

      dispatch('setToken', token)
    } catch(e) {
      commit('setError', e.response.data, { root: true })
      throw e
    }
  },
  setToken({ commit }, token) {
    commit('setToken', token)
    Cookies.set('jwt-token', token)
  },
  logout({ commit }) {
    commit('clearToken')
    Cookies.remove('jwt-token')
  },
  async createUser({ commit }, formData) {
    try {
      await this.$axios.$post(`http://blog.garrykhr.ru/api/auth/create/login?login=${formData.login}&password=${formData.password}`)

    } catch(e) {
      commit('setError', e.response.data, { root: true })
      throw e
    }
  },
  async autoLogin ({ dispatch, state }) {
    try {
      const cookieStr = this.app.context.req.headers.cookie
      const cookies = Cookie.parse(cookieStr || '') || {}
      const token = cookies['jwt-token']

      await this.$axios.$post(`http://blog.garrykhr.ru/api/auth/validate/jwt?jwt=${token}`)

      dispatch('setToken', token)

    } catch(e) {
      console.log(e)
    }
  }
}