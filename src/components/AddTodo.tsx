import {
  ChangeEvent,
  KeyboardEvent,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import styled from "styled-components";

import { AiOutlinePlus } from "react-icons/ai";

interface AddTodoProps {
  onAddTodo?(contents: string): void;
}

const Container = styled.div`
  display: flex;
  justify-content: space-between;
`;

const TodoInput = styled.input`
  flex: 1 0;
  border: none;
  background-color: #333;
  color: #eee;
  padding: 0.8rem 0.5rem;
  transition: all 0.1s ease;

  &::placeholder {
    color: #aaa;
  }

  &:focus {
    outline: none;
    background-color: #222;
  }
`;

const BtnAdd = styled.button`
  color: #eee;
  border: none;
  background-color: #777;
  padding: 0.5rem 1rem;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background-color: #555;
  }
`;

const AddTodo = ({ onAddTodo }: AddTodoProps) => {
  const [contents, setContents] = useState("");
  const contentsRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    contentsRef.current?.focus();
  }, []);

  const addTodo = useCallback(() => {
    const contents = contentsRef.current?.value;
    if (!contents) {
      alert("할 일을 입력해 주세요");
      return;
    }
    onAddTodo?.(contents);
    setContents("");
    contentsRef.current?.focus();
  }, []);

  const onChangeContents = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setContents(e.target.value);
  }, []);

  const onKeyDownContents = useCallback(
    (e: KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter") {
        addTodo();
      }
    },
    [addTodo]
  );

  const onClickAdd = useCallback(() => {
    addTodo();
  }, [addTodo]);

  return (
    <Container>
      <TodoInput
        type="text"
        ref={contentsRef}
        value={contents}
        onChange={onChangeContents}
        onKeyDown={onKeyDownContents}
        placeholder="할 일을 입력하세요"
      ></TodoInput>
      <BtnAdd onClick={onClickAdd}>
        <AiOutlinePlus />
      </BtnAdd>
    </Container>
  );
};

export default AddTodo;
