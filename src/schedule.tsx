function minutesToHours(minutes:number){
    let hours:number = Math.floor(minutes / 60);
    let mins:number = minutes % 60;

    hours = hours % 12;
    if (hours ==0) hours = 12;
    let isPM:boolean = minutes >= 60 * 12;

    let timeStr:string = hours + ":" + (mins < 10 ? "0" + mins : mins);
    return isPM ? timeStr +"pm" : timeStr + "am";
}

export function paintCalendar(){
    // let savedClasses : any = getSavedClasses () || {};
    const minStartTime: number = 7 * 60; // 8am
    const maxEndTime: number = 15 * 60; // 3pm

    const startHourMins: number = Math.floor(minStartTime / 60) * 60;
    const endHourMins: number = Math.ceil(maxEndTime / 60) * 60;

    const scaleFactor: number = 1.7;
    const calendar = document.getElementById('time-calendar');

    if(calendar){
        while (calendar.firstChild){
            calendar.removeChild(calendar.firstChild);
        }

        calendar.style.height = ((scaleFactor * (endHourMins - startHourMins) + 120)) + 'px';

        //add all of the hr element for hour lines
        for (let i = startHourMins; i<= endHourMins; i += 60){

            if(i != 720) {
                const hourLine = document.createElement('div');         
                hourLine.className = 'hour-line';
                hourLine.style.top = (i - startHourMins) * scaleFactor + 'px';
                hourLine.setAttribute('data-hour', minutesToHours(i).split(':')[0]+':00 - '+ minutesToHours(i + 60).split(':')[0]+ ':00');
                calendar.appendChild(hourLine);                                
            }
            else {
                const hourLine = document.createElement('div');         
                hourLine.className = 'hour-line';
                hourLine.style.top = (i - startHourMins) * scaleFactor + 'px';
                hourLine.setAttribute('data-hour', 'LUNCH BREAK 12:00 - 1:00');
                calendar.appendChild(hourLine);   
            }
        }
    }else{
        console.error("Calendar element not found");
    }
}
