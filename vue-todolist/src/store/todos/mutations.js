export const SET_TODO_ITEMS = 'store/SET_TODOS';
export const SET_SELECTED = 'store/SET_SELECTED';

// mutations는 오직 상태값 변화로만 사용

const mutations = {
  // 전달받은 nextTodoItems 으로 교체한다.
  [SET_TODO_ITEMS](state, nextTodoItems) {
    state.todoItems = nextTodoItems;
  },

  [SET_SELECTED](state, nextSelected) {
    state.selected = nextSelected;
  }
}

export default mutations;
