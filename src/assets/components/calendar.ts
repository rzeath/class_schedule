// function generateId() {
//     return Math.random().toString(36).substr(2, 9);
// };

// function getPeriodsString(periods:any) {
//     return periods.map(period => `${period.days.join('')}: ${period.startTime}-${period.endTime}`).join('<br>');
// }

// function initLocalStorage() {
//     // defaults have not been set
//     if (!localStorage.getItem('defaultClassTimes')) {
//         var defaultClassTimes = {
//             'MWF': {
//                 length: 50,
//                 days: ['M', 'W', 'F']
//             },
//             'TuTh': {
//                 length: 75,
//                 days: ['Tu', 'Th']
//             },
//             'MW': {
//                 length: 75,
//                 days: ['M', 'W']
//             }
//         }


//         localStorage.setItem('defaultClassTimes', JSON.stringify(defaultClassTimes));
//     }

//     if (!localStorage.getItem('colors')) {
//         // retired these colors
//         /* re = /rgb\((\d*), (\d*), (\d*)\)/
//         const colors = ["rgb(235, 233, 110)","rgb(240, 137, 195)","rgb(207, 237, 147)","rgb(147, 200, 237)","rgb(237, 147, 147)","rgb(200, 210, 232)","rgb(200, 196, 245)","rgb(153, 227, 242)","rgb(158, 232, 222)","rgb(252, 229, 124)","rgb(247, 187, 134)","rgb(252, 229, 188)","rgb(197, 255, 237)","rgb(242, 165, 236)","rgb(192, 237, 237)","rgb(151, 201, 201)","rgb(232, 212, 195)","rgb(245, 207, 176)","rgb(195, 245, 149)","rgb(162, 174, 252)","rgb(239, 162, 252)","rgb(209, 161, 187)","rgb(227, 154, 154)","rgb(173, 206, 217)","rgb(173, 217, 204)","rgb(173, 217, 191)","rgb(255, 168, 168)","rgb(145, 174, 194)","rgb(156, 255, 253)","rgb(73, 214, 165)","rgb(255, 189, 97)","rgb(145, 255, 200)","rgb(145, 255, 253)","rgb(171, 174, 255)","rgb(255, 145, 130)","rgb(83, 172, 201)","rgb(87, 213, 255)","rgb(255, 110, 110)","rgb(219, 162, 70)","rgb(148, 219, 94)","rgb(173, 201, 151)","rgb(123, 237, 154)","rgb(135, 189, 117)","rgb(62, 214, 90)","rgb(105, 180, 255)","rgb(196, 175, 201)","rgb(231, 135, 255)","rgb(255, 135, 189)","rgb(176, 139, 156)","rgb(227, 193, 129)","rgb(146, 173, 142)","rgb(142, 148, 173)","rgb(165, 142, 173)","rgb(209, 117, 117)","rgb(249, 255, 128)","rgb(136, 255, 122)","rgb(122, 253, 255)","rgb(242, 122, 255)","rgb(255, 140, 122)"];
//         const lighter = colors.map(colorString => {
//             res = colorString.match(re)
//             return `rgb(${Math.min(parseInt(res[1]) + 30, 255)}, ${Math.min(parseInt(res[2]) + 30, 255)}, ${Math.min(parseInt(res[3]) + 30, 255)})`;
//         }) */

//         // note: this should be an array that has the same colors as the color picker, but in the order that you'd want the classes to be added by default
//         const defaultColorOrder = ["rgb(255, 255, 140)", "rgb(239, 191, 217)", "rgb(203, 236, 247)", "rgb(225, 255, 179)", "rgb(255, 219, 127)", "rgb(201, 204, 255)", "rgb(255, 237, 206)", "rgb(103, 244, 195)", "rgb(255, 175, 160)", "rgb(135, 210, 255)", "rgb(113, 202, 231)", "rgb(177, 230, 255)", "rgb(255, 140, 140)", "rgb(176, 203, 172)", "rgb(117, 243, 255)", "rgb(249, 192, 100)", "rgb(152, 255, 255)", "rgb(206, 169, 186)", "rgb(255, 223, 159)", "rgb(100, 177, 114)", "rgb(172, 178, 203)", "rgb(166, 255, 152)", "rgb(255, 152, 255)", "rgb(255, 170, 152)"];
//         localStorage.setItem('colors', JSON.stringify(defaultColorOrder));
//     }

//     if (!localStorage.getItem('schedules')) {
//         localStorage.setItem('schedules', JSON.stringify({
//             default: {
//                 name: 'Default Schedule',
//                 id: 'default',
//                 classes: {

//                 }
//             }
//         }));
//     }

//     if (!localStorage.getItem('defaultScheduleId')) {
//         localStorage.setItem('defaultScheduleId', 'default');
//     }
// }


// function getSchedules() {
//     return JSON.parse(localStorage.getItem('schedules'));
// }

// function getSavedClasses(scheduleId:any) {
//     let schedules = getSchedules();

//     if (scheduleId == null) {
//         scheduleId = getDefaultScheduleId();
//     }

//     return schedules[scheduleId].classes;
// }

// function getDefaultScheduleId() {
//     return localStorage.getItem('defaultScheduleId') || getSchedules()[Object.keys(getSchedules())[0]].id;
// }

function minutesToHours(minutes:number) {
    let hours:number = Math.floor(minutes / 60);
    let mins:number = minutes % 60;

    hours = hours % 12; 
    if (hours == 0) hours = 12;
    let isPM:boolean = minutes >= 60 * 12; 

    let timeStr:string = hours + ":" + (mins < 10 ? "0" + mins : mins); 
    return isPM ? timeStr + "pm" : timeStr + "am"; 
}

export function paintCalendar() {
    // let savedClasses:any = getSavedClasses() || {};
    const minStartTime: number = 8 * 60; // 8am
    const maxEndTime: number = 15 * 60; // 3pm

    const startHourMins: number = Math.floor(minStartTime / 60) * 60;
    const endHourMins: number = Math.ceil(maxEndTime / 60) * 60;

    const scaleFactor: number = 1.2;
    const calendar = document.getElementById('time-calendar');

    if(calendar) {
        while (calendar.firstChild) {
            calendar.removeChild(calendar.firstChild);
        }

        calendar.style.height = ((scaleFactor * (endHourMins - startHourMins) + 120)) + 'px';

        // add all of the hr elements for hour lines
        for (let i = startHourMins; i <= endHourMins; i += 60) {
            const hourLine = document.createElement('div');
            hourLine.className = 'hour-line';
            // hourLine.style.top = `${(i - startHourMins) * scaleFactor}px`;
            hourLine.style.top = (i - startHourMins) * scaleFactor + 'px';
            // hourLine.setAttribute('data-hour', `${minutesToHours(i).split(':')[0]} - ${minutesToHours(i + 60).split(':')[0]}`);
            hourLine.setAttribute('data-hour', minutesToHours(i).split(':')[0] +  ':00 - ' + minutesToHours(i + 60).split(':')[0] + ':00');
            calendar.appendChild(hourLine);
        }
    } else {
        console.error("Calendar element not found");
    }
    
}

