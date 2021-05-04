import React from "react";
import styled from "styled-components";
import Button from "../common/Button";
import TodoTagsContainer from "../../containers/todo/TodoTagsContainer";

const Fullscreen = styled.div`
    position: fixed;
    z-index: 30;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.25);
    display: flex;
    justify-content: center;
    align-items: center;
`;

const AskModalBlock = styled.div`
    width: 320px;
    background: white;
    padding: 1.5rem;
    border-radius: 4px;
    box-shadow: 0px 0px 8px rgba(0, 0, 0, 0.125);
    h2 {
        margin-top: 0;
        margin-bottom: 1rem;
    }
    p {
        margin-bottom: 3rem;
    }
    .buttons {
        display: flex;
        justify-content: flex-end;
    }
`;

const StyledButton = styled(Button)`
    height: 2rem;
    & + & {
        margin-left: 0.75rem;
    }
`;

type AskModalProps = {
    isFix?: boolean;
    beforeBody?: string | null;
    visible: boolean;
    title: string;
    onConfirm?: () => void;
    onCancel?: () => void;
    onChangeField?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
};
function Modal({
    isFix,
    beforeBody,
    visible,
    title,
    onConfirm,
    onCancel,
    onChangeField,
}: AskModalProps) {
    if (!visible) return null;
    return (
        <Fullscreen>
            <AskModalBlock>
                <h2>{title}</h2>
                <TodoTagsContainer modal={true} />
                <textarea
                    onChange={onChangeField}
                    placeholder={
                        beforeBody && isFix ? beforeBody : "할 일을 입력하세요"
                    }
                />
                <div className="buttons">
                    <StyledButton onClick={onCancel}>취소</StyledButton>
                    <StyledButton cyan onClick={onConfirm}>
                        확인
                    </StyledButton>
                </div>
            </AskModalBlock>
        </Fullscreen>
    );
}

export default Modal;
