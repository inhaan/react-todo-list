import { useReducer, useState } from "react";
import { Todo } from "../interfaces";

interface TodoAddAction {
  type: "ADD";
  contents: string;
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
export type TodoAction =
  | TodoAddAction
  | TodoRemoveAction
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
    case "CHANGE_COMPLETE": {
      const todo = state.find((x) => x.id === action.id);
      if (!todo) {
        return [...state];
      }
      todo.complete = action.complete; // TODO 불변성 유지해야 함
      return [...state];
    }
    case "REMOVE": {
      return state.filter((x) => x.id != action.id);
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
