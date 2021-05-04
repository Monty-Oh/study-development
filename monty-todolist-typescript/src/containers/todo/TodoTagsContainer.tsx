import React, { useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
    tagSelected,
    initializeSelected,
} from "../../modules/tags/tagsActions";
import { writeTagSelected } from "../../modules/todo/todoActions";
import TodoTags from "../../components/todo/TodoTags";
import { RootState } from "../../modules";

type TodoTagsContainerProps = {
    modal?: boolean;
};
function TodoTagsContainer({ modal }: TodoTagsContainerProps) {
    const dispatch = useDispatch();

    const { tags, selected, colorsMap, writeSelected } = useSelector(
        ({ tags, todo }: RootState) => ({
            tags: tags.tags,
            selected: tags.selected,
            colorsMap: tags.colorsMap,
            writeSelected: todo.tags,
        })
    );

    // 태그 선택시 선택한 태그를 더할지 뺄지는 module로..
    const onSelect = useCallback(
        (tag: string) => {
            if (!modal) dispatch(tagSelected(tag));
            else dispatch(writeTagSelected(tag));
        },
        [dispatch, modal]
    );

    // All 클릭시 초기화시킬거 initializeSelected
    const onInit = useCallback(() => {
        dispatch(initializeSelected());
    }, [dispatch]);

    return !modal ? (
        <TodoTags
            selected={selected}
            onInit={onInit}
            tags={tags}
            onSelect={onSelect}
            colorsMap={colorsMap}
        />
    ) : (
        <TodoTags
            selected={writeSelected}
            modal={modal}
            onInit={onInit}
            tags={tags}
            onSelect={onSelect}
            colorsMap={colorsMap}
        />
    );
}

export default TodoTagsContainer;
