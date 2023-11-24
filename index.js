temperatures = [
    30, 30, 30, 30, 30, 30, 30
];
humidities = [
    50, 50, 50, 50, 50, 50, 50
];

function wait(milliseconds) {
    return new Promise(resolve => setTimeout(resolve, milliseconds));
}
  

document.addEventListener("DOMContentLoaded", async function() {
    $("#nav_day").click(function() {
        $("#nav_week").removeClass("selected");
        $(this).addClass("selected");
        day();
    })
    $("#nav_week").click(function() {
        $("#nav_day").removeClass("selected");
        $(this).addClass("selected");
        week();
    })
    week();
    
    $("#settings_button").click(function() {
        $("#settings").toggle();
    });
    $("#settings").hide();
    $("#settings_close_button").click(function() {
        $("#settings").hide();
    });
    
    
    $("#date").val(new Date().toISOString().split("T")[0]);
    await wait(500);
    $("#loading_screen").hide();
});




function day() {
    $("main").html( /* html */ `
        <div>day</div>
    `);
}
function week() {
    $("main").html( /* html */ `
        <div id="days">
            <div>
                <div>MONDAY</div>
                <div>${temperatures[0]}°C</div>
                <div>${humidities[0]}%H</div>
            </div>
            <div>
                <div>TUESDAY</div>
                <div>${temperatures[1]}°C</div>
                <div>${humidities[1]}%H</div>
            </div>
            <div>
                <div>WEDNESDAY</div>
                <div>${temperatures[2]}°C</div>
                <div>${humidities[2]}%H</div>
            </div>
            <div>
                <div>THURSDAY</div>
                <div>${temperatures[3]}°C</div>
                <div>${humidities[3]}%H</div>
            </div>
            <div>
                <div>FRIDAY</div>
                <div>${temperatures[4]}°C</div>
                <div>${humidities[4]}%H</div>
            </div>
            <div>
                <div>SATURDAY</div>
                <div>${temperatures[5]}°C</div>
                <div>${humidities[5]}%H</div>
            </div>
            <div>
                <div>SUNDAY</div>
                <div>${temperatures[6]}°C</div>
                <div>${humidities[6]}%H</div>
            </div>
        </div>
    `);
}
