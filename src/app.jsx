import React, { lazy, Suspense } from "react";
import Home from "./home";
import Login from './login';




const App = () => {
  return (
      <div>
        <Home/>
        <Login />
      </div>
  );
};

export default App;
