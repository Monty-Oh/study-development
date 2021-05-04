import React, { useCallback } from 'react';
import { List } from 'react-virtualized';
import TodoListItem from './TodoListItem';
import './TodoList.scss';

const TodoList = ({ todos, onRemove, onToggle }) => {

    // react-virtualized의 List컴포넌트에서 각 TodoItem을 렌더링할 때 사용한다.
    // 이 함수를 List컴포넌트의 props로 설정해 주어야 하고, 함수는 파라미터에 index, key, style 값을 객체타입으로 받아와 사용한다.
    const rowRenderer = useCallback(({ index, key, style }) => {
        const todo = todos[index];
        return (
            <TodoListItem 
                todo={todo}
                key={key}
                onRemove={onRemove}
                onToggle={onToggle}
                style={style}
            />
        );
    }, [onRemove, onToggle, todos]);
    return (

        // List컴포넌트를 사용할 때는 해당 리스트의 전체 크기, 각 항목을 렌더링할 때 사용해야하는 함수, 배열을 props로 넣어주어야 한다.
        // 전달받은 props를 사용하여 자동으로 최적화 해준다.
        <List 
            className="TodoList"
            width={712} //전체크기
            height={513}    //  전체 높이
            rowCount={todos.length} // 항목 개수
            rowHeight={57}  // 항목 높이
            rowRenderer={rowRenderer}   // 항목을 렌더링할 때 쓰는 함수
            list={todos}    // 배열
            style={{ outline: 'none' }} //List에 기본 적용되는 outline 스타일 제거
        />
    );
};

export default React.memo(TodoList);