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
const historyUrl = new URL("http://10.25.0.14:3000/misurazioni?data_ora");

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
    return fetch(serverDataUrl)
        .then(function(response) {
            if(!response.ok) throw new Error();
            return response.json();
        })
        .then(function(response) {
            var i = 0;
            do {
                var currentResponse = response.pop();
                var dataDay = currentResponse["data_ora"].slice(8, 10);
                
                historyData[i].date = currentResponse["data_ora"];
                if(currentResponse.tipo == "UMIDITA") historyData[i].humidity = currentResponse['valore'];
                else if(currentResponse.tipo == "TEMPERATURA") historyData[i].temperature = currentResponse['valore'];
                i++;
            } while(dataDay == selectedDate.toString().slice(8, 10));
        })
        .catch(function(error) {
            console.error(error);
            $("#error_data").html(error.toString());
            $("#error").show();
        });
}

