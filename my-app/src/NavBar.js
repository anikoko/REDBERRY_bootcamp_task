import './NavBar.css';
import hourglass from './assets/imgs/Hourglass.png';
import add from './assets/imgs/add.png';



function NavBar() {


  return (
    <div className='navbar'>
        <div className='title'>
        <div className='title-content'>Momentum</div>
        <img src={hourglass} alt='Hourglass' className='hourglass'></img>
        </div>
        <div className='buttons'>
          <button className='create-worker-button'>თანამშრომლის შექმნა</button>
          <button className='create-task-button'>
            <img src={add} alt='add' className='add'></img>
            <div> შექმენი ახალი დავალება </div>
          </button>
        </div>
        
    
     </div>
  );
}

export default NavBar;
