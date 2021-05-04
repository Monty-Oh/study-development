import { createAction } from "typesafe-actions";

// actions
export const CHANGE_FIELD = "todo/CHANGE_FIELD";
export const INITIALIZE = "todo/INITIALIZE";
export const WRITE_TAG_SELECTED = "todo/WRITE_TAG_SELECTED";

// action Functions
export type ChangeFieldPayload = {
    key: string;
    value: string | string[];
};
export const changeField = createAction(
    CHANGE_FIELD,
    (value: string) => value
)();
export const writeTagSelected = createAction(
    WRITE_TAG_SELECTED,
    (value: string) => value
)();

export const initialize = createAction(INITIALIZE)<void>();
