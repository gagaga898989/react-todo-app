import React from "react";
import { Todo } from "./types";
//import { Rimittime } from "./timerimit";
import TodoItem from "./TodoItem";

type Props = {
  todos: Todo[];
  updateIsDone: (id: string, value: boolean) => void; // ◀◀ 追加
  remove: (id: string) => void; // ◀◀ 追加
};

const TodoList = (props: Props) => {
  const todos = props.todos;

  if (todos.length === 0) {
    return (
      <div className="text-red-500">
        現在、登録されているタスクはありません。
      </div>
    );
  }

  const isOverdue = (deadline: Date | null) => {
    if (!deadline) return false;
    return new Date() > deadline;
  };

  return (
    <div className="space-y-1">
      {todos.map((todo) => (
        <div
          key={todo.id}
          className={`rounded-md border p-2 shadow-sm ${isOverdue(todo.deadline) ? "bg-red-100" : ""} ${todo.isDone ? "bg-gray-300 line-through" : ""}`}
        >
          <TodoItem
            todo={todo}
            updateIsDone={props.updateIsDone}
            remove={props.remove}
          />
        </div>
      ))}
    </div>
  );
};

export default TodoList;
