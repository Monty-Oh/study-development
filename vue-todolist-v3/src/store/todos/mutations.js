import {ADD_TODO, CLEAR_TODOS, DELETE_CHECKED, DELETE_TODO, TOGGLE_CHECKED} from "./types";

const mutations = {
  // 전달받은 todo를 사용해 새로운 todoItems을 만든다.
  [ADD_TODO](state, payload) {
    state.todoItems.push({id: state.currentId++, todo: payload.todo, checked: false});
    state.count = state.todoItems.length;
  },

  // 해당 id 값의 todo를 삭제한다.
  [DELETE_TODO](state, payload) {
    state.todoItems = state.todoItems.filter((todo) => todo.id !== payload.id);
    state.count = state.todoItems.length;
  },

  // 모든 id를 삭제한다.
  [CLEAR_TODOS](state) {
    state.todoItems = [];
    state.count = state.todoItems.length;
  },

  // 해당 id의 checked의 값을 반대로 바꾼다.
  // CHECKED, UNCHECKED 합침.
  [TOGGLE_CHECKED](state, payload) {
    // 해당 id의 todo.checked를 반대로 바꾼다.
    state.todoItems = state.todoItems.map((todo) =>
      todo.id === payload.id ?
        {
          ...todo,
          checked: !todo.checked
        }
        : todo
    );
  },

  // checked가 되어있을 때 (true) 해당 todo를 삭제한다.
  [DELETE_CHECKED](state) {
    state.todoItems = state.todoItems.filter((todo) => !todo.checked);
    state.count = state.todoItems.length;
  }
}

export default mutations;
