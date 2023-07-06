import Vue from 'vue'
import Vuex from 'vuex'
import ethereum from './ethereum'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    networks: [
      {
        name: "Ethereum",
        currency: "Ethers"
      },
      {
        name: "Gnosis", 
        currency: "xDai", 
      }
    ]
  },
  getters: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    ethereum: ethereum
  }
})
