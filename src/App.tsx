import { useCallback, useMemo } from "react";
import styled from "styled-components";
import AddTodo from "./components/AddTodo";
import Header from "./components/Header";
import TodoItem from "./components/TodoItem";
import TodoList from "./components/TodoList";
import Toolbar from "./components/Toolbar";
import useTodoState from "./hooks/useTodoState";
import { Todo } from "./interfaces";

const Container = styled.div`
  margin: 2rem auto 0;
  max-width: 500px;
`;

const Main = styled.div`
  border-radius: 0.3rem;
  background-color: #fff;
  overflow: hidden;
  box-shadow: rgba(0, 0, 0, 0.15) 0px 15px 25px,
    rgba(0, 0, 0, 0.05) 0px 5px 10px;
`;

const Message = styled.div`
  text-align: center;
  padding: 1rem;
  color: #888;
`;

function App() {
  const [todos, dispatch] = useTodoState();

  const onAddTodo = useCallback((contents: string) => {
    dispatch({ type: "ADD", contents });
  }, []);

  const onAddTodos = useCallback((todos: Todo[]) => {
    dispatch({ type: "ADD_TODOS", todos });
  }, []);

  const onChangeTodoComplete = useCallback((id: string, complete: boolean) => {
    dispatch({ type: "CHANGE_COMPLETE", id, complete });
  }, []);

  const onRemoveTodo = useCallback((id: string) => {
    dispatch({ type: "REMOVE", id });
  }, []);

  const onRemoveAllTodo = useCallback(() => {
    dispatch({ type: "REMOVE_ALL" });
  }, []);

  const sortedTodos = useMemo(() => {
    return [...todos].sort((a, b) => {
      if (a.complete !== b.complete) {
        return a.complete ? 1 : -1;
      }
      return 0;
    });
  }, [todos]);

  return (
    <Container>
      <Toolbar
        onAddTodos={onAddTodos}
        onRemoveAllTodo={onRemoveAllTodo}
      ></Toolbar>
      <Main>
        <Header></Header>
        <AddTodo onAddTodo={onAddTodo}></AddTodo>
        <TodoList>
          {sortedTodos.map((todo) => (
            <TodoItem
              key={todo.id}
              todo={todo}
              onChangeTodoComplete={onChangeTodoComplete}
              onRemoveTodo={onRemoveTodo}
            ></TodoItem>
          ))}
          {!sortedTodos.length && <Message>😄 할 일이 없습니다</Message>}
        </TodoList>
      </Main>
    </Container>
  );
}

export default App;
