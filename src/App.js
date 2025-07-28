import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Hello from "./devbreak";
import Homepage from "./homepage";
import Login from "./login";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/register" element={<Hello />} />
          <Route path="/" element={<Homepage />} />
          <Route path="login" element={<Login/>} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
