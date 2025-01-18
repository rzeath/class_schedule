import { useState, useEffect } from 'react';
import dayjs, { Dayjs } from 'dayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import './App.css';
import { paintCalendar } from './schedule';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';

type ClassDetails = {
  id: number;
  name: string;
  instructor: string;
  days: string[];
  startTime: Dayjs | null;
  endTime: Dayjs | null;
  color: string;
  room: string;

};

function App() {
  const [isOverlayVisible, setOverlayVisible] = useState(false);
  const [className, setClassName] = useState('');
  const [instructorName, setInstructorName] = useState('');
  const [selectedDays, setSelectedDays] = useState<string[]>([]);
  const [startTime, setStartTime] = useState<Dayjs | null>(null);
  const [endTime, setEndTime] = useState<Dayjs | null>(null);
  const [classColor, setClassColor] = useState('#FFFFFF');
  const [room, setRoom] = useState(''); // Added state for room
  const [classes, setClasses] = useState<ClassDetails[]>([]);
  const [editClassId, setEditClassId] = useState<number | null>(null);
  const [selectedClassDetails, setSelectedClassDetails] = useState<ClassDetails | null>(null);


  useEffect(() => {
    paintCalendar();

    const exportBtn = document.getElementById('export-calendar-btn');
    const exportHandler = () => handleExport('pdf');
    
    if (exportBtn) {
      exportBtn.addEventListener('click', exportHandler);
    }

    return () => {
      if (exportBtn) {
        exportBtn.removeEventListener('click', exportHandler);
      }
    };
  }, []);

  const generateClassId = () => Math.floor(Math.random() * 100000);

  const handleAddClassClick = () => {
    setOverlayVisible(true);
  };

  const handleCloseOverlay = () => {
    setOverlayVisible(false);
    setClassName('');
    setRoom('');
    setInstructorName('');
    setSelectedDays([]);
    setStartTime(null);
    setEndTime(null);
    setEditClassId(null);
    
  };

  const handleExport = async (format: 'png' | 'pdf') => {
    const calendarElement = document.querySelector('.schedule-container') as HTMLElement;
    
    if (calendarElement) {
      // Capture the calendar element as a canvas
      const canvas = await html2canvas(calendarElement);
      const imageData = canvas.toDataURL('image/png');
  
      if (format === 'png') {
        // Export as PNG
        const link = document.createElement('a');
        link.href = imageData;
        link.download = 'calendar.png';
        link.click();
      } else if (format === 'pdf') {
        // Export as PDF
        const pdf = new jsPDF({
          orientation: 'landscape',
          unit: 'px',
          format: [canvas.width, canvas.height],
        });
        pdf.addImage(imageData, 'PNG', 0, 0, canvas.width, canvas.height);
        pdf.save('calendar.pdf');
      }
    } else {
      console.error('Calendar element not found.');
    }
  };

  const handleSaveClass = () => {
    if (editClassId !== null) {
      setClasses((prevClasses) =>
        prevClasses.map((classItem) =>
          classItem.id === editClassId
            ? {
                ...classItem,
                name: className,
                instructor: instructorName,
                days: selectedDays,
                startTime,
                endTime,
                color: classColor,
                room,
              }
            : classItem
        )
      );
    } else {
      const newClass: ClassDetails = {
        id: generateClassId(),
        name: className,
        instructor: instructorName,
        days: selectedDays,
        startTime,
        endTime,
        color: classColor,
        room,
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
    if (selectedClassDetails?.id === id) {
      setSelectedClassDetails(null);
    }
    setClasses(classes.filter((classItem) => classItem.id !== id));
  };

  const handleEditClass = (id: number) => {
    const classToEdit = classes.find((classItem) => classItem.id === id);
    if (classToEdit) {
      setEditClassId(id);
      setClassName(classToEdit.name);
      setSelectedDays(classToEdit.days);
      setInstructorName(classToEdit.instructor);
      setStartTime(classToEdit.startTime);
      setEndTime(classToEdit.endTime);
      setClassColor(classToEdit.color);
      setRoom(classToEdit.room);
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

  const renderClasses = (day: string) => {
    return classes
      .filter((classItem) => classItem.days.includes(day))
      .map((classItem) => {
        const startMinutes = classItem.startTime
          ? classItem.startTime.hour() * 60 + classItem.startTime.minute()
          : 0;
        const endMinutes = classItem.endTime
          ? classItem.endTime.hour() * 60 + classItem.endTime.minute()
          : 0;

        const minStartTime: number =  7 * 60;
        const scaleFactor: number = 1.7;
        const topPosition = `${(startMinutes - minStartTime) * scaleFactor}px`; // Start time position
        const height = `${(endMinutes - startMinutes) * scaleFactor}px`; // Duration as height
  
        return (
          <div
            key={classItem.id}
            className="class-card"
            style={{
              backgroundColor: classItem.color,
              position: 'absolute',
              top: topPosition, 
              height: height,
              width: '123px'
            }}
            onClick={() => setSelectedClassDetails(classItem)}
          >
            <button
              className="edit-btn"
              onClick={(e) => {
                e.stopPropagation(); // Prevent triggering parent click event
                handleEditClass(classItem.id);
              }}
            >
              /
            </button>
            <button
              className="delete-btn"
              onClick={(e) => {
                e.stopPropagation();
                handleDeleteClass(classItem.id);
              }}
            >
              X
            </button>
            <div className='class-details'>
            <h4>{classItem.name}</h4>
            <p style={{textAlign: 'center'}}><strong>{classItem.instructor}</strong></p>
            <p style={{textAlign: 'center'}}><strong>
              {classItem.startTime?.format('hh:mmA')}-{classItem.endTime?.format('hh:mmA')}
              </strong></p>
            <p style={{textAlign: 'center'}}><strong>{classItem.room}</strong></p>
            </div>
          </div>
        );
      });
  };

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
          
          <div className="schedule-container">
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
                      {renderClasses(day)}
                    </div>
                  </div>
                ))}
              </div>
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
            <div className="export-btn" id="export-calendar-btn" onClick={() => handleExport('pdf')}>
              Export
            </div>
          </div>
          <div className="class-details-container">
            <div></div>
            <div></div>
            <div></div>
            {selectedClassDetails ? (
              <div className="details">
                <p id="className" style={{color:selectedClassDetails.color}}>{selectedClassDetails.name}</p>
                <div id=''>
                  <p><strong>Instructor:</strong></p>
                  <p>{selectedClassDetails.instructor}</p>
                  <p><strong>Room:</strong></p>
                  <p>{selectedClassDetails.room}</p>
                  <p><strong>Days:</strong></p>
                  <p>{selectedClassDetails.days.join(', ')}</p>
                  <p><strong>Time:</strong></p>
                  <p>{' '}
                    {selectedClassDetails.startTime?.format('hh:mmA')} -{' '}
                    {selectedClassDetails.endTime?.format('hh:mmA')}</p>
                </div>
              </div>
            ) : (
              <p>Select a class from the calendar to view details.</p>
            )}
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
              <div className="form-group">
                <input
                  className="form-control"
                  autoComplete="off"
                  id="add-instructor-name"
                  placeholder="Engr. Henry Danlag"
                  type="text"
                  value={instructorName}
                  onChange={(e) => setInstructorName(e.target.value)}
                  required
                />
                <div className="invalid-feedback">
                  Please add a instructor name
                </div>
              </div>
              <div className="form-group">
                <input
                  className="form-control"
                  autoComplete="off"
                  id="add-rooom"
                  placeholder="ROOM 101 / BSCPE 4 DAY"
                  type="text"
                  value={room}
                  onChange={(e) => setRoom(e.target.value)}
                  required
                />
                <div className="invalid-feedback">
                Please add a room or section details
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
