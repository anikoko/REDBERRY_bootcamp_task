import './App.css';
import NavBar from './NavBar';
import TaskApp from './TaskApp';
import CreateEmployeeApp from './CreateEmployeeApp';
import React, { useState, useEffect } from "react";

function App() {

  const [createEmployeeOverlay, setCreateEmployeeOverlay] = useState(false)

  return (
    <div>
    <NavBar setCreateEmployeeOverlay={setCreateEmployeeOverlay}/>  
    <TaskApp
    createEmployeeOverlay={createEmployeeOverlay}
    setCreateEmployeeOverlay={setCreateEmployeeOverlay}/>

    </div>
  );
}

export default App;
