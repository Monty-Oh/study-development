import React, { useState, useCallback } from "react";
import styled from "styled-components";

import TodoModalContainer from "../../containers/todo/TodoModalContainer";
import Button from "../common/Button";

const StyledTodoFooter = styled.div`
    width: 100%;
    background: none;
    text-align: center;
    .buttons {
        display: inline-block;
    }
`;

const StyledButton = styled(Button)`
    font-size: 1.125rem;
    display: inline-flex;

    & + & {
        margin: 2px;
    }
`;

type TodoFooterProps = {
    onDelete: () => void;
    onDone: () => void;
    InitTodo: () => void;
    checkedIds: number[];
};

function TodoFooter({
    onDelete,
    onDone,
    checkedIds,
    InitTodo,
}: TodoFooterProps) {
    const [visible, setVisible] = useState<boolean>(false);

    // 여기에도 state 초기화
    const onClicked = useCallback(() => {
        InitTodo();
        setVisible(!visible);
    }, [visible, InitTodo]);

    return (
        <StyledTodoFooter>
            <div className="buttons">
                <TodoModalContainer
                    isFix={true}
                    visible={visible}
                    setVisible={setVisible}
                    title={"Todo 수정"}
                    onCancel={onClicked}
                />
                <StyledButton onClick={() => onDone()}>확인</StyledButton>
                <StyledButton
                    onClick={() => {
                        return checkedIds.length === 1
                            ? onClicked()
                            : alert("항목은 하나만 선택하세요!");
                    }}
                >
                    수정
                </StyledButton>
                <StyledButton onClick={() => onDelete()}>삭제</StyledButton>
            </div>
        </StyledTodoFooter>
    );
}

export default TodoFooter;
