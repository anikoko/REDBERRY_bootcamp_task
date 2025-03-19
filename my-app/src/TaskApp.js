import React, { useState, useEffect } from "react";
import MultiSelectDropdown from "./MultiSelectDropdown";
import ShowTasksApp from "./ShowTasksApp";
import "./TaskApp.css";

const API_URL = "https://momentum.redberryinternship.ge/api";
const TOKEN = "9e75f618-7888-45c1-acc4-e9e0681adaf8";

function TaskApp() {
  const [departments, setDepartments] = useState()
  const [priorities, setPriorities] = useState()
  const [workers, setWorkers] = useState()
  const [tasks, setTasks] = useState([])

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
  }, []);
  
  const [filteredTasks, setFilteredTasks] = useState()

  useEffect(()=>{
    fetchData('tasks', setTasks)
    // setFilteredTasks(tasks)
    fetchData('tasks', setFilteredTasks)
  }, [])



  
  const [selectedValuesDepartment, setSelectedValuesDepartment] = useState([]);
  const [selectedValuesPriority, setSelectedValuesPriority] = useState([]);
  const [selectedValuesWorker, setSelectedValuesWorker] = useState([]);

  const [openDropdown, setOpenDropdown] = useState(null);

  const clearFilter = () => {

      setSelectedValuesDepartment([])
      setSelectedValuesPriority([])
      setSelectedValuesWorker([])
      
      setFilteredTasks(tasks)

  }

  let filteredTasks1 = tasks

  useEffect(() => {
    if (!tasks || tasks.length === 0) {
      setFilteredTasks([]);
      return;
    }
  
    const isFiltering = selectedValuesDepartment.length > 0 || 
                        selectedValuesPriority.length > 0 || 
                        selectedValuesWorker.length > 0;
  
    if (!isFiltering) {
      setFilteredTasks(tasks);
      return;
    }
  
    const filtered = tasks.filter(task => {
      const matchesDepartment = selectedValuesDepartment.length === 0 || selectedValuesDepartment.includes(task.department.name);
      const matchesPriority = selectedValuesPriority.length === 0 || selectedValuesPriority.includes(task.priority.name);
      const matchesWorker = selectedValuesWorker.length === 0 || selectedValuesWorker.includes(task.employee.name);
  
      return matchesDepartment && matchesPriority && matchesWorker;
    });
  
    setFilteredTasks(filtered);
  
  }, [tasks, selectedValuesDepartment, selectedValuesPriority, selectedValuesWorker]);
  
  
  
  return (
    <div>
      <div className="page-title">დავალებების გვერდი</div>
      <div className="filters-container">
        <div className="filter-tool">
            <MultiSelectDropdown
              options={departments}
              values={selectedValuesDepartment}
              onChange={setSelectedValuesDepartment}
              class='department'
              label='დეპარტამენტი'
              isOpen={openDropdown === "department"}
              setOpenDropdown={() => setOpenDropdown(openDropdown === "department" ? null : "department")}
              setOpenDropdownToNull={()=> setOpenDropdown(null)}
            />
            <MultiSelectDropdown
              options={priorities}
              values={selectedValuesPriority}
              onChange={setSelectedValuesPriority}
              class='priority'
              label='პრიორიტეტი'
              isOpen={openDropdown === "priority"}
            setOpenDropdown={() => setOpenDropdown(openDropdown === "priority" ? null : "priority")}
            setOpenDropdownToNull={()=> setOpenDropdown(null)}
            />
            <MultiSelectDropdown
              options={workers}
              values={selectedValuesWorker}
              onChange={setSelectedValuesWorker}
              class='worker'
              label='თანამშრომელი'
              isOpen={openDropdown === "worker"}
            setOpenDropdown={() => setOpenDropdown(openDropdown === "worker" ? null : "worker")}
            setOpenDropdownToNull={()=> setOpenDropdown(null)}
            />
        </div>
        <div>
          <button className="clear-filter-button" onClick={()=> clearFilter()}>გასუფთავება</button>              
        </div>
      </div>
      <div className="tasks">
      <div className="status-container-to-do">
        <ShowTasksApp
        status='to-do'
        statusText='დასაწყები'
        tasks={filteredTasks}
        color='#F7BC30'
        />
      </div>
      <div className="status-container-in-progress">
        <ShowTasksApp
        status='in-progress'
        statusText='პროგრესში'
        tasks={filteredTasks}
        color='#FB5607'
        />
      </div>
      <div className="status-container-ready-for-testing">
        <ShowTasksApp
        status='ready-for-testing'
        statusText='მზად ტესტირებისთვის'
        tasks={filteredTasks}
        color='#FF006E'
        />
      </div>
      <div className="status-container-finished">
        <ShowTasksApp
        status='finished'
        statusText='დასრულებული'
        tasks={filteredTasks}
        color='#3A86FF'
        />
      </div>
      </div>
    </div>
  );
}

export default TaskApp;
