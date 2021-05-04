/*
* Nuxt에서 actions를 호출할 때는 자동으로 action 이름 앞에 해당 모듈의 path 이름이 붙는다.
* 여기서는
* todos/'ACTION_NAME'
* 이런식으로 자동으로 지어지기 때문에 앞의 todos 삭제함.
*/
export const ADD_TODO = 'ADD_TODO';
export const DELETE_TODO = 'DELETE_TODO';
export const CLEAR_TODOS = 'CLEAR_TODOS';
export const TOGGLE_CHECKED = 'TOGGLE_CHECKED';
export const DELETE_CHECKED = 'DELETE_CHECKED';
export const CHANGE_SELECTED = 'CHANGE_SELECTED';

const actions = {
  // 받은 string 값의 todo를 ADD_TODO mutations로 커밋한다.
  [ADD_TODO](context, {todo}) {
    context.commit(ADD_TODO, todo);
  },

  // 해당 id 값의 todo를 삭제한다.
  [DELETE_TODO](context, {id}) {
    context.commit(DELETE_TODO, id);
  },

  // 모든 items를 삭제한다.
  [CLEAR_TODOS](context) {
    context.commit(CLEAR_TODOS);
  },

  // 해당 id의 checked의 값을 반대로 바꾼다. 체크 기능
  [TOGGLE_CHECKED](context, {id}) {
    context.commit(TOGGLE_CHECKED, id);
  },

  // checked가 되어있을 때 (true) 해당 todo를 삭제한다.
  [DELETE_CHECKED](context) {
    context.commit(DELETE_CHECKED);
  },

  // all, checked, notchecked중 선택하는 액션
  [CHANGE_SELECTED](context, {selected}) {
    context.commit(CHANGE_SELECTED, selected);
  }
}

export default actions;
