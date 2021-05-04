import {SET_TODO_ITEMS, SET_SELECTED} from "./mutations";

export const ADD_TODO = 'store/ADD_TODO';
export const DELETE_TODO = 'store/DELETE_TODO';
export const CLEAR_TODOS = 'store/CLEAR_TODOS';
export const TOGGLE_CHECKED = 'store/TOGGLE_CHECKED';
export const DELETE_CHECKED = 'store/DELETE_CHECKED';
export const CHANGE_SELECTED = 'store/CHANGE_SELECTED';

const actions = {
    [ADD_TODO](context, {todo}) {
        const nextTodoItems = context.state.todoItems.concat({
            id: context.state.currentId++,
            todo,
            checked: false
        });
        context.commit(SET_TODO_ITEMS, nextTodoItems);
    },

    // 해당 id 값의 todo를 삭제한다.
    [DELETE_TODO](context, {id}) {
        const nextTodoItems = context.state.todoItems.filter(todo => todo.id !== id);
        context.commit(SET_TODO_ITEMS, nextTodoItems);
    },

    // 모든 items를 삭제한다.
    [CLEAR_TODOS](context) {
        const nextTodoItems = [];
        context.commit(SET_TODO_ITEMS, nextTodoItems);
    },

    // 해당 id의 checked의 값을 반대로 바꾼다. 체크 기능
    [TOGGLE_CHECKED](context, {id}) {
        const nextTodoItems = context.state.todoItems.map((todo) =>
            todo.id === id ?
                {
                    ...todo,
                    checked: !todo.checked
                }
                : todo
        );
        context.commit(SET_TODO_ITEMS, nextTodoItems);
    },

    // checked가 되어있을 때 (true) 해당 todo를 삭제한다.
    [DELETE_CHECKED](context) {
        const nextTodoItems = context.state.todoItems.filter((todo) => !todo.checked);
        context.commit(SET_TODO_ITEMS, nextTodoItems);
    },

    [CHANGE_SELECTED](context, {selected}) {
        context.commit(SET_SELECTED, selected);
    }
}

export default actions;