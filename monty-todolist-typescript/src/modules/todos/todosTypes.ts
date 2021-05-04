import { ActionType } from "typesafe-actions";
import * as actions from "./todosActions";
import { TodoState } from "../todo/todoTypes";

// Action
export type TodosAction = ActionType<typeof actions>;

// State
export type TodosState = {
    todos: TodoState[];
    filteredTodos: TodoState[];
    checkedIds: number[];
    nextId: number;
};
