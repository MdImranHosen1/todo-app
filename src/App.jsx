import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import React from "react";
import { TodosList } from "./components/TodosList";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          exact
          path="/"
          element={
            <React.Fragment>
              <TodosList />
            </React.Fragment>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
