import { createAction } from "typesafe-actions";

// actions
export const INCREASE = "counter/INCREASE";
export const DECREASE = "counter/DECREASE";
export const INCREASE_ASYNC = "counter/INCREASE_ASYNC";

// action Functions
export const increase = createAction(INCREASE, (value?: number) =>
    value ? value : 1
)();

export const decrease = createAction(DECREASE)<void>();

export const increaseAsync = createAction(
    INCREASE_ASYNC,
    (value: number) => value
)();
