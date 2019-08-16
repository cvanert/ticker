const holdingChange = (quantity, currentPrice, cost) => {
    const currentCostBasis = +((quantity * currentPrice).toFixed(2));
    return [currentCostBasis, currentCostBasis - cost];
}

export const findObjIndex = (symbol, arr) => arr.findIndex(obj => obj.symbol === symbol);

export const sum = (arr) => {
    return arr.reduce((acc, cur) => acc + cur);
}

export const calcPosition = (ticker) => {
    const valueChange = holdingChange(ticker.quantity, ticker.price, ticker.cost);
    return {
        id: ticker.id,
        type: ticker.type,
        symbol: ticker.symbol,
        quantity: ticker.quantity,
        cost: ticker.cost,
        currentValue: valueChange[0],
        change: valueChange[1],
    }
}

export const totalBalance = async(type, arr) => {
    return {
        type: type === 'stock' ? 'stocks' : 'crypto',
        cost: arr.length > 0 ? await sum(arr.map(holding => holding.cost)) : 0,
        value: arr.length > 0 ? await sum(arr.map(holding => holding.currentValue)) : 0,
        change: arr.length > 0 ? await sum(arr.map(holding => holding.change)) : 0,
    }
}