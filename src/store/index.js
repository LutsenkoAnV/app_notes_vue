import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    notes: []
  },
  mutations: {
    addNote (state, payload) {
      state.notes.push(payload)
    },
    deleteNote (state, payload) {
      state.notes = state.notes.filter(note => note.id !== payload)
    },
    saveEditNote (state, payload) {
      state.notes = state.notes.map(note => {
        if (note.id === payload.id) {
          return payload
        }

        return note
      })
    },
    initializeStore () {
      if (localStorage.getItem('notes')) {
        this.replaceState(
          {
            notes: JSON.parse(localStorage.getItem('notes'))
          }
        )
      }
    }
  },
  actions: {
    deleteNote ({ commit }, payload) {
      commit('deleteNote', payload)
    },
    addNote ({ commit }, payload) {
      commit('addNote', payload)
    },
    saveEditNote ({ commit }, payload) {
      commit('saveEditNote', payload)
    }
  },
  getters: {
    allNotes: state => state.notes
  }
})
