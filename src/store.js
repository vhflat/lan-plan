import Vuex       from 'vuex'
import Vue        from 'vue'
import { fb, db } from './main'

Vue.use(Vuex)

// GETTERS
export const currentUser = state => state.user

// ACTIONS
export const setCurrentUser     = ({ commit }, user) => commit('setUser', { user })
export const signOutCurrentUser = ({ commit }) => commit('signOut')
export const giveStar           = ({ commit }, uid) => commit('addStar', { uid })
export const startLoading       = ({ commit }) => commit('setLoading', true)
export const stopLoading       = ({ commit }) => commit('setLoading', false)


// MUTATIONS
export function setUser(state, { user }) {
  state.user = user
}

export function signOut(state) {
  fb
    .auth()
    .signOut()
    .then(() => {
      state.user = null
    })
}

function addStar(state, { uid }) {
  return db.collection('users')
    .doc(uid)
    .collection('stars')
    .add({ comment: 'Veldig bra fyr!' })
}

function setLoading(state, payload) {
  state.loading = true
  setTimeout(()=> state.loading = payload, 1000)
}

const state = {
  user: null,
  loading: true,
}

export default new Vuex.Store({
  state,
  getters  : {
    currentUser
  },
  actions  : {
    setCurrentUser,
    signOutCurrentUser,
    giveStar,
    startLoading,
    stopLoading
  },
  mutations: {
    setUser,
    signOut,
    addStar,
    setLoading
  }
})
