let selected_date = new Date();

function wait(milliseconds) {
    return new Promise(resolve => setTimeout(resolve, milliseconds));
}
function areDatesEqual(date1, date2) {
    return (
        date1.getFullYear() === date2.getFullYear() &&
        date1.getMonth() === date2.getMonth() &&
        date1.getDate() === date2.getDate()
    );
}  

document.addEventListener("DOMContentLoaded", async function() {
    $("#nav_day").click(() => day(selected_date));
    $("#nav_week").click(() => week());
    week();
    
    $("#settings_button").click(() => $("#settings").toggle());
    $("#settings_close_button").click(() => $("#settings").hide());
    $("#settings").hide();

    await wait(500);
    $("#loading_screen").hide();
});




function day(date) {
    $("#nav_week").removeClass("selected");
    $("#nav_day").addClass("selected");
    $("main").html( /* html */ `
        <div>${date.toString()}</div>
    `);
}

function week() {  
    let currentDayOfWeek = selected_date.getDay();
    
    // Adjust the current day of the week to consider Monday as the first day
    if(currentDayOfWeek == 0) currentDayOfWeek = 6; // Sunday is considered the last day in this case
    else currentDayOfWeek -= 1;
    
    // Calculate the start of the week (Monday) by subtracting the adjusted current day of the week
    let startOfWeek = new Date(selected_date);
    startOfWeek.setDate(selected_date.getDate() - currentDayOfWeek);
    
    let weekDays = [];
    
    for(let i = 0; i < 7; i++) {
        let currentDate = new Date();
        currentDate.setDate(startOfWeek.getDate() + i);
        weekDays.push(new Day(currentDate));
    }

    $("#nav_day").removeClass("selected");
    $("#nav_week").addClass("selected");

    let today = new Date();
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
    $("#date").val(selected_date.toISOString().split("T")[0]);
    $("#date").on("change", function() {
        selected_date = new Date($(this).val());
        week();
    });
    let temperature_chart = new Chart($("#temperature_chart").getContext("2d"),{
        type: 'line',
        data: data,
        options: options
    );
}

  