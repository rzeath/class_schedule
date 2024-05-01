import {useEffect} from 'react';
import './App.css';
import {paintCalendar} from './assets/components/calendar.ts';

function App() {
  useEffect(() => {
    paintCalendar();
  }, [])

  return (
    <>
      <div id='logo'></div>
      <div className="nav-bar">
        
      </div>

      <div className="color-theme">

      </div>
      
      <div className="main-container">
        <div>
          <div className="create-schedule-container">
              <div className="create-schedule-btn">
                + Create Schedule
              </div>
          </div>

          <div className="schedule-title-bar">
            <input type="text" placeholder="Schedule Title"/>
          </div>

          <div className="calendar-layout-container">
            <div className="calendar-header-row">
              <div className="time-col">
                TIME
              </div>
              <div className="day-col">
                MON
                <p>Monday</p>
              </div>
              <div className="day-col">
                TUE
                <p>Tuesday</p>
              </div>
              <div className="day-col">
                WED
                <p>Wednesday</p>
              </div>
              <div className="day-col">
                THU
                <p>Thursday</p>
              </div>
              <div className="day-col">
                FRI
                <p>Friday</p>
              </div>
              <div className="day-col">
                SAT
                <p>Saturday</p>
              </div>
              <div className="day-col">
                SUN
                <p>Sunday</p>
              </div>
            </div>
            <div className="calendar-days-row">
              <div className="time-cal-col" id="time-calendar">
                
              </div>
              <div className="day-cal-col">
                
              </div>
              <div className="day-cal-col">
                
              </div>
              <div className="day-cal-col">
                
              </div>
              <div className="day-cal-col">

              </div>
              <div className="day-cal-col">

              </div>
              <div className="day-cal-col">

              </div>
              <div className="day-cal-col">

              </div>
            </div>
          </div>
        </div>
        <div>
          <div className="add-class-container">
            <div className="add-class-btn">
              Add Class
            </div>
          </div>

          <div className="export-container">
            <div className="export-btn">
              Export
            </div>
          </div>

          <div className="class-details-container">
            <div>
              
            </div>
            <div>

            </div>
            <div>
              
            </div>
          </div>
        </div>
      </div>
    </>
  )

}

export default App
