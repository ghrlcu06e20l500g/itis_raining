async function getWeekData() {
    var currentWeek = weekDays(currentDate);

    await getServerWeekData();
    var serverWeek = currentData;

    var isWeekHistoric = false;
    var firstForecastIndex = null;
    
    for(var i = 0; i < 7; i++) {
        if(currentWeek[i] < new Date()) {
            currentData[i].temperatures = serverWeek.temperatures[i];
            currentData[i].humidities = serverWeek.humidities[i];
            // get weather from history.js
        } else {
            if(!isWeekHistoric) {
                weekHistoric = true;
                firstForecastIndex = i;
            }
            for(var j = 0; j < forecastData.dates.length; j++) {
                if(date.equals(addDays(new Date[i], i - firstForecastIndex))) {
                    currentData[i].temperatures = forecastData.temperatures[i];
                    currentData[i].humidities = forecastData.humidities[i];
                    currentData[i].weather = forecastData.weather[i];
                }
            }
        }
    }
}
async function getDayData() {
    if(currentDate < new Date()) {
        await getServerDayData();
        await getPastDayWeather();
    } else await getForcastDayData();
}
