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

var forecastUrl = new URL("https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/weatherdata/forecast?locations=Urbino,PU,61029&aggregateHours=24&lang=it&unitGroup=metric&shortColumnNames=false&contentType=json&key=EVPUPWJLED7AAULMJBMDVB3GJ");

async function updateForecastData() {
    return fetch(forecastUrl)
        .then(function(response) {
            if(!response.ok) throw new Error();
            else return response.json();
        })
        .then(function(response) {
            for(var i = 0; i < 16; i++) {
                forecastData[i].date = new Date(response.locations["Urbino,PU,61029"].values[i].datetime);
                forecastData[i].weather = response.locations["Urbino,PU,61029"].values[i].conditions;
                forecastData[i].temperature = response.locations["Urbino,PU,61029"].values[i].temp;
                forecastData[i].humidity = response.locations["Urbino,PU,61029"].values[i].humidity;
            }
        })
        .catch(function(error) {
            forecastUrl = new URL("https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/weatherdata/forecast?locations=Urbino,PU,61029&aggregateHours=24&lang=it&unitGroup=metric&shortColumnNames=false&contentType=json&key=6MKH4MUZQ5NXM44B4CALXJJ6V");
            updateForecastData();
        });
}



async function updateHistoryData(selectedDate) {
    let promises = [];
    for(var i = 0; i < 24; i++) {
        (function (index) {
            promises.push(fetch(new URL(`http://portale.itisurbino.it:3000/misurazioni?data_ora=gte.${selectedDate.toISOString().split('T')[0]}T${String(index).padStart(2, '0')}:00:00&data_ora=lt.${selectedDate.toISOString().split('T')[0]}T${(index + 1 < 24) ? String(index + 1).padStart(2, '0') + ":00:00": "23:59:59"}`))
                .then(function (response) {
                    if (!response.ok) throw new Error();
                    return response.json();
                })
                .then(function (response) {
                    var temperature = 0;
                    var temperatureCount = 0;
                    var humidity = 0;
                    var humidityCount = 0;
                    for(measurement of response) {
                        console.log(measurement.valore);
                        if(measurement.tipo == "TEMPERATURA") {
                            temperature += measurement.valore;
                            temperatureCount++;
                        } else if(measurement.tipo == "UMIDITA") {
                            humidity += measurement.valore;
                            humidityCount++;
                        }
                    }
                    historyData[index].temperature = temperature / temperatureCount;
                    historyData[index].humidity = humidity / humidityCount;
                    console.warn(temperature / temperatureCount);
                    console.warn(humidity / humidityCount);
                })
                .catch(function (error) {
                    updateHistoryDataIntern(selectedDate);
                }));
        })(i);
    }
    return Promise.all(promises);
}

async function updateHistoryDataIntern(selectedDate) {
    let promises = [];
    for(var i = 0; i < 24; i++) {
        (function (index) {
            promises.push(fetch(new URL(`http://10.25.0.14:3000/misurazioni?data_ora=gte.${selectedDate.toISOString().split('T')[0]}T${String(index).padStart(2, '0')}:00:00&data_ora=lt.${selectedDate.toISOString().split('T')[0]}T${(index + 1 < 24) ? String(index + 1).padStart(2, '0') + ":00:00": "23:59:59"}`))
                .then(function (response) {
                    if (!response.ok) throw new Error();
                    return response.json();
                })
                .then(function (response) {
                    var temperature = 0;
                    var temperatureCount = 0;
                    var humidity = 0;
                    var humidityCount = 0;
                    for(measurement of response) {
                        console.log(measurement.valore);
                        if(measurement.tipo == "TEMPERATURA") {
                            temperature += measurement.valore;
                            temperatureCount++;
                        } else if(measurement.tipo == "UMIDITA") {
                            humidity += measurement.valore;
                            humidityCount++;
                        }
                    }
                    historyData[index].temperature = temperature / temperatureCount;
                    historyData[index].humidity = humidity / humidityCount;
                    console.warn(temperature / temperatureCount);
                    console.warn(humidity / humidityCount);
                })
                .catch(function (error) {
                    console.error(error);
                    $("#error_data").html(error.toString());
                    $("#error").show();
                }));
        })(i);
    }
    return Promise.all(promises);
}
