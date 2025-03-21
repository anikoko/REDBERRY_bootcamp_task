import './App.css';
import NavBar from './NavBar';
import TaskApp from './TaskApp';
import InsideTaskApp from './InsideTaskApp';
import React, { useState, useEffect } from "react";
import { HashRouter as Router, Routes, Route } from "react-router-dom";

const API_URL = "https://momentum.redberryinternship.ge/api";
const TOKEN = "9e75f618-7888-45c1-acc4-e9e0681adaf8";

function App() {
  const [departments, setDepartments] = useState([])
  const [priorities, setPriorities] = useState([])
  const [workers, setWorkers] = useState([])
  const [tasks, setTasks] = useState([])
  const [statuses, setStatuses] = useState([])

  const [error, setError] = useState(null);

  const fetchData = async (name, setData) => {
    try {
      const response = await fetch(`${API_URL}/${name}`, {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${TOKEN}`,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status} ${response.statusText}`);
      }

      const result = await response.json();
      setData(result)
    } catch (err) {
      setError(err.message);
    }
  };

  useEffect(() => {
    fetchData('departments', setDepartments);
    fetchData('employees', setWorkers);
    fetchData('priorities', setPriorities);
    fetchData('statuses', setStatuses)
  }, []);
  
  
  useEffect(()=>{
    fetchData('tasks', setTasks)
  }, [])

  const [createEmployeeOverlay, setCreateEmployeeOverlay] = useState(false)

  return (
    <div>

    <Router basename="/REDBERRY_bootcamp_task">
      <NavBar 
      departments={departments}
      fetchData={fetchData}
      setWorkers={setWorkers}
      createEmployeeOverlay={createEmployeeOverlay}
      setCreateEmployeeOverlay={setCreateEmployeeOverlay}
      />  
      <Routes>
        <Route path="/" element={
          <TaskApp
              departments={departments}
              priorities={priorities}
              workers={workers}
              tasks={tasks}
          />} 
        />

        <Route path="/task" element={<InsideTaskApp statuses={statuses}/>} />
      </Routes>
    </Router>
    
    

    </div>
  );
}

export default App;
