import React from 'react';
import './TodoTemplate.scss';

const TodoTemplate = ({ children }) => {
    return (
        <div className="TodoTemplate">
            <div className="app-title">일정 관리 - React튜토리얼 by<a href="http://13.125.250.173:3000">ASSN2</a></div>
            <div className="content">{children}</div>
        </div>
    );
};

export default TodoTemplate;    