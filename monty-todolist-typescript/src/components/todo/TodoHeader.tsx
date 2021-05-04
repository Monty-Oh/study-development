import React, { useState, useCallback } from "react";
import styled from "styled-components";
import { BsPlus } from "react-icons/bs";

import TodoModalContainer from "../../containers/todo/TodoModalContainer";
import Button from "../common/Button";

const StyledTodoTitle = styled.div`
    width: 100%;
    margin: 0;
    background-color: none;
    height: 4rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .title {
        font-size: 1.5rem;
    }
`;

type TodoHeaderProps = {
    InitTodo: () => void;
};

function TodoHeader({ InitTodo }: TodoHeaderProps) {
    const [visible, setVisible] = useState<boolean>(false);

    // 여기에 state 초기화
    const onClicked = useCallback(() => {
        InitTodo();
        setVisible(!visible);
    }, [visible, InitTodo]);

    return (
        <StyledTodoTitle>
            <div className="title">Monty - todo List</div>
            <TodoModalContainer
                visible={visible}
                setVisible={setVisible}
                title={"Todo 생성"}
                onCancel={onClicked}
            />
            <Button onClick={onClicked}>
                <BsPlus />
            </Button>
        </StyledTodoTitle>
    );
}

export default TodoHeader;
