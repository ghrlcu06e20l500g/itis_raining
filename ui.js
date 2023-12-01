document.addEventListener("DOMContentLoaded", async function() {
    $("#nav_day").click(() => day(selected_date));
    $("#nav_week").click(() => week());
    week();
    
    $("#settings_button").click(() => $("#settings").toggle());
    $("#settings_close_button").click(() => $("#settings").hide());
    $("#settings").hide();

    $("#date").val(selectedDate.toISOString().split("T")[0]);
    $("#date").on("change", function() {
        selectedDate = new Date($(this).val());
        if($("#nav_week").hasClass("selected")) week();
        else day();
    });

    await wait(500);
    $("#loading_screen").hide();
});
