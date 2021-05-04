import React from "react";
import styled from "styled-components";

const ResponsiveBlock = styled.div`
    padding-left: 1rem;
    padding-right: 1rem;
    width: 400px;
    margin: 0 auto; /* 중앙 정렬 */
    margin-top: 3rem;
`;

type ResponsiveProps = {
    children: React.ReactNode;
};

function Responsive({ children, ...rest }: ResponsiveProps) {
    return <ResponsiveBlock {...rest}>{children}</ResponsiveBlock>;
}

export default Responsive;
