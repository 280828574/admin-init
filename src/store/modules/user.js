import { getToken, setToken, removeToken } from '@/utils/auth'
import { resetRouter } from '@/router'

const state = {
  token: getToken(),
  name: '',
  avatar: '',
  userInfo: ''
}

const mutations = {
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar || 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif'
  },
  SET_USER_INFO: (state, userInfo) => {
    state.userInfo = userInfo
  }
}

const actions = {
  // user login
  login({ commit }, data) {
    commit('SET_USER_INFO', data)
    commit('SET_NAME', data.userName)
    commit('SET_TOKEN', data.accessToken)
    window.sessionStorage.setItem('userInfo', JSON.stringify(data))
    setToken(data.accessToken)
  },
  pension({ commit }, data) {
    let userdata = window.sessionStorage.getItem('userInfo')
    userdata = JSON.parse(userdata)
    userdata.pension = data;
    window.sessionStorage.setItem('userInfo', JSON.stringify(userdata))
  },
  getUserInfo({ commit }) {
    return new Promise((resolve, reject) => {
      let data = window.sessionStorage.getItem('userInfo')
      if (data) {
        data = JSON.parse(data)
        commit('SET_USER_INFO', data)
        commit('SET_NAME', data.userName)
        commit('SET_TOKEN', data.accessToken)
        setToken(data.accessToken)
        resolve(data)
      }
      resolve('')
    })
  },

  // user logout
  logout({ commit, state }) {
    commit('SET_TOKEN', '')
    removeToken()
    resetRouter()
  },

  // remove token
  resetToken({ commit }) {
    return new Promise(resolve => {
      commit('SET_TOKEN', '')
      removeToken()
      resolve()
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

