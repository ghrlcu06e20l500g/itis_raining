# JavaScript File Structure

``` mermaid
flowchart TD
    weekUtil.js --> week.js
    week.js --> ui.js
    day.js --> ui.js
    serverData.js --> ui.js
    serverData.js --> day.js
    serverData.js --> week.js
    forcastData.js
```