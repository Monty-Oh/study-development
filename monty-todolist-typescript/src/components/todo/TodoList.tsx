import React from "react";
import styled from "styled-components";
import { BiCheckbox, BiCheckboxSquare } from "react-icons/bi";

import palette from "../../lib/styles/palette";
import Button from "../common/Button";
import { TodoState } from "../../modules/todo/todoTypes";

const StyledTodoListItem = styled.div`
    align-items: center;
    height: 5rem;
    overflow: auto;
    display: flex;
    &:nth-child(even) {
        background-color: #f8f9fa;
    }
    & + & {
        border-top: 2px solid #dee2e6;
    }

    .check {
        cursor: pointer;
        font-size: 2rem;
        margin: 1px;
        &:hover {
            color: #868e96;
        }
    }

    .wrapper {
        .body {
            display: flex;
            vertical-align: center;
            font-size: 1.5rem;
            overflow: auto;
        }

        .done {
            color: ${palette.gray[4]};
            text-decoration: line-through;
        }

        .tags {
            display: flex;
            text-align: left;
            &:nth-child(n) {
                margin-left: 1px;
            }
        }
    }
`;

const TodoTagsButton = styled(Button)`
    font-size: 0.8rem;
    height: 1.125rem;
    margin: 1px;
`;

type TodoListItemProps = {
    id: number;
    body: string;
    tags: string[];
    done: boolean;
    colorsMap: Map<string, string>;
    checked: boolean;
    onCheck: (id: number) => void;
};

function TodoListItem({
    id,
    body,
    tags,
    done,
    colorsMap,
    checked,
    onCheck,
}: TodoListItemProps) {
    return (
        <StyledTodoListItem>
            <div>
                {checked ? (
                    <BiCheckboxSquare
                        className="check"
                        onClick={() => onCheck(id)}
                    />
                ) : (
                    <BiCheckbox className="check" onClick={() => onCheck(id)} />
                )}
            </div>

            <div className="wrapper">
                {done ? (
                    <div className="done body">{body}</div>
                ) : (
                    <div className="body">{body}</div>
                )}
                <div className="tags">
                    {tags.map((tag) => (
                        <TodoTagsButton key={tag} color={colorsMap.get(tag)}>
                            #{tag}
                        </TodoTagsButton>
                    ))}
                </div>
            </div>
        </StyledTodoListItem>
    );
}

const StyledTodoList = styled.div`
    margin-top: 1rem;
`;

type TodoListProps = {
    todos: TodoState[];
    colorsMap: Map<string, string>;
    checkedIds: number[];
    onCheck: (id: number) => void;
};

function TodoList({ todos, colorsMap, checkedIds, onCheck }: TodoListProps) {
    return (
        <StyledTodoList>
            {todos.map((todo) =>
                checkedIds.includes(todo.id) ? (
                    <TodoListItem
                        id={todo.id}
                        key={todo.id}
                        body={todo.body}
                        tags={todo.tags}
                        done={todo.done}
                        colorsMap={colorsMap}
                        checked={true}
                        onCheck={onCheck}
                    />
                ) : (
                    <TodoListItem
                        id={todo.id}
                        key={todo.id}
                        body={todo.body}
                        tags={todo.tags}
                        done={todo.done}
                        colorsMap={colorsMap}
                        checked={false}
                        onCheck={onCheck}
                    />
                )
            )}
        </StyledTodoList>
    );
}

export default TodoList;
