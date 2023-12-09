const serverDataUrl = new URL("http://10.25.0.14:3000/misurazioni?data_ora");


async function getServerDayData() {
    var data;
    fetch(serverDataUrl)
        .then(response => {
            alert("TEST");
            if(!response.ok) throw new Error();
            return response.json();
        })
        .then(function(response) {
            do {
                var currentResponse = response.pop();
                var dataDay = currentResponse["data_ora"].slice(8, 10);
                if(currentResponse.tipo == "UMIDITA") {
                    currentData.humdities[currentData.humidityIndex] = currentResponse['valore'];
                    currentData.humidityIndex++;
                } else if(currentResponse.tipo == "TEMPERATURA") {
                    currentData.temperatures[currentData.temperatureIndex] = currentResponse['valore'];
                    currentData.temperatureIndex++;
                }
            } while(dataDay == currentDate.toString().slice(8, 10));
        })
        .catch(error => {
            console.error(`Error in fetching server data: ${error}`);
            $("#error").css("display", "flex");
        });
}
async function getServerWeekData() {
    var data;
    fetch(serverDataUrl)
        .then(response => {
            if(!response.ok) throw new Error();
            return response.json();
        })
        .then(function(response) {
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
                var currentResponse = response.pop();
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
        })
        .catch(error => {
            console.error(`Error in fetching server data: ${error}`);
            $("#error").css("display", "flex");
        });
    return data;
}
