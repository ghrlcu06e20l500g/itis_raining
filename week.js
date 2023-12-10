function week() {
    $("#nav_day").removeClass("selected");
    $("#nav_week").addClass("selected");

    let currentWeek = getWeekDates(currentDate);
    let today = new Date();

    let daysHtml = "";
    
    for(let i = 0; i < currentWeek.length; i++) daysHtml += /* html */ `
        <div ${areDatesEqual(currentWeek[i], today)? 'class="current"' : ""}
            style="background-image: url('images/backgrounds/${"cloudy"}.png');"
            title="Click to view day"
            data-date=${currentWeek[i].toISOString()}
        >   
            <div id="day_weekday">${weekDays[currentWeek[i].getDay()]}</div>
            <div id="day_date">${months[currentWeek[i].getMonth()]} ${currentWeek[i].getDate()}${suffix(currentWeek[i])}</div>
            <div id="day_temperature">${currentData.temperatures[i]}°C</div>
            <div id="day_humidity">${currentData.humidities[i]}%H</div>
        </div>
    `;

    $("main").html( /* html */ `
        <div id="days">${daysHtml}</div>
        <div id="charts">
            <canvas id="temperature_chart"></canvas>
            <canvas id="humidity_chart"></canvas>
        </div>
    `);
    $("main").css({
        "background-image": "url()"
    });
    $("#days > div").click(function() {
        currentDate = new Date($(this).data("date"));
        $("#date").val(currentDate.toISOString().split("T")[0]);
        day();
    });
    /*
    try {
        new Chart($("#temperature_chart")[0].getContext("2d"), {
            type: "line",
            data: {
                labels: currentWeek.map(date => weekDays[date.getDay()]),
                datasets: [{
                    label: "Temperature",
                    data: currentData.temperatures,
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
        new Chart($("#humidity_chart")[0].getContext("2d"), {
            type: "line",
            data: {
                labels: currentWeek.map(date => weekDays[date.getDay()]),
                datasets: [{
                    label: "Temperature",
                    data: currentData.humidities,
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
    } catch(error) {
        console.error("An error occurred:", error);
    }
    */
}
