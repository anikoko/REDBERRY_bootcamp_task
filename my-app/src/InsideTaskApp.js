import './InsideTaskApp.css';
import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import SingleSelectDropdown from './SingleSelectDropdown';
import CommentsApp from './CommentsApp'

const API_URL = "https://momentum.redberryinternship.ge/api";
const TOKEN = "9e75f618-7888-45c1-acc4-e9e0681adaf8";

function InsideTaskApp(props) {
    const [selectedStatus, setSelectedStatus] = useState()
    const [statusLabel, setStatusLabel] = useState()
    
    const location = useLocation();
    const navigate = useNavigate();
    const task = location.state.task;

    const isAvailable = task !== undefined; 

    const priorityColor = task.priority.id==1 ?  '#08A508' : (task.priority.id==2? '#FFBE0B' : '#FA4D4D')

    function formatDate(dateStr) {
        const [year, month, dayTime] = dateStr.split('-');
        const [day, time] = dayTime.split('T');
        
        const date = new Date(`${year}-${month}-${day}`);
        console.log(date.getDay())
        const daysOfWeek = ["კვი", "ორშ", "სამ", "ოთხ", "ხუთ", "პარ", "შაბ"];
        const dayOfWeek = daysOfWeek[date.getDay()];
        
        return `${dayOfWeek} - ${day}/${month}/${year}`;
    }
    
    function formatDepartmentName(name){
        let depName = name.replace("დეპარტამენტი", "").trim();

        let splitName = depName.split(" ")
        
        let shortened = ""
        if (splitName.length > 1){
            shortened = splitName.map(word => word.slice(0, 3) + ".").join(" ");

        } else {
            if (depName.length)
            shortened = depName.split("ის ").map(word =>  word.slice(0, 7) + ".")
        }

        return shortened;        
    }

  
    // 2221

    useEffect(()=>{
        setStatusLabel(task.status.name)
    },[])
    
    useEffect(()=>{
        const handleStatusChange = async () => {
            if (!selectedStatus || !props.statuses || !task) {
                return;
            }
        
            const status = props.statuses.find(stat => stat.name === selectedStatus);
            
            if (!status) {
                alert("Invalid status selected.");
                return;
            }
        
            console.log("Updating status for task:", task.id, "to status:", status.id);
        
            const requestData = { status_id: status.id };
        
            try {
                console.log("Sending payload:", JSON.stringify(requestData));
        
                const response = await fetch(`${API_URL}/tasks/${task.id}`, {
                    method: "PUT",
                    headers: {
                        "Authorization": `Bearer ${TOKEN}`,
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(requestData),
                });
                
                const responseText = await response.text();
        
                if (!response.ok) {
                    throw new Error(`Failed to update task status. ${responseText}`);
                }
        
                alert("Task status updated successfully!");
            } catch (error) {
                console.error("Fetch error:", error);
                alert(`Error: ${error.message}`);
            }
        };
        
        
        handleStatusChange()
        // setStatusLabel(selectedStatus)
    },[selectedStatus])


  return (
    <div className='inside-task'>

{ isAvailable &&    <div>
        <div className='title-description-priority-department'>
            <div className='priority-department-title'>
                <div className='priority-department'>
                    <div className='task-priority' style={{borderColor:  priorityColor }}>
                        <img src={task.priority.icon} className='task-priority-img'></img>
                        <div className='task-priority-text' style={{color:  priorityColor }}>{task.priority.name}</div>
                    </div>
                    <div className='department'>{formatDepartmentName(task.department.name)}</div>
                </div>
                <div className='title'>{task.name}</div>
            </div>
            <div className='description'>{task.description}</div>
        </div>
        <div className='details-container'>
            <div className='details-title'>დავალების დეტალები</div>
            <div className='details'>
                <div className='status-details'>
                    <div className='status'>
                        <div className='status-icon'>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                            <path d="M21.2104 15.8901C20.5742 17.3946 19.5792 18.7203 18.3123 19.7514C17.0454 20.7825 15.5452 21.4875 13.9428 21.8049C12.3405 22.1222 10.6848 22.0422 9.12055 21.5719C7.55627 21.1015 6.13103 20.2551 4.96942 19.1067C3.80782 17.9583 2.94522 16.5428 2.45704 14.984C1.96886 13.4252 1.86996 11.7706 2.169 10.1647C2.46804 8.55886 3.1559 7.05071 4.17245 5.77211C5.189 4.49351 6.50329 3.4834 8.0004 2.83008" stroke="#474747" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                            <path d="M22 12C22 10.6868 21.7413 9.38642 21.2388 8.17317C20.7362 6.95991 19.9997 5.85752 19.0711 4.92893C18.1425 4.00035 17.0401 3.26375 15.8268 2.7612C14.6136 2.25866 13.3132 2 12 2V12H22Z" stroke="#474747" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                            </svg>
                        </div>
                        <div className='task-status-text'>სტატუსი</div>
                    </div>
                    <div className='change-status'>
                        <SingleSelectDropdown
                        options={props.statuses}
                        value={selectedStatus}
                        onChange={setSelectedStatus}
                        class="status"
                        label={statusLabel}
                        />
                    </div>
                </div>
                <div className='employee-details'>
                    <div className='employee'>
                        <div className='employee-icon'>
                            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 22 22" fill="none">
                            <path d="M11 11C13.2091 11 15 9.20914 15 7C15 4.79086 13.2091 3 11 3C8.79086 3 7 4.79086 7 7C7 9.20914 8.79086 11 11 11Z" stroke="#474747" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                            <path d="M19 21V19C19 17.9391 18.5786 16.9217 17.8284 16.1716C17.0783 15.4214 16.0609 15 15 15H7C5.93913 15 4.92172 15.4214 4.17157 16.1716C3.42143 16.9217 3 17.9391 3 19V21" stroke="#474747" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                            </svg>
                        </div>
                        <div className='employee-text'>თანამშრომელი</div>
                    </div>
                    <div className='employee-info'>
                            <div className='employee-department'>{task.employee.department.name}</div>
                        <div className='employee-info-text'>
                            <div className='employee-img-container'>
                                <img src={task.employee.avatar}></img>
                            </div>
                            <div className='employee-name'>{task.employee.name} {task.employee.surname}</div>
                        </div>
                    </div>
                </div>
                <div className='due-date-details'>
                    <div className='due-date-info'>
                        <div className='due-date-icon'>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                            <path d="M19 4H5C3.89543 4 3 4.89543 3 6V20C3 21.1046 3.89543 22 5 22H19C20.1046 22 21 21.1046 21 20V6C21 4.89543 20.1046 4 19 4Z" stroke="#474747" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                            <path d="M16 2V6" stroke="#474747" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                            <path d="M8 2V6" stroke="#474747" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                            <path d="M3 10H21" stroke="#474747" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                            </svg>
                        </div>
                        <div className='due-date-text'>დავალების ვადა</div>
                    </div>
                    <div className='due-date'>{formatDate(task.due_date)}</div>
                </div>
            </div>

        </div>

    </div>
}
    <CommentsApp 
        task={task}
        API_URL={API_URL}
        TOKEN={TOKEN}
    />

    </div>
  );
}

export default InsideTaskApp;
