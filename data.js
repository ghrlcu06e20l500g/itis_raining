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
        } else {
            if(!isWeekHistoric) {
                isWeekHistoric = true;
                firstForecastIndex = i;
            }
            for(var j = 0; j < forecastData.dates.length; j++) {
                // Adjusted the index used for addDays
                if(date.equals(addDays(new Date(), i - firstForecastIndex))) {
                    currentData[i].temperatures = forecastData.temperatures[j];
                    currentData[i].humidities = forecastData.humidities[j];
                    currentData[i].weather = forecastData.weather[j];
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
