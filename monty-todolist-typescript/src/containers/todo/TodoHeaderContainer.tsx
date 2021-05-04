import React, { useCallback } from "react";
import { useDispatch } from "react-redux";

import { initialize } from "../../modules/todo/todoActions";
import TodoHeader from "../../components/todo/TodoHeader";

function TodoHeaderContainer() {
    const dispatch = useDispatch();
    const InitTodo = useCallback(() => {
        dispatch(initialize());
    }, [dispatch]);
    return <TodoHeader InitTodo={InitTodo} />;
}

export default TodoHeaderContainer;
