import React, { useCallback, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { RootState } from "../../modules";
import { changeField, initialize } from "../../modules/todo/todoActions";
import { addTodo, fixTodo } from "../../modules/todos/todosActions";
import { TodoState } from "../../modules/todo/todoTypes";
import TodoModal from "../../components/todo/TodoModal";

type TodoModalContainerProps = {
    isFix?: boolean;
    visible: boolean;
    title: string;
    onCancel: () => void;
    setVisible: (visible: boolean) => void;
};
function TodoModalContainer({
    isFix,
    visible,
    title,
    onCancel,
    setVisible,
}: TodoModalContainerProps) {
    const [beforeBody, setBeforeBody] = useState<string | null>(null);
    const dispatch = useDispatch();
    const { body, tags, checkedIds, todos } = useSelector(
        ({ todo, todos }: RootState) => ({
            body: todo.body,
            tags: todo.tags,
            checkedIds: todos.checkedIds,
            todos: todos.todos,
        })
    );

    const onChangeField = useCallback(
        (e: React.ChangeEvent<HTMLTextAreaElement>) => {
            dispatch(changeField(e.target.value));
        },
        [dispatch]
    );
    const onConfirm = useCallback(() => {
        isFix
            ? dispatch(fixTodo({ body, tags }))
            : dispatch(addTodo({ body, tags }));
        dispatch(initialize());
        setVisible(!visible);
    }, [dispatch, body, tags, setVisible, visible, isFix]);

    useEffect(() => {
        checkedIds.length === 1
            ? setBeforeBody(
                  todos[
                      todos.findIndex(
                          (todo: TodoState) => todo.id === checkedIds[0]
                      )
                  ].body
              )
            : setBeforeBody(null);
    }, [checkedIds, todos]);

    return (
        <TodoModal
            isFix={isFix}
            onChangeField={onChangeField}
            visible={visible}
            title={title}
            onCancel={onCancel}
            onConfirm={onConfirm}
            beforeBody={beforeBody}
        />
    );
}

export default TodoModalContainer;
