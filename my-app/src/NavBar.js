import './NavBar.css';
import hourglass from './assets/imgs/Hourglass.png';


function NavBar() {


  return (
    <div className='navbar'>
        <div className='title'>
        <div className='title-content'>Momentum</div>
        <img src={hourglass} alt='Hourglass' className='hourglass'></img>
        </div>
        <div className='buttons'>
          <button className='create-worker-button'>თანამშრომლის შექმნა</button>
          <button className='create-task-button'>+ შექმენი ახალი დავალება</button>
        </div>
        
    
     </div>
  );
}

export default NavBar;
