import React from "react";
import AddTodo from "./components/AddTodo";

import "./index.scss";

const App = () => {
  return (
    <div className="app">
      <div className="wrapper">
        <header className="header">Burja TODO</header>
        <main className="main">
          <AddTodo />
        </main>
      </div>
    </div>
  );
};

export default App;
