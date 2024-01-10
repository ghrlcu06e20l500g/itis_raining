const serverDataUrl = new URL("http://10.25.0.14:3000/misurazioni?data_ora");


async function getServerDayData() {
    return new Promise(function(resolve, reject) {
        fetch(serverDataUrl)
            .then(function(response) {
                if(!response.ok) throw new Error();
                return response.json();
            })
            .then(function(response) {
                var i = 0;
                do {
                    var currentResponse = response.pop();
                    var dataDay = currentResponse["data_ora"].slice(8, 10);

                    if(currentResponse.tipo == "UMIDITA") currentData.humdities[i] = currentResponse['valore'];
                    else if(currentResponse.tipo == "TEMPERATURA") currentData.temperatures[i] = currentResponse['valore'];
                    i++;
                } while(dataDay == currentDate.toString().slice(8, 10));
            })
            .catch(function(error) {
                console.error(error);
                $("#error_data").html(error.toString());
                $("#error").show();
            });
    });
}
async function getServerWeekData() {
    return new Promise(function(resolve, reject) {
        fetch(serverDataUrl)
            .then(function(response) {
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
                
                var i = 0;
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
            
                    if(currentResponse["tipo"] === "UMIDITA") currentData.humidities[i] = currentResponse["valore"];
                    else if(currentResponse["tipo"] === "TEMPERATURA") currentData.temperatures[i] = currentResponse["valore"];
                    
                    i++;
                } while(week.toDateString() != lastWeek.toDateString());
            })
            .catch(function(error) {
                console.error(error);
                $("#error_data").html(error.toString());
                $("#error").show();
            });
    });
}
