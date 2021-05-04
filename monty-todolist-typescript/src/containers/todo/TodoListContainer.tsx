import React, { useEffect, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";

import { RootState } from "../../modules";
import { filterTodos, checkTodo } from "../../modules/todos/todosActions";
import TodoList from "../../components/todo/TodoList";

function TodoListContainer() {
    const dispatch = useDispatch();
    const {
        todos,
        colorsMap,
        selected,
        filteredTodos,
        checkedIds,
    } = useSelector(({ todos, tags }: RootState) => ({
        todos: todos.todos,
        colorsMap: tags.colorsMap,
        selected: tags.selected,
        filteredTodos: todos.filteredTodos,
        checkedIds: todos.checkedIds,
    }));

    // 체크 함수
    const onCheck = useCallback(
        (id: number) => {
            dispatch(checkTodo(id));
        },
        [dispatch]
    );

    // 필터링함, selected에 변화가 감지될 때 마다..
    useEffect(() => {
        dispatch(filterTodos(selected));

        // 필터 선택 중에 만약 새로운 글이 생성되면 다시 필터링한다.
    }, [dispatch, selected, todos]);

    return selected.length !== 0 ? (
        <TodoList
            todos={filteredTodos}
            colorsMap={colorsMap}
            checkedIds={checkedIds}
            onCheck={onCheck}
        />
    ) : (
        <TodoList
            todos={todos}
            colorsMap={colorsMap}
            checkedIds={checkedIds}
            onCheck={onCheck}
        />
    );
}

export default TodoListContainer;
// connect