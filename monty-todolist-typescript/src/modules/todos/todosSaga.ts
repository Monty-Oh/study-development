import { takeLatest } from "redux-saga/effects";

import { ADD_TODO } from "./todosActions";
// import { addTodoPayload } from "./todosActions";

// export default function* todosSaga() {
//     yield takeLatest(ADD_TODO, addTodo$);
// }

// function addTodo$(saga: { type: string; payload: addTodoPayload }) {
//     try {
//         const nextBody = {
//             ...saga,
//             payload: {
//                 ...saga.payload,
//                 body: "testing....",
//             },
//         };
//         return nextBody.payload;
//     } catch (err) {
//         // 실패 로직: 나중에 작성할 것임
//     }
// }
