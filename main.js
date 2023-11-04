var response, key, item, result, filteredArr;
var textCont = document.getElementById("test");

/*filteredArr = data.filter(function textResponse(item) {
    return item.brand === "Guinness";
});*/

document.addEventListener("DOMContentLoaded", () => {
    getData();
});

function getData(ev)
{
    const url = new URL("10.25.0.9:3000/medie");
    let params = new URLSearchParams();
    params.set('size', 10);
    params.set("response_type", "json");
    url.search = params;

    fetch(url)
        .then(response =>
        {
            if(!response.ok)
                throw new Error("Something wrong happened");
            return response.json();
        })
        .then(writeText)
        .catch(console.warn)
}

function writeText(resArr) {
    let main = document.querySelector("#test");
    main.innerHTML = '<h3>'+resArr[120000]["data_ora"]+'</h3>';
}
