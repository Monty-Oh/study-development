import { combineReducers } from "redux";
import { all } from "redux-saga/effects";

import todo from "./todo/todo";
import todos from "./todos/todos";
// import todosSaga from "./todos/todosSaga";
import tags from "./tags/tags";
import counter, { counterSaga } from "./counter";

// import todosSaga from "../modules/todos/todosSaga";

const rootReducer = combineReducers({ todo, todos, tags, counter });

export function* rootSaga() {
    yield all([counterSaga()]);
}

export default rootReducer;
export type RootState = ReturnType<typeof rootReducer>;
