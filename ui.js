function update() {
    if($("#nav_week").hasClass("selected")) week();
    else day();
}


document.addEventListener("DOMContentLoaded", async function() {
    /*
        Variabili di appoggio per i dati di temperatura e umidità della scuola
        NON SO DOVE LI VUOI METTERE 
    */
    var week_humidity_data = [], week_temperature_data = [], day_temperature_data = [], day_humidity_data = [];
    var week_humIndex, week_tempIndex, day_humIndex, day_tempIndex, i;
    /* Verificare se gli indici di temperatura e umidità conincidono; in caso tenere solo un indice per dato */

    $("#nav_day").click(() => day(selected_date));
    $("#nav_week").click(() => week());
    
    $("#settings_button").click(() => $("#settings").toggle());
    $("#settings_close_button").click(() => $("#settings").hide());
    $("#settings").hide();

    $("#date").val(currentDate.toISOString().split("T")[0]);
    $("#date").on("change", function() {
        currentDate = new Date($(this).val());
        update();
    });

    update();
    setInterval(update, 1000 * 60 * 30);
    
    let worker = new Worker("secondThread.js");
    worker.addEventListener("message", function getMessages(data) 
    {
        data = data.data;
        if(data.message === "dayData")
        {
            for(i=0; i<data.humIndex; i++)
                {day_humidity_data[i] = data.hum[i];}
            day_humIndex = data.humIndex;
            for(i=0; i<data.tempIndex; i++)
                {day_temperature_data[i] = data.temp[i];}
            day_tempIndex = data.tempIndex;
        }

        else if(data.message === "weekData")
        {
            for (i=0; i < data.humIndex; i++) 
                {week_humidity_data[i] = data.hum[i];}
            week_humIndex = data.humIndex;
            for (i=0; i < data.tempIndex; i++) 
                {week_temperature_data[i] = data.temp[i];}
            week_tempIndex = data.tempIndex;
        }

        if(data.message!="weekData")
            {getMessages;}
    });

    new Promise(resolve => setTimeout(resolve, 500));
    $("#loading_screen").hide();
});
