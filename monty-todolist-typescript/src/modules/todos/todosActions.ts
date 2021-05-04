import { createAction } from "typesafe-actions";

// actions
export const ADD_TODO = "todos/TODO_CONFIRM";
export const FILTER_TODOS = "todos/FILTER_TODOS";
export const CHECK_TODO = "todos/CHECK_TODO";

export const DELETE_TODO = "todos/DELETE_TODO";
export const DONE_TODO = "todos/DONE_TODO";
export const FIX_TODO = "odos/FIX_TODO";

export const TEST_TODO = "todos/TEST_TODO";
export const TEST_TODO_SUCCESS = "todos/TEST_TODO_SUCCESS";
export const TEST_TODO_FAILURE = "todos/TEST_TODO_FAILURE";
// action Functions
export type addTodoPayload = {
    body: string;
    tags: string[];
};
export const addTodo = createAction(
    ADD_TODO,
    ({ body, tags }: addTodoPayload) => ({
        body,
        tags,
    })
)();

export const filterTodos = createAction(
    FILTER_TODOS,
    (selected: string[]) => selected
)();

export const checkTodo = createAction(CHECK_TODO, (id: number) => id)();

export const deleteTodo = createAction(DELETE_TODO)<void>();

export const doneTodo = createAction(DONE_TODO)<void>();

type fixTodoPayload = {
    body: string;
    tags: string[];
};
export const fixTodo = createAction(
    FIX_TODO,
    ({ body, tags }: fixTodoPayload) => ({ body, tags })
)();

// export const testTodo = createAsyncAction(
//     TEST_TODO,
//     TEST_TODO_SUCCESS,
//     TEST_TODO_FAILURE
// )<void, string>();

export const testTodo = createAction(TEST_TODO)<string>();
