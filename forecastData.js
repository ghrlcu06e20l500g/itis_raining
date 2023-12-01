var dataUrl = new URL("http://10.25.0.14:3000/misurazioni?data_ora");
var currentResponse;
var temperature_data = [];
var humidity_data = [];
var tempIndex = 0, humIndex = 0;
var currentDate = new Date(), dataDay;
var worker;
var dataUrl = new URL("https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/weatherdata/forecast?locations=Urbino,PU,61034&aggregateHours=24&lang=it&unitGroup=metric&shortColumnNames=false&contentType=json&key=EVPUPWJLED7AAULMJBMDVB3GJ");
var i;
var forecast_conditions =
    [
        { "conditions": "", "temp": 0, "hum": 0, "date": null }, //0
        { "conditions": "", "temp": 0, "hum": 0, "date": null }, //1
        { "conditions": "", "temp": 0, "hum": 0, "date": null }, //2
        { "conditions": "", "temp": 0, "hum": 0, "date": null }, //3
        { "conditions": "", "temp": 0, "hum": 0, "date": null }, //4
        { "conditions": "", "temp": 0, "hum": 0, "date": null }, //5
        { "conditions": "", "temp": 0, "hum": 0, "date": null }, //6
        { "conditions": "", "temp": 0, "hum": 0, "date": null }, //7
        { "conditions": "", "temp": 0, "hum": 0, "date": null }, //8
        { "conditions": "", "temp": 0, "hum": 0, "date": null }, //9
        { "conditions": "", "temp": 0, "hum": 0, "date": null }, //10
        { "conditions": "", "temp": 0, "hum": 0, "date": null }, //11
        { "conditions": "", "temp": 0, "hum": 0, "date": null }, //12
        { "conditions": "", "temp": 0, "hum": 0, "date": null }, //13
        { "conditions": "", "temp": 0, "hum": 0, "date": null }, //14
        { "conditions": "", "temp": 0, "hum": 0, "date": null }, //15
    ];

function getPrevision() {
    fetch(dataUrl)
        .then(response => {
            if (!response.ok)
                throw new Error("Something went wrong");
            else
                return response.json();
        })
        .then((response) => {
            getForecastData(response);
        })
}

function getForecastData(response) {
    console.log(response);
    for (i = 0; i < 16; i++) {
        forecast_conditions[i]["date"] = new Date(response.locations["Urbino,PU,61034"].values[i].datetimeStr);
        forecast_conditions[i]["conditions"] = response.locations["Urbino,PU,61034"].values[i].conditions;
        forecast_conditions[i]["temp"] = response.locations["Urbino,PU,61034"].values[i].temp;
        forecast_conditions[i]["hum"] = response.locations["Urbino,PU,61034"].values[i].humidity;
    }
}