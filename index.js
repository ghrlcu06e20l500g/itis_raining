/*itismattei = chiave del certificato per openssl certificato LASICARE QUI PER ORA*/

const weekdays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const hours = [
    "00:00", "01:00", "02:00", "03:00", "04:00", "05:00", "06:00", "07:00", "08:00", "09:00", "10:00", "11:00",
    "12:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00", "19:00", "20:00", "21:00", "22:00", "23:00",
];

async function showForecast() {
    $("#loading_screen").show();

    await updateForecastData();

    $("#nav_history").removeClass("selected");
    $("#nav_forecast").addClass("selected");

    var days = "";
    for(day of forecastData) {
        var temp = "";
        switch($("#degree_select").val()) {
            case "F":
                temp = `${((day.temperature * 9/5) + 32).toFixed(1)}°F`;
                break;
            case "K":
                temp = `${(day.temperature + 273.152).toFixed(1)}°K`;
                break;
            default:
                temp = `${day.temperature.toFixed(1)}°C`;
                break;
        }
        days += /* html */ `
            <div 
                style="background-image: url('images/backgrounds/${day.weather.split(",")[0].split(" ")[0]}.png');"
                class="${(day.date.toISOString().split('T')[0] == new Date().toISOString().split('T')[0])? 'current' : ''}"
            >
                <img src="images/icons/${day.weather.split(",")[0].split(" ")[0]}.png">
                <div id="day_date_data">
                    <div id="weekday">${weekdays[day.date.getDay()]}</div>
                    <div id="date">${day.date.toISOString().split('T')[0]}</div>
                </div>
                <div id="day_values_data">
                    <div id="temperature">${temp}</div>
                    <div id="humidity">${day.humidity.toFixed(1)}%H</div>
                </div>
            </div>
        `;
    }

    $("main").html(/* html */ `
        <div id="days">${days}</div>
    `);

    $("#loading_screen").hide();
}

var selectedDate = new Date();
selectedDate.setDate(selectedDate.getDate() - 1);

var temperatureChart;
var humidityChart;
async function showHistory() {
    $("#loading_screen").show();

    await updateHistoryData(selectedDate);

    $("#nav_forecast").removeClass("selected");
    $("#nav_history").addClass("selected");

    var yesteday = new Date();
    yesteday.setDate(yesteday.getDate() - 1);
    $("main").html(/* html */ `
        <input type="date" id="date" class="interactable" min="2023-01-01" title="Click to select a date"
            max="${yesteday.toISOString().split('T')[0]}" 
            value="${selectedDate.toISOString().split('T')[0]}" 
        >
        <div id="charts">
            <canvas id="temperature_chart"></canvas>
            <canvas id="humidity_chart"></canvas>
        </div>
    `);

    temperatureChart = new Chart($("#temperature_chart")[0].getContext("2d"), {
        type: "line",
        data: {
            labels: hours,
            datasets: [{
                label: `Temperature (${$("#degree_select").val()})`,
                data: historyData.map(entry => {
                    switch($("#degree_select").val()) {
                        case "F":
                            return (entry.temperature * 9/5) + 32;
                        case "K":
                            return entry.temperature + 273.15;
                        default:
                            return entry.temperature;
                    }
                }),
                borderColor: "#dbae00",
                backgroundColor: "#ffce0f",
                borderWidth: 2,
                fill: false
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true,
                    suggestedMin: -20,
                    suggestedMax: 50
                }
            }
        }
    });
    humidityChart = new Chart($("#humidity_chart")[0].getContext("2d"), {
        type: "line",
        data: {
            labels: hours,
            datasets: [{
                label: "Humidity",
                data: historyData.map(entry => entry.humidity),
                borderColor: "#183973",
                backgroundColor: "#214e9d",
                borderWidth: 2,
                fill: false
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true,
                    suggestedMin: 0,
                    suggestedMax: 100
                }
            }
        }
    });

    $("#date").change(function() {
        selectedDate = new Date($(this).val());
        showHistory();
    });

    $("#loading_screen").hide();
}

$("#nav_forecast").click(() => showForecast());
$("#nav_history").click(() => {
    showHistory();
});

$("#settings_button").click(() => $("#settings").css("display", "flex"));
$("#settings_close_button").click(() => $("#settings").hide());

$("#degree_select").change(function() {
    if($("#nav_forecast").hasClass("selected")) showForecast();
    else showHistory();
});
$("header h1").click(() => alert("Ciao!"));

showForecast();
