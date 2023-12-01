function week() {
    $("#nav_day").removeClass("selected");
    $("#nav_week").addClass("selected");

    let selectedWeek = getWeekDates(selectedDate);
    let today = new Date();
    getData();

    let daysHtml = '';

    for(let i = 0; i < selecetedWeek.length; i++) daysHtml += /* html */ `
        <div ${areDatesEqual(selecetedWeek[i], today) ? 'class="current"' : ''}
            style="background-image: url('images/backgrounds/${"cloudy"}.png');"
            title="Click to view day"
        >
            <div id="day_weekday">${weekDays[selecetedWeek[i].getDay()]}</div>
            <div id="day_date">${selecetedWeek[i].getDate()}${suffix(selecetedWeek[i])} of ${months[selecetedWeek[i].getMonth()]}</div>
            <div id="day_temperature">${temperature_data[i]}°C</div>
            <div id="day_humidity">${humidity_data[i]}%H</div>
        </div>
    `;

    $("main").html( /* html */ `
        <div id="days">${daysHtml}</div>
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
