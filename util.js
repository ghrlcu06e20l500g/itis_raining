function wait(milliseconds) {
    return new Promise(resolve => setTimeout(resolve, milliseconds));
}
function areDatesEqual(date1, date2) {
    return (
        date1.getFullYear() === date2.getFullYear() &&
        date1.getMonth() === date2.getMonth() &&
        date1.getDate() === date2.getDate()
    );
}  
  