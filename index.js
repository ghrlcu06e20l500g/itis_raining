document.addEventListener("DOMContentLoaded", function() {
    // .menu
        $(".menu").each(function() {
            $(this).data("active", $(this).find("button.active").text());
        });
        $(".menu button").click(function() {
            $(this).closest(".menu").find("button").removeClass("active");
            $(this).addClass("active");

            $(this).closest(".menu").data("active", $(this).text());
            $(this).closest(".menu").trigger("change");
        });

    // #charts
        let day = new Array(24);
        day.fill({
            "temperature": 30,
            "humidity": 0.5
        });
        let temperature_chart = new Chart($("#temperature").get(0).getContext("2d"), {
            type: "line",
            data: {
                labels: Array.from({length: 24}, (_, i) => `${i + 1}:00`),
                datasets: [{
                    label: "",
                    data: Array.from({length: 24}, (_, i) => day[i]["temperature"]),
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
        let humidity_chart = new Chart($("#humidity").get(0).getContext("2d"), {
            type: "line",
            data: {
                labels: Array.from({length: 24}, (_, i) => `${i + 1}:00`),
                datasets: [{
                    label: "",
                    data: Array.from({length: 24}, (_, i) => day[i]["temperature"]),
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
        function update_graphs() {
            temperature_chart.data.datasets[0].label = 
                `${($("#language_menu").data("active") == "ENG")? "Temperature": "Temperatura"} (°${$("#degree_menu").data("active")})`
            ;
            switch ($("#degree_menu").data("active")) {
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
            temperature_chart.update();
            humidity_chart.data.datasets[0].label = `${($("#language_menu").data("active") == "ENG")? "Humidity": "Umidità"} (%RH)`;
            humidity_chart.update();
        }
        update_graphs();

    // #day_selection
        function update_day_list() {
            $("#day_list *").each(function() {
                $(this).html(/* html */ `
                    <div class="text_div"
                        data-ENG="05 / 10 / 2023 <br> Sunday"
                        data-ITA="05 / 10 / 2023 <br> Domenica"
                    >
                    <img src="images/sunny.png">
                    <div class="text_div">30°${$("#degree_menu").data("active")} 50%RH</div>
                `);
            });
        }
        $("#degree_menu").on("change", function() {
            update_day_list();
            update_graphs();
        });
        update_day_list();

    // #language_menu
        function update_language() {
            $(`div[data-${$("#language_menu").data("active")}]`).each(function() {
                $(this).html($(this).data($("#language_menu").data("active")));
            });
            update_graphs();
        }
        $("#language_menu").on("change", update_language);
        update_language();
});
