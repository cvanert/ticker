import uniqid from 'uniqid';

export default class Holding {
    constructor() {
        this.stocks = [];
        this.cryptocurrencies = [];
    }
    addHolding(type, symbol, quantity, cost) {
        const holding = {
            id: uniqid(),
            type,
            symbol,
            quantity,
            cost,
        };
        if (holding.type === "stock") {
            this.stocks.push(holding);
            this.persistData();
            return holding;
        } else {
            this.cryptocurrencies.push(holding);
            this.persistData();
            return holding;
        }
    }
    persistData() {
        localStorage.setItem('stocks', JSON.stringify(this.stocks));
        localStorage.setItem('cryptocurrencies', JSON.stringify(this.cryptocurrencies));
    }
    readStorage() {
        const sStorage = JSON.parse(localStorage.getItem('stocks'));
        const cStorage = JSON.parse(localStorage.getItem('cryptocurrencies'));
        if (sStorage) this.stocks = sStorage;
        if (cStorage) this.cryptocurrencies = cStorage;
    }
}

// NEED:
// Way to deal with duplicates
// Way to delete