import React, { useState } from "react";
import { Todo } from "./types";
import { twMerge } from "tailwind-merge";
import dayjs from "dayjs";
import { v4 as uuid } from "uuid";

interface AddTaskProps {
  onAdd: (todo: Todo) => void;
}

const AddTask: React.FC<AddTaskProps> = ({ onAdd }) => {
  const [newTodoName, setNewTodoName] = useState("");
  const [newTodoPriority, setNewTodoPriority] = useState(3);
  const [newTodoDeadline, setNewTodoDeadline] = useState<Date | null>(null);
  const [newTodoNameError, setNewTodoNameError] = useState("");

  const isValidTodoName = (name: string): string => {
    if (name.length < 2 || name.length > 32) {
      return "2文字以上、32文字以内で入力してください";
    } else {
      return "";
    }
  };

  const updateNewTodoName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewTodoNameError(isValidTodoName(e.target.value));
    setNewTodoName(e.target.value);
  };

  const updateNewTodoPriority = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewTodoPriority(Number(e.target.value));
  };

  const updateDeadline = (e: React.ChangeEvent<HTMLInputElement>) => {
    const dt = e.target.value;
    setNewTodoDeadline(dt === "" ? null : new Date(dt));
  };

  const addNewTodo = async () => {
    const err = isValidTodoName(newTodoName);
    if (err !== "") {
      setNewTodoNameError(err);
      return;
    }

    const newTodo: Todo = {
      id: uuid(),
      name: newTodoName,
      isDone: false,
      priority: newTodoPriority,
      deadline: newTodoDeadline,
    };

    try {
      // Mock API call
      const response = await fetch("/api/addTodo", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newTodo),
      });

      if (!response.ok) {
        throw new Error("タスク追加のAPIエラー");
      }

      onAdd(newTodo); // Add task to parent component state
      setNewTodoName("");
      setNewTodoPriority(3);
      setNewTodoDeadline(null);
    } catch (error) {
      console.error("タスク追加に失敗しました:", error);
    }
  };

  return (
    <div className="mt-5 space-y-2 rounded-md border p-3">
      <h2 className="text-lg font-bold">新しいタスクの追加</h2>
      <div>
        <div className="flex items-center space-x-2">
          <label className="font-bold" htmlFor="newTodoName">
            名前
          </label>
          <input
            id="newTodoName"
            type="text"
            value={newTodoName}
            onChange={updateNewTodoName}
            className={twMerge(
              "grow rounded-md border p-2",
              newTodoNameError && "border-red-500 outline-red-500"
            )}
            placeholder="2文字以上、32文字以内で入力してください"
          />
        </div>
        {newTodoNameError && (
          <div className="text-sm font-bold text-red-500">
            {newTodoNameError}
          </div>
        )}
      </div>

      <div className="flex gap-5">
        <div className="font-bold">優先度</div>
        {[1, 2, 3].map((value) => (
          <label key={value} className="flex items-center space-x-1">
            <input
              name="priorityGroup"
              type="radio"
              value={value}
              checked={newTodoPriority === value}
              onChange={updateNewTodoPriority}
            />
            <span>{value}</span>
          </label>
        ))}
      </div>

      <div className="flex items-center gap-x-2">
        <label htmlFor="deadline" className="font-bold">
          期限
        </label>
        <input
          type="datetime-local"
          id="deadline"
          value={
            newTodoDeadline
              ? dayjs(newTodoDeadline).format("YYYY-MM-DDTHH:mm:ss")
              : ""
          }
          onChange={updateDeadline}
          className="rounded-md border px-2 py-0.5"
        />
      </div>

      <button
        type="button"
        onClick={addNewTodo}
        className={twMerge(
          "rounded-md bg-indigo-500 px-3 py-1 font-bold text-white hover:bg-indigo-600",
          newTodoNameError && "cursor-not-allowed opacity-50"
        )}
      >
        追加
      </button>
    </div>
  );
};

export default AddTask;
