import React, { useState } from "react";
import MultiSelectDropdown from "./MultiSelectDropdown";
import "./TaskApp.css";

function TaskApp() {
  const departments = [
    { id: 1, name: "ადმინისტრაციის დეპარტამენტი" },
    { id: 2, name: "ადამიანური რესურსების დეპარტამენტი" },
    { id: 3, name: "ფინანსების დეპარტამენტი" },
    { id: 4, name: "გაყიდვები და მარკეტინგის დეპარტამენტი" },
    { id: 5, name: "ლოჯოსტიკის დეპარტამენტი" },
    { id: 6, name: "ტექნოლოგიების დეპარტამენტი" },
    { id: 7, name: "მედიის დეპარტამენტი" }
  ];
 
  const priorities = [
    {"id": 1, "name": "დაბალი", "icon": "https://momentum.redberryinternship.ge/storage/priority-icons/Low.svg"},
    {"id": 2, "name": "საშუალო", "icon": "https://momentum.redberryinternship.ge/storage/priority-icons/Medium.svg"},
    {"id": 3, "name": "მაღალი", "icon": "https://momentum.redberryinternship.ge/storage/priority-icons/High.svg"}
  ]

  const workers = [
    {"id": 1, "name": "ლადო", "surname": "გაგა", "avatar": "", "department_id": 1}
  ]


  
  const [selectedValuesDepartment, setSelectedValuesDepartment] = useState([]);
  const [selectedValuesPriority, setSelectedValuesPriority] = useState([]);
  const [selectedValuesWorker, setSelectedValuesWorker] = useState([]);

  const [openDropdown, setOpenDropdown] = useState(null);

  return (
    <div>
      <div className="page-title">დავალებების გვერდი</div>
      <div className="filter-tool">
          <MultiSelectDropdown
            options={departments}
            value={selectedValuesDepartment}
            onChange={setSelectedValuesDepartment}
            class='department'
            label='დეპარტამენტი'
            isOpen={openDropdown === "department"}
            setOpenDropdown={() => setOpenDropdown(openDropdown === "department" ? null : "department")}
            setOpenDropdownToNull={()=> setOpenDropdown(null)}
          />
          <MultiSelectDropdown
            options={priorities}
            value={selectedValuesPriority}
            onChange={setSelectedValuesPriority}
            class='priority'
            label='პრიორიტეტი'
            isOpen={openDropdown === "priority"}
          setOpenDropdown={() => setOpenDropdown(openDropdown === "priority" ? null : "priority")}
          setOpenDropdownToNull={()=> setOpenDropdown(null)}
          />
          <MultiSelectDropdown
            options={workers}
            value={selectedValuesWorker}
            onChange={setSelectedValuesWorker}
            class='worker'
            label='თანამშრომელი'
            isOpen={openDropdown === "worker"}
          setOpenDropdown={() => setOpenDropdown(openDropdown === "worker" ? null : "worker")}
          setOpenDropdownToNull={()=> setOpenDropdown(null)}
          />
      </div>
    </div>
  );
}

export default TaskApp;
