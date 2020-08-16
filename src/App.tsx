import React from "react";
import "./App.css";
import LaunchList from "./Components/LaunchList/LaunchList";
import Details from "./Components/Details/Details";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {

  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<LaunchList />} />
           <Route path=":mission" element={<Details  />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
