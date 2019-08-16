import axios from 'axios';
import { key, cryptoKey } from '../config';
import Holding from './Holdings';

export const tickerStock = async(stock) => {
    const result = await axios(`https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${stock.symbol}&apikey=${key}`);
    const resultName = await axios(`https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${stock.symbol}&apikey=${key}`);
    const stockObj = {
        id: stock.id,
        type: 'stock',
        symbol: stock.symbol,
        name: resultName.data.bestMatches[0]['2. name'],
        quantity: stock.quantity,
        cost: stock.cost,
        open: parseFloat(result.data['Global Quote']['02. open']),
        close: parseFloat(result.data['Global Quote']['08. previous close']),
        low: parseFloat(result.data['Global Quote']['04. low']),
        high: parseFloat(result.data['Global Quote']['03. high']),
        price: parseFloat(result.data['Global Quote']['05. price']),
        volume: parseFloat(result.data['Global Quote']['06. volume']),
        marketCap: '--',
        change: parseFloat(result.data['Global Quote']['09. change']),
        changePercent: result.data['Global Quote']['10. change percent'],
    };
    console.log(result);
    console.log(resultName);
    return stockObj;
}

export const tickerCrypto = async(crypto) => {
    const result = await axios(`https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${crypto.symbol}&tsyms=USD&api_key=${cryptoKey}`);
    const resultClose = await axios(`https://min-api.cryptocompare.com/data/histoday?fsym=${crypto.symbol}&tsym=USD&limit=1&aggregate=1&api_key=${cryptoKey}`);
    const resultName = await axios(`https://min-api.cryptocompare.com/data/coin/generalinfo?fsyms=${crypto.symbol}&tsym=USD&api_key=${cryptoKey}`);
    const cryptoData = result.data.RAW[`${crypto.symbol.toUpperCase()}`].USD;
    const cryptoDataClose = resultClose.data.Data[1].close;
    console.log(result);
    console.log(resultName);
    const cryptoObj = {
        id: crypto.id,
        type: 'crypto',
        symbol: crypto.symbol,
        name: resultName.data.Data[0].CoinInfo.FullName,
        quantity: crypto.quantity,
        cost: crypto.cost,
        open: cryptoData.OPENDAY,
        open24: cryptoData.OPEN24HOUR,
        openHour: cryptoData.OPENHOUR,
        close: cryptoDataClose,
        low: cryptoData.LOWDAY,
        low24: cryptoData.LOW24HOUR,
        lowHour: cryptoData.LOWHOUR,
        high: cryptoData.HIGHDAY,
        high24: cryptoData.HIGH24HOUR,
        highHour: cryptoData.HIGHHOUR,
        price: cryptoData.PRICE,
        volume: cryptoData.VOLUMEDAY,
        volume24: cryptoData.VOLUME24HOUR,
        volumeHour: cryptoData.VOLUMEHOUR,
        marketCap: cryptoData.MKTCAP,
        supply: cryptoData.SUPPLY,
        change: cryptoData.CHANGEDAY,
        change24: cryptoData.CHANGE24HOUR,
        changePercent: cryptoData.CHANGEPCTDAY,
        changePercent24: cryptoData.CHANGEPCT24HOUR
    }
    console.log(cryptoObj);
    return cryptoObj;
}