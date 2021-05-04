import React, { useState, useCallback } from 'react';
import { MdAdd } from 'react-icons/md';
import './TodoInsert.scss';

const TodoInsert = ({ onInsert }) => {
    const [ value, setValue ] = useState('');

    const onChange = useCallback((e) => {
        setValue(e.target.value);
    }, []);

    //onClick의 경우에도 가능하지만, onSubmit은 엔터일 시 자동으로 작동된다. onKeyPress 이벤트를 추가로 안써도 됨.
    const onSubmit = useCallback((e) => {
        onInsert(value);
        setValue('');
        // 새로고침 방지
        e.preventDefault();
    }, [onInsert, value]);

    return (
        <form className="TodoInsert" onSubmit={onSubmit}>
            <input value={value} onChange={onChange} placeholder="할 일을 입력해 주세요"/>
            <button type="submit">
                <MdAdd />
            </button>
        </form>
    );
};

export default TodoInsert;