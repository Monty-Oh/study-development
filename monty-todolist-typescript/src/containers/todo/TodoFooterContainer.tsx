import React, { useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";

import { deleteTodo, doneTodo } from "../../modules/todos/todosActions";
import { initialize } from "../../modules/todo/todoActions";
import { RootState } from "../../modules";
import TodoFooter from "../../components/todo/TodoFooter";

function TodoFooterContainer() {
    const dispatch = useDispatch();
    const { checkedIds } = useSelector(({ todos }: RootState) => ({
        checkedIds: todos.checkedIds,
    }));

    const onDelete = useCallback(() => {
        dispatch(deleteTodo());
    }, [dispatch]);

    const onDone = useCallback(() => {
        dispatch(doneTodo());
    }, [dispatch]);

    const InitTodo = useCallback(() => {
        dispatch(initialize());
    }, [dispatch]);

    return checkedIds.length !== 0 ? (
        <TodoFooter
            onDelete={onDelete}
            onDone={onDone}
            checkedIds={checkedIds}
            InitTodo={InitTodo}
        />
    ) : null;
}

export default TodoFooterContainer;
