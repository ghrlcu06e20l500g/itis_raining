function getWeekDates(inputDate) {
    const daysInWeek = 7;
    const currentDate = new Date(inputDate);
    const currentDay = currentDate.getDay();
    const daysToAdd = currentDay === 0 ? -6 : 1 - currentDay;
  
    const startDate = new Date(currentDate);
    startDate.setDate(currentDate.getDate() + daysToAdd);
  
    const weekDates = [];
    for(let i = 0; i < daysInWeek; i++) {
        const date = new Date(startDate);
        date.setDate(startDate.getDate() + i);
        weekDates.push(date);
    }
  
    return weekDates;
}
function addDays(date, days) {
    var result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
}
function areDatesEqual(date1, date2) {
    return (
        date1.getFullYear() === date2.getFullYear() &&
        date1.getMonth() === date2.getMonth() &&
        date1.getDate() === date2.getDate()
    );
}  
function suffix(date) {
    const day = date.getDate();
    if(day >= 11 && day <= 13) return "th";
    switch(day % 10) {
        case 1: 
            return "st";
        case 2:
            return "nd";
        case 3:
            return "rd";
        default:
            return "th";
    }
}

const weekDays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const hours = [
    "01:00", "02:00", "03:00", "04:00", "05:00", "06:00", "07:00", "08:00", "09:00", "10:00", "11:00", "12:00",
    "13:00", "14:00", "15:00", "16:00", "17:00", "18:00", "19:00", "20:00", "21:00", "22:00", "23:00", "24:00"
];