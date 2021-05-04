import { createReducer } from "typesafe-actions";
import {
    ADD_TODO,
    FILTER_TODOS,
    CHECK_TODO,
    DELETE_TODO,
    DONE_TODO,
    FIX_TODO,
    TodosAction,
    TodosState,
} from "./index";

const initialState: TodosState = {
    todos: [
        {
            id: 1,
            body: "Monty",
            tags: ["tag1", "tag2"],
            done: false,
        },
        {
            id: 2,
            body: "Mandy",
            tags: ["tag3", "tag2"],
            done: false,
        },
        {
            id: 3,
            body: "Lizzy",
            tags: ["tag1", "tag3"],
            done: false,
        },
    ],
    filteredTodos: [],
    checkedIds: [],
    nextId: 4,
};

const todos = createReducer<TodosState, TodosAction>(initialState, {
    [ADD_TODO]: (state, action) => ({
        ...state,
        todos: state.todos.concat({
            id: state.nextId,
            body: action.payload.body,
            tags: action.payload.tags,
            done: false,
        }),
        nextId: state.nextId + 1,
    }),

    // 태그 선택 시 선택된 태그들의 TODO들은 FILTER_TODOS안으로 들어간다.
    [FILTER_TODOS]: (state, action) => ({
        ...state,
        filteredTodos: state.todos.filter((todo) =>
            todo.tags.some((tag) => action.payload.includes(tag))
        ),
    }),

    // UNCHECK, CHECK 하나로 합침
    [CHECK_TODO]: (state, action) => ({
        ...state,
        checkedIds: state.checkedIds.includes(action.payload)
            ? state.checkedIds.filter((id) => id !== action.payload)
            : state.checkedIds.concat(action.payload),
    }),

    // Todo 삭제, checkedIds 체크된 아이디들의 Todo를 제거
    [DELETE_TODO]: (state) => ({
        ...state,
        checkedIds: [],
        todos: state.todos.filter(
            (todo) => !state.checkedIds.includes(todo.id)
        ),
    }),

    // Todo 확인처리
    [DONE_TODO]: (state) => ({
        ...state,
        checkedIds: [],
        todos: state.todos.map((todo) => {
            return state.checkedIds.includes(todo.id)
                ? { ...todo, done: true }
                : todo;
        }),
    }),

    // Todo 수정
    [FIX_TODO]: (state, action) => ({
        ...state,
        todos: state.todos.map((todo) => {
            return todo.id === state.checkedIds[0]
                ? {
                      ...todo,
                      body: action.payload.body,
                      tags: action.payload.tags,
                  }
                : todo;
        }),
    }),
});

export default todos;
