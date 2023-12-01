function day(date) {
    $("#nav_week").removeClass("selected");
    $("#nav_day").addClass("selected");
    
    $("main").html( /* html */ `
        <div>${date.toString()}</div>
        <canvas id="temperature_chart"></canvas>
        <canvas id="humidity_chart"></canvas>
    `);
    new Chart($("#temperature_chart")[0].getContext("2d"), {
        type: "line",
        data: {
            labels: [
                "01:00", "02:00", "03:00", "04:00", "05:00", "06:00", "07:00", "08:00", "09:00", "10:00", "11:00", "12:00",
                "13:00", "14:00", "15:00", "16:00", "17:00", "18:00", "19:00", "20:00", "21:00", "22:00", "23:00", "24:00"
            ],
            datasets: [{
                label: "Temperature",
                data: day_temperature_data,
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
            labels: [
                "01:00", "02:00", "03:00", "04:00", "05:00", "06:00", "07:00", "08:00", "09:00", "10:00", "11:00", "12:00",
                "13:00", "14:00", "15:00", "16:00", "17:00", "18:00", "19:00", "20:00", "21:00", "22:00", "23:00", "24:00"
            ],
            datasets: [{
                label: "Temperature",
                data: day_humidity_data,
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
