import { createAction } from "typesafe-actions";

// actions
export const TAG_SELECTED = "tags/TAG_SELECTED";
export const INITIALIZE_SELECTED = "tags/INITIALIZE_SELECTED";

// action Functions
export const tagSelected = createAction(
    TAG_SELECTED,
    (value: string) => value
)();

export const initializeSelected = createAction(INITIALIZE_SELECTED)<void>();
