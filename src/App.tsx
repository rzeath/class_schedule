import { useState, useEffect } from 'react';
import dayjs, { Dayjs } from 'dayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import './App.css';
import { paintCalendar } from './schedule';

type ClassDetails = {
  id: number;
  name: string;
  days: string[];
  startTime: Dayjs | null;
  endTime: Dayjs | null;
  color: string;
};

function App() {
  const [isOverlayVisible, setOverlayVisible] = useState(false);
  const [className, setClassName] = useState('');
  const [selectedDays, setSelectedDays] = useState<string[]>([]);
  const [startTime, setStartTime] = useState<Dayjs | null>(null);
  const [endTime, setEndTime] = useState<Dayjs | null>(null);
  const [classColor, setClassColor] = useState('#FFFFFF');
  const [classes, setClasses] = useState<ClassDetails[]>([]);
  const [editClassId, setEditClassId] = useState<number | null>(null);

  useEffect(() => {
    paintCalendar();
  }, []);

  const generateClassId = () => Math.floor(Math.random() * 100000);

  const handleAddClassClick = () => {
    setOverlayVisible(true);
  };

  const handleCloseOverlay = () => {
    setOverlayVisible(false);
    setClassName('');
    setSelectedDays([]);
    setStartTime(null);
    setEndTime(null);
    setEditClassId(null);
  };

  const handleSaveClass = () => {
    if (editClassId !== null) {
      setClasses((prevClasses) =>
        prevClasses.map((classItem) =>
          classItem.id === editClassId
            ? {
                ...classItem,
                name: className,
                days: selectedDays,
                startTime,
                endTime,
                color: classColor,
              }
            : classItem
        )
      );
    } else {
      const newClass: ClassDetails = {
        id: generateClassId(),
        name: className,
        days: selectedDays,
        startTime,
        endTime,
        color: classColor,
      };
      setClasses([...classes, newClass]);
    }

    handleCloseOverlay();
  };

  const handleDaySelection = (day: string) => {
    setSelectedDays((prevDays) =>
      prevDays.includes(day)
        ? prevDays.filter((d) => d !== day)
        : [...prevDays, day]
    );
  };

  const handleDeleteClass = (id: number) => {
    setClasses(classes.filter((classItem) => classItem.id !== id));
  };

  const handleEditClass = (id: number) => {
    const classToEdit = classes.find((classItem) => classItem.id === id);
    if (classToEdit) {
      setEditClassId(id);
      setClassName(classToEdit.name);
      setSelectedDays(classToEdit.days);
      setStartTime(classToEdit.startTime);
      setEndTime(classToEdit.endTime);
      setClassColor(classToEdit.color);
      setOverlayVisible(true);
    }
  };

  const colorOptions = [
    '#FF6B6B',
    '#FFD93D',
    '#6BCB77',
    '#00FF00',
    '#4D96FF',
    '#BC6FF1',
    '#FFABAB',
    '#FF6708',
  ];

  return (
    <>
      <div id="logo"></div>
      <div className="nav-bar"></div>
      <div className="color-theme"></div>

      <div className="main-container">
        <div>
          <div className="create-schedule-container">
            <div className="create-schedule-btn">+ Create Schedule</div>
          </div>

          <div className="schedule-title-bar">
            <input type="text" placeholder="SCHEDULE TITLE" />
          </div>

          <div className="calendar-layout-container">
            <div className="calendar-header-row">
              <div className="time-col">TIME</div>
              {['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'].map(
                (day, index) => (
                  <div className="day-col" key={index}>
                    {day}
                    <p>{dayjs().day(index + 1).format('dddd')}</p>
                  </div>
                )
              )}
            </div>
            <div className="calendar-days-row">
              <div className="time-cal-col" id="time-calendar"></div>
              {['M', 'T', 'W', 'Th', 'F', 'Sa', 'Su'].map((day, index) => (
                <div className="day-cal-col" key={index}>
                  <div className="class-cards-container">
                    {classes
                      .filter((classItem) => classItem.days.includes(day))
                      .map((classItem) => (
                        <div
                          key={classItem.id}
                          className="class-card"
                          style={{ backgroundColor: classItem.color }}
                        >
                          <h3>{classItem.name}</h3>
                          <p>
                            Time: {classItem.startTime?.format('hh:mm A')} -{' '}
                            {classItem.endTime?.format('hh:mm A')}
                          </p>
                          <button
                            className="edit-btn"
                            onClick={() => handleEditClass(classItem.id)}
                          >
                            Edit
                          </button>
                          <button
                            className="delete-btn"
                            onClick={() => handleDeleteClass(classItem.id)}
                          >
                            Delete
                          </button>
                        </div>
                      ))}
                  </div>
                </div>
              ))}
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
            <form
              id="add-class-form"
              className="needs-validation"
              noValidate
            >
              <div className="form-group">
                <input
                  className="form-control"
                  autoComplete="off"
                  id="add-class-name"
                  placeholder="CHEM 101-001"
                  type="text"
                  value={className}
                  onChange={(e) => setClassName(e.target.value)}
                  required
                />
                <div className="invalid-feedback">
                  Please add a class name
                </div>
              </div>

              <div id="add-meeting-period-container">
                <div id="meeting-period">
                  <div className="meeting-period-days">
                    {['M', 'T', 'W', 'Th', 'F', 'Sa', 'Su'].map((day) => (
                      <label key={day} className="day-btn" data-day={day}>
                        <input
                          type="checkbox"
                          autoComplete="off"
                          checked={selectedDays.includes(day)}
                          onChange={() => handleDaySelection(day)}
                        />
                        <span>{day}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>

              <div className="timepicker-field">
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DemoContainer components={['TimePicker', 'TimePicker']}>
                    <TimePicker
                      label="Start Time"
                      value={startTime}
                      onChange={(newValue) => setStartTime(newValue)}
                      sx={{
                        "& .MuiInputBase-input": { color: "white" }, 
                        "& .MuiFormLabel-root": { color: "white" }, 
                        "& .MuiOutlinedInput-root": { width: "123%" }, 
                      }}
                      disableOpenPicker
                    />
                  </DemoContainer>
                </LocalizationProvider>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DemoContainer components={['TimePicker', 'TimePicker']}>
                    <TimePicker
                      label="End Time"
                      value={endTime}
                      onChange={(newValue) => setEndTime(newValue)}
                      sx={{
                        "& .MuiInputBase-input": { color: "white" }, 
                        "& .MuiFormLabel-root": { color: "white" }, 
                        "& .MuiOutlinedInput-root": { width: "123%" }, 
                      }}
                      disableOpenPicker
                    />
                  </DemoContainer>
                </LocalizationProvider>
              </div>

              <div className="color-options">
                <label>Choose Color:</label>
                <div className="color-cubes">
                  {colorOptions.map((color) => (
                    <div
                      key={color}
                      className="color-cube"
                      style={{ backgroundColor: color }}
                      onClick={() => setClassColor(color)}
                    />
                  ))}
                </div>
              </div>

              <button type="button" onClick={handleSaveClass}>
                Save
              </button>
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

export default App;
