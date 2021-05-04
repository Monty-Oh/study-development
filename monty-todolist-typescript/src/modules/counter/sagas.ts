import { put, takeEvery } from "redux-saga/effects";
import { increase, INCREASE_ASYNC } from "./index";

function* increaseSaga() {
    yield put(increase());
    yield console.log("testing");
    yield put(increase());
}

export function* counterSaga() {
    yield takeEvery(INCREASE_ASYNC, () => increaseSaga());
}
