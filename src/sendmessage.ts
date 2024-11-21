import axios, { AxiosResponse } from "axios";

// LINE Notify API URL
const LINE_NOTIFY_URL = "https://notify-api.line.me/api/notify";

// アクセストークン（直接埋め込む）
const ACCESS_TOKEN: string = "8CytReyS29dbLA9nAenpnAHusKyz7kwifZIuo1DVRFa";

/**
 * LINE Notifyにメッセージを送信する関数
 * @param message - 送信するメッセージ
 * @returns Promise<void>
 */
export async function sendLineNotification(message: string): Promise<void> {
  try {
    const response: AxiosResponse = await axios.post(
      LINE_NOTIFY_URL,
      `message=${encodeURIComponent(message)}`,
      {
        headers: {
          Authorization: `Bearer ${ACCESS_TOKEN}`,
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );

    console.log("通知成功:", response.data);
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("通知失敗:", error.response?.data || error.message);
    } else {
      console.error("通知失敗: 予期しないエラー", error);
    }
  }
}
