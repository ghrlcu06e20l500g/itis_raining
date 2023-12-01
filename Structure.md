# JavaScript File Structure

``` mermaid
flowchart TD
    data.js --> week.js
    data.js --> day.js
    day.js --> ui.js
    week.js --> ui.js
    utils.js --> ui.js
    utils.js --> week.js
    ui.js --> secondThread.js
    secondThread.js --> day.js
    secondThread.js --> week.js
```