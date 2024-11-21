import { Todo } from "./types";

export const Rimittime = (todo: Todo): string => {
  if (todo.isDone === true) {
    return `[済]${todo.name}`;
  } else {
    const currentTime = new Date();
    const deadlineTime = todo.deadline ? new Date(todo.deadline) : new Date();
    if (deadlineTime < currentTime) {
      //期限が過ぎた日数と時間を計算
      const diff = currentTime.getTime() - deadlineTime.getTime();
      return `[未] "${todo.name}" 期限切れ ${Math.floor(diff / (1000 * 60 * 60 * 24))}日${Math.floor((diff / (1000 * 60 * 60)) % 24)}時間`;
    } else {
      //期限までの残り日数と時間を計算
      const diff = deadlineTime.getTime() - currentTime.getTime();

      return `[未] "${todo.name}" 残り ${Math.floor(diff / (1000 * 60 * 60 * 24))}日${Math.floor((diff / (1000 * 60 * 60)) % 24)}時間`;
    }
  }
};
