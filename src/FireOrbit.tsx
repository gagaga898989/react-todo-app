import React from "react";
import { Todo } from "./types";
import "./FireOrbit.css"; // CSSファイルをインポート

interface FireOrbitProps {
  todos: Todo[];
}

const FireOrbit: React.FC<FireOrbitProps> = ({ todos }) => {
  const completedTasks = todos.filter((todo) => todo.isDone).length;
  const uncompletedTasks = todos.filter((todo) => !todo.isDone).length;

  const today = new Date();
  const todayCompletedTasks = todos.filter((todo) => {
    if (!todo.completedDate) return false;
    const completedDate = new Date(todo.completedDate);
    return (
      completedDate.getFullYear() === today.getFullYear() &&
      completedDate.getMonth() === today.getMonth() &&
      completedDate.getDate() === today.getDate()
    );
  });

  const todayPriorityCounts = todayCompletedTasks.reduce(
    (acc, todo) => {
      acc[todo.priority] = (acc[todo.priority] || 0) + 1;
      return acc;
    },
    {} as { [key: number]: number }
  );

  const points = todayCompletedTasks.reduce((acc, todo) => {
    return acc + todo.priority;
  }, 0);

  return (
    <div className="fire-orbit">
      <h2>タスクの統計情報</h2>
      <p>完了したタスクの数: {completedTasks}</p>
      <p>未完了のタスクの数: {uncompletedTasks}</p>
      <p>今日完了したタスクの数: {todayCompletedTasks.length}</p>
      <h3>今日完了したタスクの優先度ごとのタスク数</h3>
      <ul>
        {Object.keys(todayPriorityCounts).map((priority) => (
          <li key={priority}>
            優先度 {priority}: {todayPriorityCounts[Number(priority)]}
          </li>
        ))}
      </ul>
      <p>ポイント: {points}</p>
    </div>
  );
};

export default FireOrbit;
