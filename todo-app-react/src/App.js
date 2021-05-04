import React, { useReducer, useRef, useCallback } from 'react';
import TodoTemplate from './components/TodoTemplate';
import TodoInsert from './components/TodoInsert';
import TodoList from './components/TodoList';
import ReactLogo from './logo.svg';
import './App.scss';

const todoReducer = (todos, action) => {
  switch(action.type) {
    case 'INSERT':
      return todos.concat(action.todo);
    case 'REMOVE':
      return todos.filter(todo => todo.id !== action.id);
    case 'TOGGLE':
      return todos.map(todo => todo.id === action.id ? {...todo, checked: !todo.checked } : todo);
    default:
      return todos;
  }
}

const App = () => {
  const [ todos, dispatch ] = useReducer(todoReducer, [
    {
      id: 1,
      text: '테스트로 들어오는 요소입니다.',
      checked: false,
    },
    {
      id: 2,
      text: '할 일도 입력해 보세요',
      checked: false,
    },
    {
      id: 3,
      text: '체크도 가능합니다.',
      checked: true,
    }
  ])

  // const [ todos, dispatch ] = useReducer(todoReducer, undefined, createDummy);

  // 고유값으로 사용될 id
  const nextId = useRef(2501);

  const onInsert = useCallback((text) => {
      const todo = {
        id: nextId.current,
        text,
        checked: false,
      };
      dispatch({ type: 'INSERT', todo });
      nextId.current += 1;
    }, []);

  const onRemove = useCallback((id) => {
    dispatch({ type: 'REMOVE', id });
  }, []);

  const onToggle = useCallback((id) => {
    dispatch({ type: 'TOGGLE', id });
  }, []);

  return (
    <div className="App">
      <img src={ReactLogo} />
      <TodoTemplate>
        <TodoInsert onInsert={onInsert}/>
        <TodoList todos={todos} onRemove={onRemove} onToggle={onToggle}/>
      </TodoTemplate>
    </div>
  )
}

export default App;
