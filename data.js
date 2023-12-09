async function getWeekData() {
    var thisWeekStart = new Date();
    thisWeekStart.setDate((new Date()).getDate() - (new Date()).getDay());

    if(currentDate < thisWeekStart) {
        await getServerWeekData();
        //await getPastWeekWeather();
    } else; //await getForcastDayData();
}
async function getDayData() {
    if(currentDate < new Date()) {
        await getServerDayData();
        //await getPastDayWeather();
    } else; //await getForcastDayData();
}
