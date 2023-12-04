var dataUrl = new URL("http://10.25.0.14:3000/misurazioni?data_ora");
var currentData = null;
var currentDate = new Date(), dataDay;


async function getDayData() {
    var data;
    fetch(dataUrl)
        .then(response => {
            alert("TEST");
            if(!response.ok) throw new Error();
            return response.json();
        })
        .then((response) => {
            data = writeDayData(response);
        })
        .catch(error => {
            // per qualche motivo, le funzioni sopra e sotto di console.error sono eseguite una 20ina di secondi dopo.
            console.error(`Error in fetching server data: ${error}`);
            $("#error").css("display", "flex");
        });
    return data;
}

function writeDayData(response) {
    var data = {
        temperatures: new Array(24),
        humdities: new Array(24),
        temperatureIndex: 0,
        humidityIndex: 0
    };

    do {
        currentResponse = response.pop();
        dataDay = currentResponse["data_ora"].slice(8, 10);
        if(currentResponse.tipo == "UMIDITA") {
            data.humdities[data.humidityIndex] = currentResponse['valore'];
            data.humidityIndex++;
        } else if(currentResponse.tipo == "TEMPERATURA") {
            data.temperatures[data.temperatureIndex] = currentResponse['valore'];
            data.temperatureIndex++;
        }
    } while(dataDay == currentDate.toString().slice(8, 10));

    return data;
}

async function getWeekData() {
    var data;
    fetch(dataUrl)
        .then(response => {
            if(!response.ok) throw new Error();
            return response.json();
        })
        .then((response) => {
            data = writeWeekData(response);
        })
        .catch(error => {
            // per qualche motivo, le funzioni sopra e sotto di console.error sono eseguite una 20ina di secondi dopo.
            console.error(`Error in fetching server data: ${error}`);
            $("#error").css("display", "flex");
        });
    return data;
}

function writeWeekData(response) {
    var data = {
        temperatures: new Array(7),
        humidities: new Array(7),
        temperatureIndex: 0,
        humidityIndex: 0
    };
    var lastWeek, week;
    var date = [];

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

        if(currentResponse["tipo"] === "UMIDITA") {
            data.humidities[data.humidityIndex] = currentResponse["valore"];
            data.humidityIndex++;
        } else if(currentResponse["tipo"] === "TEMPERATURA") {
            data.temperatures[data.temperatureIndex] = currentResponse["valore"];
            data.temperatureIndex++;
        }
    } while(week.toDateString() != lastWeek.toDateString());

    return data;
}
