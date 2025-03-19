import './App.css';
import NavBar from './NavBar';
import TaskApp from './TaskApp';
import React, { useState, useEffect } from "react";

function App() {

  const [createEmployee, setCreateEmployee] = useState(false)

  return (
    <div>
    <NavBar setCreateEmployee={setCreateEmployee}/>  
    <TaskApp/>
    </div>
  );
}

export default App;
