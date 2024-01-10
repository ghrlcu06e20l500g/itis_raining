function historyFetch(e)
{
    fetch("https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/Urbino,PU/2023-05-01/2023-05-15?unitGroup=metric&key=EVPUPWJLED7AAULMJBMDVB3GJ&include=days&forecastBasisDate=2023-01-01")
    .then((response) =>
    {
        orderData(response);
    })
    .catch(console.error);
}

function orderData(data)
{
    console.error(response);
}