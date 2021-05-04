import { ActionType } from "typesafe-actions";
import * as actions from "./actions";

// Action
export type CounterAction = ActionType<typeof actions>;

// State
export type CounterState = {
    count: number;
};
