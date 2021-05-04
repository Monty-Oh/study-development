import { ActionType } from "typesafe-actions";
import * as actions from "./todoActions";

// Action
export type TodoAction = ActionType<typeof actions>;

// State
export type TodoState = {
    id: number;
    body: string;
    tags: string[];
    done: boolean;
};
