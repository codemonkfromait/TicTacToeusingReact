import React from "react";
import "./App.css";
import { useState } from "react";

const App = () => {
  const [count, setCount] = useState(0);
  return (
    <div className="App">
      <header>
        <h1>This a simple counter app using states</h1>
      </header>
      <h2>Current value of count is :{count}</h2>

      <button onClick={() => setCount(0)}>Reset counter</button>
      <button onClick={() => (count > 9 ? "" : setCount(count + 1))}>
        Increment counter
      </button>
      <button onClick={() => (count < 1 ? "" : setCount(count - 1))}>
        Decrement counter
      </button>
    </div>
  );
};

export default App;
