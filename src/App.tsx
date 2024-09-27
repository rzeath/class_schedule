import { useState, useEffect } from 'react'
import * as React from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import dayjs, { Dayjs } from 'dayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import './App.css'
import { paintCalendar } from './schedule'

function App() {
  const [isOverlayVisible, setOverlayVisible] = useState(false);

  // const [time, setTime] = useState<string>('10:00');

  // const handleTimeChange = (newTime: string | null) => {
  //   if (newTime) {
  //     setTime(newTime);
  //   }
  // };

  useEffect(() => {
    paintCalendar();
  }, []);

  const handleAddClassClick = () => {
    setOverlayVisible(true);
  };

  const handleCloseOverlay = () => {
    setOverlayVisible(false);
  };

  return (
    <>
      <div id="logo"></div>
      <div className="nav-bar"></div>
      <div className="color-theme"></div>

      <div className="main-container">
        <div>
          <div className="create-schedule-container">
            <div className="create-schedule-btn">
              + Create Schedule
            </div>
          </div>

          <div className="schedule-title-bar">
            <input type="text" placeholder="SCHEDULE TITLE" />
          </div>

          <div className="calendar-layout-container">
            <div className="calendar-header-row">
              <div className="time-col">TIME</div>
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
              <div className="time-cal-col" id="time-calendar"></div>
              <div className="day-cal-col"></div>
              <div className="day-cal-col"></div>
              <div className="day-cal-col"></div>
              <div className="day-cal-col"></div>
              <div className="day-cal-col"></div>
              <div className="day-cal-col"></div>
              <div className="day-cal-col"></div>
            </div>
          </div>
        </div>
        <div>
          <div className="add-class-container">
            <div className="add-class-btn" onClick={handleAddClassClick}>
              Add Class
            </div>
          </div>

          <div className="export-container">
            <div className="export-btn">Export</div>
          </div>

          <div className="class-details-container">
            <div></div>
            <div></div>
            <div></div>
          </div>
        </div>
      </div> 

      {isOverlayVisible && (
        <div className="overlay">
          <div className="overlay-content">
            <form id="add-class-form" className="needs-validation" noValidate>
              {/* SUBJECT/COURSE NAME */}
              <div className="form-group">
                <input
                  className="form-control"
                  autoComplete="off"
                  id="add-class-name"
                  placeholder="CHEM 101-001"
                  type="text"
                  required
                />
                <div className="invalid-feedback">Please add a class name</div>
              </div>
              
              {/* ADD MEETING PERIOD CONTAINER */}
              <div id="add-meeting-period-container">
                <div id="meeting-period">
                  <div className="meeting-period-days">
                    <label className="day-btn" data-day="M">
                      <input type="checkbox" autoComplete="off" />
                      <span>M</span>
                    </label>
                    <label className="day-btn" data-day="T">
                      <input type="checkbox" autoComplete="off" />
                      <span>T</span>
                    </label>
                    <label className="day-btn" data-day="W">
                      <input type="checkbox" autoComplete="off" />
                      <span>W</span>
                    </label>
                    <label className="day-btn" data-day="Th">
                      <input type="checkbox" autoComplete="off" />
                      <span>Th</span>
                    </label>
                    <label className="day-btn" data-day="Sa">
                      <input type="checkbox" autoComplete="off" />
                      <span>Sa</span>
                    </label>
                    <label className="day-btn" data-day="Su">
                      <input type="checkbox" autoComplete="off" />
                      <span>Su</span>
                    </label>
                  </div>
                </div>
              </div>
              <div className="timepicker-field">
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DemoContainer components={['TimePicker', 'TimePicker']}>
                    <TimePicker
                      defaultValue={dayjs('2022-04-17T15:30')}
                    />
                  </DemoContainer>
                </LocalizationProvider>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DemoContainer components={['TimePicker', 'TimePicker']}>
                    <TimePicker
                      defaultValue={dayjs('2022-04-17T15:30')}
                    />
                  </DemoContainer>
                </LocalizationProvider>
              </div>

              <button type="button" onClick={handleCloseOverlay}>
                Close
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}


export default App
