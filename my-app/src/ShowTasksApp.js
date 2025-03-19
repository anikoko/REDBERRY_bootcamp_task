import './ShowTasksApp.css';
import comments from './assets/imgs/Comments.png'

function ShowTasksApp(props) {
    function formatDate(dateStr) {
        const months = ["იანვ", "თებ", "მარტ", "აპრ", "მაის", "ივნ", "ივლ", "აგვ", "სექტ", "ოქტ", "ნოემ", "დეკ"];
        const [year, month, dayTime] = dateStr.split('-');
        const [day, time] = dayTime.split('T')
        return `${day} ${months[parseInt(month, 10) - 1]}, ${year}`;
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

  return (
    <div>
    <div className={`status-${props.status}-container`} >
        <div className='status-text' style={{background: props.color}}>{props.statusText}</div>
        {props.tasks && props.tasks.map((task)=>{
            if (task.status.name==props.statusText) {
                const priorityColor = task.priority.id==1 ?  '#08A508' : (task.priority.id==2? '#FFBE0B' : '#FA4D4D')

            return <div className='task-container' style={{borderColor: props.color}}>
                <div className='task-gen-info'>
                    <div className='priority-department'>
                        <div className='priority' style={{borderColor:  priorityColor }}>
                            <img src={task.priority.icon}></img>
                            <div className='priority-text' style={{color:  priorityColor }}>{task.priority.name}</div>
                            </div>
                        <div className='department'>{formatDepartmentName(task.department.name)}</div>
                    </div>
                    <div className='date-text'>{formatDate(task.due_date)}</div>
                </div>
                <div className='task-title-discription'>
                    <div className='task-title'>{task.name}</div>
                    <div className='task-discription'>{task.description}</div>
                </div>
                <div className='task-worker-and-comment'>
                    <img src={task.employee.avatar} alt='worker-img'></img>
                    <div className='comments'>
                        <img src={comments} alt='comment-icon'></img>
                        <div className='comment-text'>
                           8
                        </div>
                    </div>
                </div>
                
            </div>}
        })}
    </div>
    </div>
  );
}

export default ShowTasksApp;
