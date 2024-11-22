import React, { useState } from "react";
import "./User2.css"; // CSSファイルをインポート

interface User2Props {
  onLogin: (username: string) => void;
}

const User2: React.FC<User2Props> = ({ onLogin }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    // ログイン処理をここに追加
    console.log("Username:", username);
    console.log("Password:", password);
    onLogin(username); // ユーザー名をApp.tsxに渡す
  };

  return (
    <div className="user2-modal">
      <h2>ようこそ！</h2>
      <div className="input-group">
        <label htmlFor="username">ユーザー名</label>
        <input
          type="text"
          id="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <div className="input-group">
        <label htmlFor="password">パスワード</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <button onClick={handleLogin}>ログイン</button>
    </div>
  );
};

export default User2;
