import { ActionType } from "typesafe-actions";
import * as actions from "./tagsActions";

// Action
export type TagsAction = ActionType<typeof actions>;

// State
export type TagsState = {
    tags: string[];
    colorsMap: Map<string, string>;
    selected: string[];
};
