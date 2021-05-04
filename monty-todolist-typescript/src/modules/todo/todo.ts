import { createReducer } from "typesafe-actions";
import { INITIALIZE, CHANGE_FIELD, WRITE_TAG_SELECTED } from "./todoActions";
import { TodoAction, TodoState } from "./todoTypes";
// State
const initialState: TodoState = {
    id: 0,
    body: "",
    tags: [],
    done: false,
};

const todo = createReducer<TodoState, TodoAction>(initialState, {
    [INITIALIZE]: () => initialState,
    [CHANGE_FIELD]: (state, action) => ({
        ...state,
        body: action.payload,
    }),
    [WRITE_TAG_SELECTED]: (state, action) => ({
        ...state,
        tags: state.tags.includes(action.payload)
            ? state.tags.filter((select) => select !== action.payload)
            : state.tags.concat(action.payload),
    }),
});

export default todo;
