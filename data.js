var forecastData = [
    { date: new Date(), weather: "sunny", temperature: 30, humidity: 50 },
    { date: new Date(), weather: "sunny", temperature: 30, humidity: 50 },
    { date: new Date(), weather: "sunny", temperature: 30, humidity: 50 },
    { date: new Date(), weather: "sunny", temperature: 30, humidity: 50 },
    { date: new Date(), weather: "sunny", temperature: 30, humidity: 50 },
    { date: new Date(), weather: "sunny", temperature: 30, humidity: 50 },
    { date: new Date(), weather: "sunny", temperature: 30, humidity: 50 },
    { date: new Date(), weather: "sunny", temperature: 30, humidity: 50 },
    { date: new Date(), weather: "sunny", temperature: 30, humidity: 50 },
    { date: new Date(), weather: "sunny", temperature: 30, humidity: 50 },
    { date: new Date(), weather: "sunny", temperature: 30, humidity: 50 },
    { date: new Date(), weather: "sunny", temperature: 30, humidity: 50 },
    { date: new Date(), weather: "sunny", temperature: 30, humidity: 50 },
    { date: new Date(), weather: "sunny", temperature: 30, humidity: 50 },
    { date: new Date(), weather: "sunny", temperature: 30, humidity: 50 },
    { date: new Date(), weather: "sunny", temperature: 30, humidity: 50 }
];
var historyData = [
    { time: new Date(), temperature: 30, humidity: 50 },
    { time: new Date(), temperature: 30, humidity: 50 },
    { time: new Date(), temperature: 30, humidity: 50 },
    { time: new Date(), temperature: 30, humidity: 50 },
    { time: new Date(), temperature: 30, humidity: 50 },
    { time: new Date(), temperature: 30, humidity: 50 },
    { time: new Date(), temperature: 30, humidity: 50 },
    { time: new Date(), temperature: 30, humidity: 50 },
    { time: new Date(), temperature: 30, humidity: 50 },
    { time: new Date(), temperature: 30, humidity: 50 },
    { time: new Date(), temperature: 30, humidity: 50 },
    { time: new Date(), temperature: 30, humidity: 50 },
    { time: new Date(), temperature: 30, humidity: 50 },
    { time: new Date(), temperature: 30, humidity: 50 },
    { time: new Date(), temperature: 30, humidity: 50 },
    { time: new Date(), temperature: 30, humidity: 50 },
    { time: new Date(), temperature: 30, humidity: 50 },
    { time: new Date(), temperature: 30, humidity: 50 },
    { time: new Date(), temperature: 30, humidity: 50 },
    { time: new Date(), temperature: 30, humidity: 50 },
    { time: new Date(), temperature: 30, humidity: 50 },
    { time: new Date(), temperature: 30, humidity: 50 },
    { time: new Date(), temperature: 30, humidity: 50 },
    { time: new Date(), temperature: 30, humidity: 50 }
];

const forecastUrl = new URL("https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/weatherdata/forecast?locations=Urbino,PU,61029&aggregateHours=24&lang=it&unitGroup=metric&shortColumnNames=false&contentType=json&key=EVPUPWJLED7AAULMJBMDVB3GJ");

async function updateForecastData() {
    return fetch(forecastUrl)
        .then(function(response) {
            if(!response.ok) throw new Error();
            else return response.json();
        })
        .then(function(response) {
            for(var i = 0; i < 16; i++) {
                forecastData[i].date = new Date(response.locations["Urbino,PU,61029"].values[i].datetimeStr);
                forecastData[i].weather = response.locations["Urbino,PU,61029"].values[i].conditions;
                forecastData[i].temperature = response.locations["Urbino,PU,61029"].values[i].temp;
                forecastData[i].humidity = response.locations["Urbino,PU,61029"].values[i].humidity;
            }
        })
        .catch(function(error) {
            console.error(error);
            $("#error_data").html(error.toString());
            $("#error").show();
        });
}
async function updateHistoryData(selectedDate) {
    for(var i = 0; i < 24; i++) {
        fetch(new URL(`http://10.25.0.14:3000/misurazioni?
            data_ora=gte.${selectedDate.toISOString().split('T')[0]}${String(i).padStart(2, '0')}:00:00&
            data_ora=lt.${nextDate.toISOString().split('T')[0]}${(i + 1 < 24)? String(i + 1).padStart(2, '0'): "00"}:00:00`
        )).then(function(response) {
                if(!response.ok) throw new Error();
                return response.json();
            })
            .then(function(response) {
                var temperature = 0;
                var humidity = 0;
                for(measurement of response) {
                    if(measurement.tipo == "TEMPERATURA") temperature += measurement.valore;
                    else if(measurement.tipo == "TEMPERATURA") humidity += measurement.valore;
                }
                historyData[i].temperature = temperature / 6;
                historyData[i].humidity = humidity / 6;
            })
            .catch(function(error) {
                console.error(error);
                $("#error_data").html(error.toString());
                $("#error").show();
            });
    }
}

