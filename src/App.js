import { Route, BrowserRouter, Routes } from "react-router-dom";
import Home from './components/Home.jsx'
import React from 'react'

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Home />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
