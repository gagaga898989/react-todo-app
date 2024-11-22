# TodoApp

React、TypeScript、Tailwind CSS を使用し、ローカルストレージでデータを永続化した「Todoアプリ」です。

## 開発履歴

- 2024年10月24日：プロジェクト開始
- 2024年11月22日：追加機能実装

## アプリの利用方法

！ログイン方法はユーザ名のみで暗記しています。
　ユーザー名が一致していればそのユーザ名の際に変更したTodolistが表示されます。
　注意書きの通りゲストモードでの変更は保存されません。
　パスワード認証は現在開発中です。
　ユーザー名を登録してログインするとデフォルトのTodoが表示されます
　リロード表示するとログアウトした状態でゲストモードに戻りますが、再度ログインすることで
　変更したタスクの画面が表示されます。

完了履歴は今日完了したタスクの数が表示されます。
　完了したタスクと重要度に応じてポイントがたまり、そのポイントに応じてメッセージが変化し　ます

##　将来の展望

ログイン機能とポイント機能があるので、タスクやユーザー情報を
　ローカルストレージではなくデータサーバーに変更することでグローバルに使用できます。
　また、ミニゲームアプリ等と連携することによって、今日完了したタスクの
　ポイントに応じて遊べるゲームが増える等ご褒美機能の実装も考えています。

## ライセンス

MIT License

Copyright (c) 2024 Fkota

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
