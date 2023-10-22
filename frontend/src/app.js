import React from "react";
import { Routes, Route } from "react-router-dom";
import { PassageProvider } from "@passageidentity/passage-react";

import Home from "./views/Home"
import Login from "./views/Login";
import Dashboard from "./views/Dashboard";
import Profile from "./views/Profile";

import styles from "./styles/App.module.css";

function App() {
  return (
    <PassageProvider appId={process.env.REACT_APP_PASSAGE_APP_ID}>
      <div>
          <Routes>
          <Route path="/" element={<Home />}></Route>
            <Route path="/login" element={<Login />}></Route>
            <Route path="/login/welcome" element={<Dashboard />}></Route>
            <Route path="/profile" element={<Profile />}></Route>
          </Routes>
       
      </div>
    </PassageProvider>
  );
}
 
export default App;
