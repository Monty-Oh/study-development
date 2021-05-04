import React from "react";
import styled, { css } from "styled-components";
import palette from "../../lib/styles/palette";
import { Link } from "react-router-dom";

const buttonStyle = css`
    border: 2px solid white;
    border-radius: 4px;
    font-size: 1.5rem;
    font-weight: bold;
    padding: 0.25rem 1rem;
    color: white;
    outline: none;
    display: flex;
    align-items: center;
    cursor: pointer;
    background: ${palette.gray[8]};
    &:hover {
        background: ${palette.gray[6]};
    }
    ${(props: ButtonProps) =>
        props.selected &&
        css`
            border: 2px solid black;
        `}

    ${(props: ButtonProps) =>
        props.fullWidth &&
        css`
            padding-top: 0.75rem;
            padding-bottom: 0.75rem;
            width: 100%;
            font-size: 1.125rem;
        `} 
 
    ${(props: ButtonProps) =>
        props.cyan &&
        css`
            background: ${palette.cyan[5]};
            &:hover {
                background: ${palette.cyan[4]};
            }
        `}

        ${(props: ButtonProps) =>
        props.color &&
        css`
            background: ${props.color};
            &:hover {
                background: black;
            }
        `}
    &:disabled {
        background: ${palette.gray[3]};
        color: ${palette.gray[5]};
        cursor: not-allowed;
    }
`;

const StyledButton = styled.button`
    ${buttonStyle}
`;

const StyledLink = styled(Link)`
    ${buttonStyle}
`;

type ButtonProps = {
    fullWidth?: boolean;
    cyan?: boolean;
    to?: string;
    selected?: boolean;
    color?: string;
};

function Button(props: any) {
    return props.to ? (
        <StyledLink {...props} cyan={props.cyan ? 1 : 0} />
    ) : (
        <StyledButton {...props} />
    );
}

export default Button;
