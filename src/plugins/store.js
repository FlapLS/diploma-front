
import { createStore } from 'vuex'

export default createStore({
    state: {
        counter: 10
    },
    getters:{
        getCount2(state){
            return state.counter * 2;
        }
    },
    mutations: {
    },
    actions: {
    },
    modules: {
    }
})
