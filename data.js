/*
    Da modificare temperature(), humidity() e weather() delle classi perché restituiscano i dati di this.date
    (per qualche motivo this è obbligatorio in javascript)
*/

var dataUrl = new URL("http://10.25.0.14:3000/misurazioni?data_ora");
var currentResponse;
var temperature_data = [], humidity_data = [];
var tempIndex = 0, humIndex = 0;
var currentDate = new Date(), dataDay;

const Weather = {
    SUNNY: "sunny",
    VEILED: "veiled",
    CLOUDY: "cloudy",
    RAIN: "rain",
    SNOW: "snow",
    NO_DATA: "no_data"
};
class Day {
    constructor(date) {
        this.date = new Date(date.toISOString().split("T")[0]);
        this._temperature = null;
        this._humidity = null;
        this._weather = null;
    }

    temperature(response) 
    {
        tempIndex = 0;

        do
        {
            currentResponse = response.pop();
            dataDay = currentResponse["data_ora"].slice(8, 10);
            if(currentResponse["tipo"] === "TEMPERATURA") {
                temperature_data[tempIndex] = currentResponse["valore"];
                tempIndex++;
            }
        }while(dataDay != currentDate.getDate());
        return 0;
    }
    
    humidity(response) 
    {
        humIndex = 0;

        do
        {
            currentResponse = response.pop();
            dataDay = currentResponse["data_ora"].slice(8, 10);
            if (currentResponse["tipo"] === "UMIDITA") {
                humidity_data[humIndex] = currentResponse["valore"];
                humIndex++;
            }
        }while(dataDay != currentDate.getDate());
        return 0;
    }
    
    get weather() {
        return Weather.CLOUDY;
    }
    
    monthString() {
        return new Intl.DateTimeFormat("en-US", { month: "long" }).format(this.date);
    }
    
    weekdayString() {
        return new Intl.DateTimeFormat("en-US", { weekday: "long" }).format(this.date);
    }
    
    suffix() 
    {
        if(Math.floor(this.date.getDate()) != this.date.getDate()) return "";
        if(this.date.getDate() >= 11 && this.date.getDate() <= 13) return "th";
        switch(this.date.getDate() % 10) {
            case 1:
                return "st";
            case 2:
                return "nd";
            case 3:
                return "rd";
            default:
                return "th";
        }
    }

    currentConditions()
    {
        dataUrl = new URL("https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/weatherdata/forecast?locations=Urbino,PU,61034&aggregateHours=24&lang=it&unitGroup=metric&shortColumnNames=false&contentType=json&key=EVPUPWJLED7AAULMJBMDVB3GJ");
        fetchData(1);
    }
    
    getCurrentConditions(response)
    {
        
    }

    fetchData(ev)
    {
        fetch(dataUrl)
            .then(response => {
                if (!response.ok)
                    throw new Error("Something went wrong");
                return response.json();
            })
            .then((response) => {
                if(ev==0)
                {
                    temperature(response);
                    humidity(response);
                }
                else
                {

                }
            })
            .catch(console.warn);
    }

}


class Time {
    constructor(date) {
        this.date = new Date(date.toString());
        this._temperature = null;
        this._humidity = null;
        this._weather = null;
    }
    get temperature() {
        return 30;
    }
    get humidity() {
        return 50;
    }
    get weather() {
        return Weather.CLOUDY;
    }
}