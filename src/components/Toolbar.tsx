import { useState, useCallback, ChangeEvent, KeyboardEvent } from "react";
import styled from "styled-components";
import { Todo } from "../interfaces";

const Container = styled.div`
  background-color: transparent;
  margin-bottom: 1rem;
  display: flex;
  gap: 1rem;
`;

interface ToolbarProps {
  onAddTodos?(todos: Todo[]): void;
  onRemoveAllTodo?(): void;
}

const Toolbar = ({ onAddTodos, onRemoveAllTodo }: ToolbarProps) => {
  const [count, setCount] = useState<string>("");

  const onChangeCount = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.value) {
      const newCount = +e.target.value;
      if (isNaN(newCount)) {
        return;
      }
      if (newCount < 1) {
        return;
      }
      if (newCount > 10000) {
        return;
      }
    }
    setCount(e.target.value);
  }, []);

  const createSample = useCallback(() => {
    const todos: Todo[] = [];
    for (let i = 0; i < +count; i++) {
      todos.push({
        id: crypto.randomUUID(),
        contents: `샘플 데이터 ${i}`,
        complete: false,
      });
    }
    onAddTodos?.(todos);
  }, [count]);

  const onClickCreateSample = useCallback(() => {
    createSample();
  }, [createSample]);

  const onKeyDownCreateSample = useCallback(
    (e: KeyboardEvent<HTMLInputElement>) => {
      if (e.key == "Enter") {
        createSample();
        setCount("");
      }
    },
    [createSample]
  );

  return (
    <Container>
      <div>
        <input
          type="text"
          value={count}
          placeholder="1~10000"
          onChange={onChangeCount}
          onKeyDown={onKeyDownCreateSample}
        ></input>
        <span>건 </span>
        <button onClick={onClickCreateSample}>샘플 데이터 생성</button>
      </div>
      <button onClick={onRemoveAllTodo}>전체삭제</button>
    </Container>
  );
};

export default Toolbar;
