const INITIAL_STATE = {
    
};
export default {
    namespaced: true,
    state: {
        done: [],
    },
    mutations: {
        EMPTY_STATE(state) {
            this.replaceState()
        },
    },
}