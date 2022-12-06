import { ChangeEvent, useCallback, memo } from "react";
import styled, { css } from "styled-components";
import { IoIosRemoveCircleOutline } from "react-icons/io";
import { Todo } from "../interfaces";

interface TodoItemProps {
  todo: Todo;
  onChangeTodoComplete?(id: string, complete: boolean): void;
  onRemoveTodo?(id: string): void;
}

interface ContentsProps {
  complete: boolean;
}

const Container = styled.li`
  display: flex;
  justify-content: space-between;
  padding: 0.7rem 0.7rem;
`;

const CheckBox = styled.input`
  cursor: pointer;
`;

const Contents = styled.div<ContentsProps>`
  flex: 1 0;
  padding: 0 1rem;

  ${(props) =>
    props.complete &&
    css`
      color: #888;
      text-decoration: line-through;
    `}
`;

const BtnRemove = styled.button`
  border: none;
  background-color: transparent;
  font-size: 1.2rem;
  color: crimson;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    color: #a40f2d;
  }
`;

const TodoItem = ({
  todo,
  onChangeTodoComplete,
  onRemoveTodo,
}: TodoItemProps) => {
  const { id, contents, complete } = todo;

  const onClickRemove = useCallback((id: string) => {
    onRemoveTodo?.(id);
  }, []);

  const onChangeComplete = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    onChangeTodoComplete?.(id, e.target.checked);
  }, []);

  return (
    <Container>
      <CheckBox
        type="checkbox"
        checked={complete}
        onChange={onChangeComplete}
      ></CheckBox>
      <Contents complete={complete}>{contents}</Contents>
      <BtnRemove onClick={() => onClickRemove(id)}>
        <IoIosRemoveCircleOutline />
      </BtnRemove>
    </Container>
  );
};

export default memo(TodoItem);
