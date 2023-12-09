async function update() {
    $("#loading_screen").show();

    if($("#nav_week").hasClass("selected")) {
        await getWeekData();
        week();
    } else {
        await getDayData();
        day();
    }
    
    $("#loading_screen").hide();
}

document.addEventListener("DOMContentLoaded", async function() {
    $("#nav_day").click(() => day());
    $("#nav_week").click(() => week());
    
    $("#settings_button").click(() => $("#settings").toggle());
    $("#settings_close_button").click(() => $("#settings").hide());
    $("#settings").hide();

    $("#date").val(currentDate.toISOString().split("T")[0]);
    $("#date").on("change", async function() {
        currentDate = new Date($(this).val());
        await update();
    });

    await update();
    setInterval(await update(), 1000 * 60 * 30);
    
    $("#loading_screen").hide();
});
