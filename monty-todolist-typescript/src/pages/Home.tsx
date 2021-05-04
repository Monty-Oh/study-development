import React from "react";
import Responsive from "../components/common/Responsive";
import TodoHeaderContainer from "../containers/todo/TodoHeaderContainer";
import TodoTagsContainer from "../containers/todo/TodoTagsContainer";
import TodoListContainer from "../containers/todo/TodoListContainer";
import TodoFooterContainer from "../containers/todo/TodoFooterContainer";

import styled from "styled-components";

const HomeBlock = styled(Responsive)`
    border: 2px solid black;
`;

function Home() {
    return (
        <HomeBlock>
            <TodoHeaderContainer />
            <TodoTagsContainer />
            <TodoListContainer />
            <TodoFooterContainer />
        </HomeBlock>
    );
}

export default Home;
