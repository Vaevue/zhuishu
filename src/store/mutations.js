import * as types from './mutation-type'

const mutations = {
    [types.SET_DATA](state,arr) {
        state.data = arr
    },
    [types.SET_ID](state,id){
        state.id = id
    },
    [types.SET_BOOK](state,arr) {
        state.book = arr
    },
    [types.SET_IDS](state,id){
        state.ids = id
    }
} 

export default mutations