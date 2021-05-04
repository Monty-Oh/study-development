import { createReducer } from "typesafe-actions";
import { TagsAction, TagsState } from "./tagsTypes";
import { TAG_SELECTED, INITIALIZE_SELECTED } from "./tagsActions";

// State
const initialState: TagsState = {
    tags: ["tag1", "tag2", "tag3", "tag4"],
    colorsMap: new Map([
        ["tag1", "red"],
        ["tag2", "orange"],
        ["tag3", "yellow"],
        ["tag4", "green"],
    ]),
    selected: [],
};

// Reducer
const todo = createReducer<TagsState, TagsAction>(initialState, {
    // 태그 선택 시 이미 있다면? 뺀다. 없다면? 더한다.
    [TAG_SELECTED]: (state, action) => ({
        ...state,
        selected: state.selected.includes(action.payload)
            ? state.selected.filter((select) => select !== action.payload)
            : state.selected.concat(action.payload),
    }),

    [INITIALIZE_SELECTED]: () => initialState,
});

export default todo;
