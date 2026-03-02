import React, { useState, useEffect } from "react";
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

  const getEncouragementMessage = (points: number): string => {
    if (points >= 5) {
      return "素晴らしい！今日はたくさんのタスクを完了しましたね！";
    } else if (points >= 3) {
      return "よく頑張りました！もう少しで目標達成です！";
    } else if (points > 0) {
      return "良いスタートです！引き続き頑張りましょう！";
    } else {
      return "今日はまだタスクが完了していません。頑張ってください！";
    }
  };

  const encouragementMessage = getEncouragementMessage(points);

  const [omikujiResult, setOmikujiResult] = useState<string | null>(null);
  const [totalPoints, setTotalPoints] = useState<number>(() => {
    const savedPoints = localStorage.getItem("totalPoints");
    return savedPoints ? parseInt(savedPoints, 10) : 0;
  }); // 所持ポイントを管理するステートを追加

  useEffect(() => {
    localStorage.setItem("totalPoints", totalPoints.toString());
  }, [totalPoints]);

  const drawOmikuji = () => {
    if (totalPoints >= 2) {
      const results = ["大吉", "中吉", "小吉", "吉", "末吉", "凶"];
      const randomResult = results[Math.floor(Math.random() * results.length)];
      setOmikujiResult(randomResult);
      setTotalPoints(totalPoints - 2); // おみくじを引く際に2ポイント消費
    } else {
      setOmikujiResult("ポイントが足りません");
    }
  };

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
      <p>今日の獲得ポイント: {points}</p>
      <p>所持ポイント: {totalPoints}</p>
      <p>{encouragementMessage}</p>
      <button onClick={drawOmikuji}>おみくじを引く</button>
      {omikujiResult && <p>おみくじの結果: {omikujiResult}</p>}
    </div>
  );
};

export default FireOrbit;
