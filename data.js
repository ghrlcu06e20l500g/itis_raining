/*
    Da modificare temperature(), humidity() e weather() delle classi perché restituiscano i dati di this.date
    (per qualche motivo this è obbligatorio in javascript)
*/

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
    monthString() {
        return new Intl.DateTimeFormat("en-US", { month: "long" }).format(this.date);
    }
    weekdayString() {
        return new Intl.DateTimeFormat("en-US", { weekday: "long" }).format(this.date);
    }
    suffix() {
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
}
class Time {
    constructor(date) {
        this.date = new Date(date.toString());
        this._temperature = null;
        this._humidity = null;
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