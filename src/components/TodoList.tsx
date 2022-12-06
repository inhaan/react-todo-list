import { ReactNode } from "react";
import styled from "styled-components";

interface TodoListProps {
  children?: ReactNode;
}

const Container = styled.ul`
  min-height: 15rem;
`;

const TodoList = ({ children }: TodoListProps) => {
  return <Container>{children}</Container>;
};

export default TodoList;
