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
    const url = new URL("https://random-data-api.com/api/v2/beers");
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

function writeText(resultText) {
    let main = document.querySelector("#test")
    main.innerHTML = resultText.map(({brand, id}) => {
        return '\
            <div class="'+id+'">                            \
                <h3>'+brand+'</h3>                          \
            </div>                                          \
        ';
    })
    .join('');
}
