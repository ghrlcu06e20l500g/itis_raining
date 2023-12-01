function day(date) {
    $("#nav_week").removeClass("selected");
    $("#nav_day").addClass("selected");
    $("main").html( /* html */ `
        <div>${date.toString()}</div>
        <canvas id="temperature_chart"></canvas>
        <canvas id="humidity_chart"></canvas>
    `);
    
    new Chart($("#temperature_chart").getContext("2d"), {
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
    new Chart($("#humidity_chart").getContext("2d"), {
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
