import React, { useState } from "react";

const CountMany: React.FC = () => {
  const [count, setCount] = useState(0);

  const handleClick = () => {
    setCount(count + 1000);
  };

  return (
    <div>
      <p>現在の金額: {count}円</p>
      <button onClick={handleClick}>金額を増やす</button>
    </div>
  );
};

export default CountMany;
