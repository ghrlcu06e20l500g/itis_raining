/*
    Da modificare temperature(), humidity() e weather() delle classi perché restituiscano i dati di this.date
    (per qualche motivo this è obbligatorio in javascript)
*/

var dataUrl = new URL("http://10.25.0.14:3000/misurazioni?data_ora");
var currentResponse;
var temperature_data = [];
var humidity_data = [];
var tempIndex = 0, humIndex = 0;
var currentDate = new Date(), dataDay;

var selectedDate = new Date();
