import React, { useState, useEffect } from "react";
import MultiSelectDropdown from "./MultiSelectDropdown";
import ShowTasksApp from "./ShowTasksApp";
import SingleSelectDropdown from "./SingleSelectDropdown";
import "./TaskApp.css";



function TaskApp(props) {
  
  const [filteredTasks, setFilteredTasks] = useState()

  useEffect(() => {
    setFilteredTasks(props.tasks);
  }, [props.tasks]);
  
  const [selectedValuesDepartment, setSelectedValuesDepartment] = useState([]);
  const [selectedValuesPriority, setSelectedValuesPriority] = useState([]);
  const [selectedValuesWorker, setSelectedValuesWorker] = useState([]);

  const [openDropdown, setOpenDropdown] = useState(null);

  const clearFilter = () => {

      setSelectedValuesDepartment([])
      setSelectedValuesPriority([])
      setSelectedValuesWorker([])
      
      setFilteredTasks(props.tasks)

  }

  let filteredTasks1 = props.tasks

  useEffect(() => {
    if (!props.tasks || props.tasks.length === 0) {
      setFilteredTasks([]);
      return;
    }
  
    const isFiltering = selectedValuesDepartment.length > 0 || 
                        selectedValuesPriority.length > 0 || 
                        selectedValuesWorker.length > 0;
  
    if (!isFiltering) {
      setFilteredTasks(props.tasks);
      return;
    }
  
    const filtered = props.tasks.filter(task => {
      const matchesDepartment = selectedValuesDepartment.length === 0 || selectedValuesDepartment.includes(task.department.name);
      const matchesPriority = selectedValuesPriority.length === 0 || selectedValuesPriority.includes(task.priority.name);
      const matchesWorker = selectedValuesWorker.length === 0 || selectedValuesWorker.includes(task.employee.id);
  
      return matchesDepartment && matchesPriority && matchesWorker;
    });
  
    setFilteredTasks(filtered);
  
  }, [props.tasks, selectedValuesDepartment, selectedValuesPriority, selectedValuesWorker]);

  const handleRemovingFilterOptionWuthButton = (option, data, setData) => {
      const newData = data.filter((value)=>value!=option)
      setData(newData)
  }

  const isFilterOn = selectedValuesDepartment.length > 0 || 
                      selectedValuesPriority.length > 0 || 
                      selectedValuesWorker.length > 0;


  return (
    <div>
      <div className="page-title">დავალებების გვერდი</div>
      <div className="filters-container">
        <div className="filter-tool">
            <MultiSelectDropdown
              options={props.departments}
              values={selectedValuesDepartment}
              onChange={setSelectedValuesDepartment}
              class='department'
              label='დეპარტამენტი'
              isOpen={openDropdown === "department"}
              setOpenDropdown={() => setOpenDropdown(openDropdown === "department" ? null : "department")}
              setOpenDropdownToNull={()=> setOpenDropdown(null)}
            />
            <MultiSelectDropdown
              options={props.priorities}
              values={selectedValuesPriority}
              onChange={setSelectedValuesPriority}
              class='priority'
              label='პრიორიტეტი'
              isOpen={openDropdown === "priority"}
            setOpenDropdown={() => setOpenDropdown(openDropdown === "priority" ? null : "priority")}
            setOpenDropdownToNull={()=> setOpenDropdown(null)}
            />
            <MultiSelectDropdown
              options={props.workers}
              values={selectedValuesWorker}
              onChange={setSelectedValuesWorker}
              class='worker'
              label='თანამშრომელი'
              isOpen={openDropdown === "worker"}
            setOpenDropdown={() => setOpenDropdown(openDropdown === "worker" ? null : "worker")}
            setOpenDropdownToNull={()=> setOpenDropdown(null)}
            />
        </div>
        <div className="show-selected-filters-container">
          <div className="selected-filters-department">
          {selectedValuesDepartment && selectedValuesDepartment.map((dep)=>{
            return <div className="filter-option-container">
              <div className="filter-option-text">{dep}</div>
              <button className="filter-option-x-button" onClick={()=>handleRemovingFilterOptionWuthButton(dep, selectedValuesDepartment, setSelectedValuesDepartment)}>
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="15" viewBox="0 0 14 15" fill="none">
                <path d="M10.5 4L3.5 11" stroke="#343A40" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M3.5 4L10.5 11" stroke="#343A40" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </button>
            </div>
          })}
          </div>
          <div className="selected-filters-priority">
          {selectedValuesPriority && selectedValuesPriority.map((priority)=>{
            return <div className="filter-option-container">
              <div className="filter-option-text">{priority}</div>
              <button className="filter-option-x-button" onClick={()=>handleRemovingFilterOptionWuthButton(priority, selectedValuesPriority, setSelectedValuesPriority)}>
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="15" viewBox="0 0 14 15" fill="none">
                <path d="M10.5 4L3.5 11" stroke="#343A40" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M3.5 4L10.5 11" stroke="#343A40" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </button>
            </div>
          })}
          </div>
          <div className="selected-filters-priority">
          {selectedValuesWorker && selectedValuesWorker.map((workerID)=>{
            const worker = props.workers.filter((worker)=>workerID==worker.id)
            console.log(worker)
            return <div className="filter-option-container">
              <div className="filter-option-text">{worker[0].name} {worker[0].surname}</div>
              <button className="filter-option-x-button" onClick={()=>handleRemovingFilterOptionWuthButton(workerID, selectedValuesWorker, setSelectedValuesWorker)}>
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="15" viewBox="0 0 14 15" fill="none">
                <path d="M10.5 4L3.5 11" stroke="#343A40" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M3.5 4L10.5 11" stroke="#343A40" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </button>
            </div>
          })}
          </div>
          <button className="clear-filter-button" onClick={()=> clearFilter()} style={{display: isFilterOn ? 'block' : 'none'}}>გასუფთავება</button>              
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
