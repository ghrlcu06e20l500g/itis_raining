temperature_data = []
humidity_data = []

function get_day_data(date) {

}
function get_week_data(date) {

}

document.addEventListener("DOMContentLoaded", function() {
    // #charts
        temperature_chart = new Chart($("#temperature").get(0).getContext("2d"), {
            type: "line",
            data: {
                labels: Array.from({length: 24}, (_, i) => `${i + 1}:00`),
                datasets: [{
                    label: "",
                    data: temperature_data,
                    backgroundColor: "orange",
                    borderColor: "red",
                    borderWidth: 2,
                    pointStyle: "none",
                    radius: 2
                }]
            },
            options: {
                responsive: false,
                maintainAspectRatio: false,
                scales: {
                    y: {
                        suggestedMin: -20,
                        suggestedMax: 50
                    }
                }
            }
        }); 
        humidity_chart = new Chart($("#humidity").get(0).getContext("2d"), {
            type: "line",
            data: {
                labels: Array.from({length: 24}, (_, i) => `${i + 1}:00`),
                datasets: [{
                    label: "",
                    data: humidity_data,
                    backgroundColor: "rgb(135, 206, 250)",
                    borderColor: "blue", 
                    borderWidth: 2,
                    pointStyle: "none",
                    radius: 2
                }]
            },
            options: {
                responsive: false,
                maintainAspectRatio: false,
                scales: {
                    y: {
                        beginAtZero: true,
                        suggestedMax: 100
                    }
                }
            }
        });
        function update_charts() {
            temperature_chart.data.datasets[0].label = `${($("#language_menu").value == "eng")? "Humidity": "Umidità"} (${$("#degree_menu").value}°)`;
            humidity_chart.data.datasets[0].label = `${($("#language_menu").value == "eng")? "Humidity": "Umidità"} (%RH)`;
            switch($("#degree_menu").value) {
                case "C":
                    temperature_chart.data.datasets[0].data = Array.from({length: 24}, (_, i) => day[i]["temperature"]);
                    temperature_chart.options.scales.y.suggestedMin = -20;
                    temperature_chart.options.scales.y.suggestedMax = 50;
                    break;
                case "F":
                    temperature_chart.data.datasets[0].data = Array.from({length: 24}, (_, i) => (day[i]["temperature"] * 9/5) + 32);
                    temperature_chart.options.scales.y.suggestedMin = 0;
                    temperature_chart.options.scales.y.suggestedMax = 120;
                    break;
                case "K":
                    temperature_chart.data.datasets[0].data = Array.from({length: 24}, (_, i) => day[i]["temperature"] +  273.15);
                    temperature_chart.options.scales.y.suggestedMin = 250;
                    temperature_chart.options.scales.y.suggestedMax = 320;
                    break;
                default:
                    break;
            }
            if($("chart_menu").value == "day") get_day_data();
            else get_week_data();
            temperature_chart.data.datasets[0].data = temperature_data;
            humidity_chart.data.datasets[0].data = humidity_data;

            temperature_chart.update();
            humidity_chart.update();
        }
        update_charts();

        $("#chart_menu").on("change", update_charts);

    // #day_selection
        function update_day_list() {
            for(let i = 0; i < 7; i++) {
                $(`#day_list :nth-child(${i})`).html(/* html */ `
                    <div class="text_div"
                        data-eng = "${new Date().toString()} Sunday"
                        data-ita = "${new Date().toString()} Domenica"
                    >
                    <img src="images/sunny.png">
                    <div class="text_div">30°${$("#degree_menu").value} 50%RH</div>
                `);
            }
        }
        $("#degree_menu").on("change", function() {
            update_day_list();
            update_charts();
        });
        update_day_list();

    // #language_menu
        function update_language() {
            $(`div[data-${$("#language_menu").value}]`).each(function() {
                $(this).html($(this).data($("#language_menu").value));
            });
            update_charts();
        }
        $("#language_menu").on("change", update_language);
        update_language();
});

