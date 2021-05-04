/*
* state를 건드리는 작업은 오직 mutations에서만 한다.
* 기존의 actions에 구현되어 있는 로직을 mutations로 옮김.
*/
import * as actions from "./actions";

const mutations = {

  // 새로운 todo 추가
  [actions.ADD_TODO](state, todo) {
    // 새로운 todo를 받아 새로운 객체를 생성, 기존의 todoItems에 추가한다.
    state.todoItems = state.todoItems.concat({
      id: state.currentId++,
      todo,
      checked: false
    })
  },

  // 해당 id값의 todo 제거
  [actions.DELETE_TODO](state, id) {
    // 해당 id값을 가진 todo를 todoItems에서 제거한다.
    state.todoItems = state.todoItems
      .filter(todo => todo.id !== id);
  },

  // state.todoItems 모두 삭제
  [actions.CLEAR_TODOS](state) {
    state.todoItems = [];
  },

  // checked 값 변경
  [actions.TOGGLE_CHECKED](state, id) {
    /*
    * todoItems을 복사한다. 복사하면서 해당 id의 checked값만
    * 반대로 변경해준다.
    */
    state.todoItems = state.todoItems.map((todo) =>
      todo.id === id
        ?
        {
          ...todo,
          checked: !todo.checked,
        }
        :
        todo
    );
  },

  // checked items 삭제
  [actions.DELETE_CHECKED](state) {
    // todo.checked 값이 true 인 경우 필터링한다.
    state.todoItems = state.todoItems.filter((todo) => !todo.checked);
  },

  // selected 변경
  [actions.CHANGE_SELECTED](state, nextSelected) {
    state.selected = nextSelected;
  }
}

export default mutations;
