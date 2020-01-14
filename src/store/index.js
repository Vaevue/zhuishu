import Vue from 'vue'
import Vuex from 'vuex'
import * as getters from './gettes'
import mutations from './mutations'
import state from './state'

Vue.use(Vuex)

export default new Vuex.Store ({
    getters,
    mutations,
    state
}) 