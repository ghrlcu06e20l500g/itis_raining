function day() {
    $("#nav_week").removeClass("selected");
    $("#nav_day").addClass("selected");
    
    $("main").html( /* html */ `
        <div id="charts">
            <canvas id="temperature_chart"></canvas>
            <canvas id="humidity_chart"></canvas>
        </div>
        <table>
            <thead>
                <tr>
                    <th>Time</th>
                    <th>Weather</th>
                    <th>Temperature</th>
                    <th>Humidity</th>
                </tr>
            </thead>
            <tbody>
                ${hours.map(function(value) {
                    return /* html */ `
                        <tr>
                            <td>${value}</td>
                            <td>${"Sunny"}</td>
                            <td>${30}</td>
                            <td>${50}</td>
                        </tr>
                    `;
                }).join('')}
            </tbody>
        </table>
    `);
    /*
    try {
        if(currentData.temperatures.some(element => element == null)) throw(new Error("Found null temperature data."));
        new Chart($("#temperature_chart")[0].getContext("2d"), {
            type: "line",
            data: {
                labels: [
                    "01:00", "02:00", "03:00", "04:00", "05:00", "06:00", "07:00", "08:00", "09:00", "10:00", "11:00", "12:00",
                    "13:00", "14:00", "15:00", "16:00", "17:00", "18:00", "19:00", "20:00", "21:00", "22:00", "23:00", "24:00"
                ],
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
        if(currentData.humidies.some(element => element == null)) throw(new Error("Found null humidity data."));
        new Chart($("#humidity_chart")[0].getContext("2d"), {
            type: "line",
            data: {
                labels: [
                    "01:00", "02:00", "03:00", "04:00", "05:00", "06:00", "07:00", "08:00", "09:00", "10:00", "11:00", "12:00",
                    "13:00", "14:00", "15:00", "16:00", "17:00", "18:00", "19:00", "20:00", "21:00", "22:00", "23:00", "24:00"
                ],
                datasets: [{
                    label: "Temperature",
                    data: currentData.humidies,
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
        console.error(`Unable to load day graphs: ${error.message}`);
    }
    */
}
