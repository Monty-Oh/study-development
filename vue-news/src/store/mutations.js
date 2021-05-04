const mutations = {
    SET_STATE(state, {menu, data}) {
        state[menu] = data;
    },
    SET_USER(state, {data}) {
        state.user = data;
    },
    CLEAR_USER(state) {
        state.user = {};
    },
    SET_ITEM(state, {data}) {
        state.item = data;
    }
}

export default mutations;