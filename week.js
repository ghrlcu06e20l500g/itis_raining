function week() {
    $("#nav_day").removeClass("selected");
    $("#nav_week").addClass("selected");

    let selectedWeek = getWeekDates(selectedDate);

    $("main").html( /* html */ `
        <div id="days">
            ${weekDays.map(function(element) {
                return /* html */ `
                    <div ${areDatesEqual(element.date, today) ? 'class="current"' : ''}
                        style = "background-image: url('images/backgrounds/${element.weather}.png');"
                        title = "Click to view day"
                    >
                        <div id="day_weekday">${element.weekdayString().toUpperCase()}</div>
                        <div id="day_date">${element.date.getDate()}${element.suffix()} of ${element.monthString()}</div>
                        <div id="day_temperature">${element.temperature}°C</div>
                        <div id="day_humidity">${element.humidity}%H</div>
                    </div>
                `;
            }).join("")}
        </div>
        <input type="date" id="date">
        <canvas id="temperature_chart"></canvas>
        <canvas id="humidity_chart"></canvas>
    `);
    $("main").css({
        "background-image": "url()"
    });
    $("#days > div").click(() => day(new Date()));
  
    let temperature_chart = new Chart($("#temperature_chart").getContext("2d"), {
        type: "line",
        data: {
            labels: current_week.dayStrings,
            datasets: [{
                label: "Temperature",
                data: current_week.temperatures,
                borderColor: "rgba(75, 192, 192, 1)",
                borderWidth: 2,
                fill: false
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                x: {
                    type: "category",
                    position: "bottom"
                },
                y: {
                    beginAtZero: true
                }
            }
        }
    });
    let humidity_chart = new Chart($("#humidity_chart").getContext("2d"), {
        type: "line",
        data: {
            labels: current_week.dayStrings,
            datasets: [{
                label: "Temperature",
                data: current_week.temperatures,
                borderColor: "rgba(75, 192, 192, 1)",
                borderWidth: 2,
                fill: false
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                x: {
                    type: "category",
                    position: "bottom"
                },
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}
