# JavaScript File Structure

- **util.js**<br>
    Functions for dealing with dates.
- **main.js**<br>
    Declaration of currentData and currentDate.
- **serverData.js**<br>
    Get past data of days and hours.
- **apiData.js**<br>
    Store future data of days and hours.
- **history.js**<br>
    Get weather of past days and hours.
- **data.js**<br>
    Logic for choosing between server and API.
- **week.js**<br>
    Week tab ui.<br>
- **day.js**<br>
    Day tab ui.
- **ui.js**<br>
    General page ui.

Here is a graph of the file relations, excluding util.js.
``` mermaid
    flowchart
    main.js --> serverData.js
    main.js --> apiData.js
    main.js --> history.js
    serverData.js --> data.js
    apiData.js --> data.js
    history.js --> data.js
    week.js --> ui.js
    data.js --> ui.js
    day.js --> ui.js
```