var dataUrl = new URL("http://10.25.0.14:3000/misurazioni?data_ora");
var currentResponse;
var day_humidity_data = [], week_humidity_data = [], week_temperature_data = [], day_temperature_data = [];
var day_tempIndex = 0, day_humIndex = 0, week_humIndex = 0, week_tempIndex = 0;
var currentDate = new Date(), dataDay;
var lastWeek, week;
var date = [];
var updateUI = () => {};

function getData(ev) {
    updateUI();
    postMessage(
    {
        "message": "updateUI",
        "passed": updateUI,
    });
    fetch(dataUrl)
        .then(response => {
            if (!response.ok)
                throw new Error("Something went wrong");
            return response.json();
        })
        .then((response) => {
            writeDayData(response);
            writeWeekData(response);
        })
        .catch(console.warn);
}


function writeDayData(response) {
    day_tempIndex = 0;
    day_humIndex = 0;

    do {
        currentResponse = response.pop();
        dataDay = currentResponse["data_ora"].slice(8, 10);
        if (currentResponse.tipo == "UMIDITA") {
            day_humidity_data[day_humIndex] = currentResponse['valore'];
            day_humIndex++;
        }
        else if (currentResponse.tipo == "TEMPERATURA") {
            day_temperature_data[day_tempIndex] = currentResponse['valore'];
            day_tempIndex++;
        }
    } while (dataDay == currentDate.toString().slice(8, 10));

    postMessage({
        "message": "dayData",
        "day_temp": day_temperature_data,
        "day_hum": day_humidity_data,
    });
}

function writeWeekData(response) {
    week_tempIndex = 0;
    week_humIndex = 0;

    week = response[response.length - 1]["data_ora"].slice(0, 10);
    copyWeek = week;

    date[0] = week.slice(0, 4);
    week = copyWeek;
    date[1] = week.slice(5, 7);
    week = copyWeek;
    date[2] = week.slice(8, 10);

    lastWeek = new Date(date[0], date[1] - 1, date[2] - 8);

    do {
        currentResponse = response.pop();
        week = currentResponse["data_ora"].slice(0, 10);
        copyWeek = week;

        date[0] = week.slice(0, 4);
        week = copyWeek;
        date[1] = week.slice(5, 7);
        week = copyWeek;
        date[2] = week.slice(8, 10);

        week = new Date(date[0], date[1] - 1, date[2]);

        if (currentResponse["tipo"] === "UMIDITA") {
            week_humidity_data[week_humIndex] = currentResponse["valore"];
            week_humIndex++;
        }
        else if (currentResponse["tipo"] === "TEMPERATURA") {
            week_temperature_data[week_tempIndex] = currentResponse["valore"];
            week_tempIndex++;
        }
    } while (week.toDateString() != lastWeek.toDateString());

    postMessage({
        "week_temp": week_temperature_data,
        "week_hum": week_humidity_data,
        "loading": false,
    });
}

getData();
setInterval(getData, 30*60*1000);