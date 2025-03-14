import './TaskApp.css';
import dropArrowBlack from './assets/imgs/drop_arrow_black.png';
import dropArrowPurple from './assets/imgs/drop_arrow_purple.png';


function TaskApp() {


  return (
    <div>  
    <div className='page-title'>დავალებების გვერდი</div>
    <div className='filter-tool'>
      <button className='department-button'>
        <div>დეპარტამენტი</div>
        <img src={dropArrowBlack} alt='drop-arrow-black'></img>
        </button>
      <button className='priority-button'>
        <div>პრიორიტეტი</div>
        <img src={dropArrowBlack} alt='drop-arrow-black'></img>
        </button>
      <button className='worker-button'>
        <div>თანამშრომელი</div>
        <img src={dropArrowBlack} alt='drop-arrow-black'></img>
        </button>
    </div>
    </div>
  );
}

export default TaskApp;
