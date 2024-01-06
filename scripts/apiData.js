const apiDataUrl = new URL("https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/weatherdata/forecast?locations=Urbino,PU,61034&aggregateHours=24&lang=it&unitGroup=metric&shortColumnNames=false&contentType=json&key=EVPUPWJLED7AAULMJBMDVB3GJ");


async function updateForecastData() {
    return new Promise(function(resolve, reject) {
        fetch(apiDataUrl)
        .then(function(response) {
            if(!response.ok) throw new Error();
            else return response.json();
        })
        .then(function(response) {
            for(var i = 0; i < 16; i++) {
                forecastData.dates[i] = new Date(response.locations["Urbino,PU,61034"].values[i].datetimeStr);
                forecastData.weather[i] = response.locations["Urbino,PU,61034"].values[i].conditions;
                forecastData.temperatures[i] = response.locations["Urbino,PU,61034"].values[i].temp;
                forecastData.humidities[i] = response.locations["Urbino,PU,61034"].values[i].humidity;
            }
        })
        .catch(function(error) {
            console.error(error);
            $("#error_data").html(error.toString());
            $("#error").show();
        });
    });
}
