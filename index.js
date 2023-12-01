document.addEventListener("DOMContentLoaded", async function() {
    let selected_date = new Date();

    $("#nav_day").click(() => day(selected_date));
    $("#nav_week").click(() => week());
    week();
    
    $("#settings_button").click(() => $("#settings").toggle());
    $("#settings_close_button").click(() => $("#settings").hide());
    $("#settings").hide();

    await wait(500);
    $("#loading_screen").hide();
});
