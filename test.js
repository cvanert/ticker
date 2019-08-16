import axios from 'axios';

async function getResults(symbol) {
    const key = 'PQ9HYJR232SAV0TW';
    const res = await axios(`https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${symbol}&apikey=${key}`);
    console.log(res);
}
getResults('OGI');

/*
Console:
    {data: {…}, status: 200, statusText: "OK", headers: {…}, config: {…}, …}
        config: {url: "https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=OGI&apikey=PQ9HYJR232SAV0TW", headers: {…}, transformRequest: Array(1), transformResponse: Array(1), timeout: 0, …}
        data:
            Global Quote:
                01. symbol: "OGI"
                02. open: "7.0100"
                03. high: "7.0489"
                04. low: "6.7450"
                05. price: "6.7901"
                06. volume: "594944"
                07. latest trading day: "2019-06-13"
                08. previous close: "7.0100"
                09. change: "-0.2199"
                10. change percent: "-3.1369%"
            __proto__: Object
        __proto__: Object
    headers: {content-type: "application/json"}
    request: XMLHttpRequest {onreadystatechange: ƒ, readyState: 4, timeout: 0, withCredentials: false, upload: XMLHttpRequestUpload, …}
    status: 200
    statusText: "OK"
    __proto__: Object
*/

async function getPrice(symbol) {
    const key = 'PQ9HYJR232SAV0TW';
    const res = await axios(`https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${symbol}&apikey=${key}`);
    const price = res.data['Global Quote'];
    console.log(price);
}
getPrice('OGI');

/*
Console:
    {01. symbol: "OGI", 02. open: "7.0100", 03. high: "7.0489", 04. low: "6.7450", 05. price: "6.8234", …}
        01. symbol: "OGI"
        02. open: "7.0100"
        03. high: "7.0489"
        04. low: "6.7450"
        05. price: "6.8234"
        06. volume: "619468"
        07. latest trading day: "2019-06-13"
        08. previous close: "7.0100"
        09. change: "-0.1866"
        10. change percent: "-2.6619%"
    __proto__: Object
*/

async function getPrice(symbol) {
    const key = 'PQ9HYJR232SAV0TW';
    try {
        const res = await axios(`https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${symbol}&apikey=${key}`);
        const price = res.data['Global Quote'];
        console.log(price);
    } catch (error) {
        console.log(error);
    }
}
getPrice('OGI');