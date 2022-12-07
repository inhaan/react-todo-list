import { useReducer, useState } from "react";
import { Todo } from "../interfaces";

interface TodoAddAction {
  type: "ADD";
  contents: string;
}
interface TodoAddTodosAction {
  type: "ADD_TODOS";
  todos: Todo[];
}
interface TodoChangeCompleteAction {
  type: "CHANGE_COMPLETE";
  id: string;
  complete: boolean;
}
interface TodoRemoveAction {
  type: "REMOVE";
  id: string;
}
interface TodoRemoveAllAction {
  type: "REMOVE_ALL";
}

export type TodoAction =
  | TodoAddAction
  | TodoAddTodosAction
  | TodoRemoveAction
  | TodoRemoveAllAction
  | TodoChangeCompleteAction;

const todoReducer = (state: Todo[], action: TodoAction) => {
  switch (action.type) {
    case "ADD": {
      const todo: Todo = {
        id: crypto.randomUUID(),
        contents: action.contents,
        complete: false,
      };
      return [...state, todo];
    }
    case "ADD_TODOS": {
      return [...state, ...action.todos];
    }
    case "CHANGE_COMPLETE": {
      const todo = state.find((x) => x.id === action.id);
      if (!todo) {
        return state;
      }

      const newState = [];
      for (const item of state) {
        if (item === todo) {
          newState.push({ ...item, complete: action.complete });
        } else {
          newState.push(item);
        }
      }
      return newState;
    }
    case "REMOVE": {
      return state.filter((x) => x.id != action.id);
    }
    case "REMOVE_ALL": {
      return [];
    }
    default: {
      return [...state];
    }
  }
};

const useTodoState = (todos: Todo[] = []) => {
  return useReducer(todoReducer, todos);
};

export default useTodoState;
