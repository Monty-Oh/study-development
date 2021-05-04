// 비동기 작업을 할 때는 actions를 사용한다.
import {fetchList, getItem, getUser} from "../api";

const actions = {
    async FETCH_STATE(context, {menu}) {
        try {
            const response = await fetchList(menu);
            context.commit({
                type: 'SET_STATE',
                menu,
                data: response.data
            });
        } catch (e) {
            console.error(e);
        }
    },

    async FETCH_USER(context, {id}) {
        context.commit({
            type: 'CLEAR_USER',
        })
        try {
            const response = await getUser(id);
            context.commit({
                type: 'SET_USER',
                data: response.data,
            })
        } catch (e) {
            console.error(e);
        }
    },

    async FETCH_ITEM(context, {id}) {
        try {
            const response = await getItem(id);
            context.commit({
                type: 'SET_ITEM',
                data: response.data,
            })
        } catch (e) {
            console.error(e);
        }
    }
}

export default actions;