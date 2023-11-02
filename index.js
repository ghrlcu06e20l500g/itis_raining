function capitalize(string) {
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
}
class Day {
    constructor(date, weather, temperature) {
        this.date = date;
        this.weather = weather;
        this.temperature = temperature;
    }
    card() {
        return /* html */ `
            <div>${this.date.getDate()}/${this.date.getMonth() + 1}/${this.date.getFullYear()}</div>
            <div>${this.date.toLocaleDateString(undefined, {weekday: "long"})}</div>
            <img src="images/${this.weather.toLowerCase()}.png">
            <div>${capitalize(this.weather).replace(/_/g, ' ')} (${this.temperature}°C)</div>
        `;
    }
}

class Daytest {
    constructor(ticks) {
        this.ticks = ticks;
    }
    temperature() {
        let sum = 0;
        for(let i = 0; i < this.ticks.length; i++) sum += this.ticks[i].temperature;
        return sum / this.ticks.length;
    }
}
class Hour {
    constructor(ticks) {
        this.ticks = ticks;
    }
    temperature() {
        let sum = 0;
        for(let i = 0; i < this.ticks.length; i++) sum += this.ticks[i].temperature;
        return sum / this.ticks.length;
    }
}


(60 * 60) / 10

// data uploaded every 10 seconds
class Tick {
    constructor(weather, temperature) {
        this.weather = weather;
        this.temperature = temperature;
    }
}

const today = new Date();
const shown_day_cards = [
    new Day(today, "SUNNY", 30),
    new Day(new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1), "SUNNY", 30),
    new Day(new Date(today.getFullYear(), today.getMonth(), today.getDate() + 2), "SUNNY", 30),
    new Day(new Date(today.getFullYear(), today.getMonth(), today.getDate() + 3), "SUNNY", 30),
    new Day(new Date(today.getFullYear(), today.getMonth(), today.getDate() + 4), "SUNNY", 30),
    new Day(new Date(today.getFullYear(), today.getMonth(), today.getDate() + 5), "SUNNY", 30),
    new Day(new Date(today.getFullYear(), today.getMonth(), today.getDate() + 6), "SUNNY", 30)
];

document.addEventListener("DOMContentLoaded", function () {
    $("#day_cards div").each(function(index) {
        $(this).html(shown_day_cards[index].card());
    });
});
