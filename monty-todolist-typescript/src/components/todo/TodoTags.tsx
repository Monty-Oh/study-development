import React, { useCallback, useState, useEffect } from "react";
import styled from "styled-components";

import Button from "../common/Button";

const StyledTodoTags = styled.div`
    display: flex;
    align-items: center;
    text-align: left;
    /* justify-content: space-between; */
`;

const TodoTagsButton = styled(Button)`
    font-size: 0.8rem;
    height: 1.125rem;
    margin: 1px;
`;

type TodoTagsProps = {
    tags: string[];
    selected: string[];
    colorsMap: Map<string, string>;
    modal?: boolean;
    onSelect: (tag: string) => void;
    onInit: () => void;
};

function TodoTags({
    tags,
    selected,
    colorsMap,
    modal,
    onSelect,
    onInit,
}: TodoTagsProps) {
    const [allSelected, setAllSelected] = useState<boolean>(false);
    const allClicked = useCallback(() => {
        onInit();
        setAllSelected(true);
    }, [onInit]);

    // 만약 다른 태그가 클릭되면 All은 해제된다.
    useEffect(() => {
        // selected 안에 뭔가 있을 때(선택 되었을 때)
        selected.length !== 0 && setAllSelected(false);
    }, [selected]);

    return (
        <StyledTodoTags>
            {!modal && (
                <TodoTagsButton
                    onClick={allClicked}
                    selected={allSelected}
                    cyan
                >
                    #All
                </TodoTagsButton>
            )}
            {tags.map((tag) => {
                return (
                    <TodoTagsButton
                        key={tag}
                        selected={selected.includes(tag)}
                        onClick={() => onSelect(tag)}
                        color={colorsMap.get(tag)}
                    >
                        #{tag}
                    </TodoTagsButton>
                );
            })}
        </StyledTodoTags>
    );
}

export default TodoTags;
