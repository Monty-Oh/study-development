import { createReducer } from "typesafe-actions";
import { INCREASE, DECREASE, CounterState, CounterAction } from "./index";

const initialState: CounterState = {
    count: 0,
};

// const counter = createReducer<CounterState, CounterAction>(initialState, {
//     [INCREASE]: (state, action) => ({
//         count: state.count + action.payload,
//     }),
//     [DECREASE]: (state, action) => ({
//         count: --state.count,
//     }),
// });

const counter = createReducer<CounterState, CounterAction>(initialState, {
    [INCREASE]: (state, action) => ({
        count: state.count + action.payload,
    }),
    [DECREASE]: (state, action) => ({
        count: --state.count,
    }),
});

export default counter;
