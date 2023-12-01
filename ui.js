function updateUI() {
    if($("#nav_week").hasClass("selected")) week();
    else day();
}

document.addEventListener("DOMContentLoaded", async function() {
    $("#nav_day").click(() => day(selected_date));
    $("#nav_week").click(() => week());
    week();
    
    $("#settings_button").click(() => $("#settings").toggle());
    $("#settings_close_button").click(() => $("#settings").hide());
    $("#settings").hide();

    $("#date").val(currentDate.toISOString().split("T")[0]);
    $("#date").on("change", function() {
        currentDate = new Date($(this).val());
        updateUI();
    });
    
    let worker = new Worker("secondThread.js");
    worker.addEventListener("message", (data) => {
        data = data.data;
        if(data.message === "ui")
            {updateUI = data.passed;}
        else if(data.message === "dayData")
        {

        }
        else if(data.message === "weekData")
        {
            
        }
    });
    while(worker_updating);

    new Promise(resolve => setTimeout(resolve, 500));
    $("#loading_screen").hide();
});
