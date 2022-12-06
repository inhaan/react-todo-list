import { ReactNode, memo } from "react";
import styled from "styled-components";

interface TodoListProps {
  children?: ReactNode;
}

const Container = styled.ul`
  min-height: 15rem;
  padding-top: 0.5rem;
  padding-bottom: 1rem;
`;

const TodoList = ({ children }: TodoListProps) => {
  return <Container>{children}</Container>;
};

export default memo(TodoList);
