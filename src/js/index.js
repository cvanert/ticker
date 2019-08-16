import * as holdingsView from './views/holdingsView';
import Holding from './models/Holdings';
import * as tickerView from './views/tickerView';
import { tickerStock, tickerCrypto } from './models/Ticker';
import * as balanceView from './views/balanceView';
import { calcPosition, totalBalance } from './models/Balance';
import * as titleView from './views/titleView';
import { updateTitle } from './models/Title';
import { elements } from './views/base';

/* GLOBAL STATE of App 
    - Holdings object
    - Ticker object
    - Balance object
*/
const state = {
    ticker: {
        stocks: [],
        cryptocurrencies: []
    },
    balance: {
        positions: {
            stocks: [],
            cryptocurrencies: []
        },
        totals: {
            stocks: [],
            cryptocurrencies: []
        }
    },
};



/* 
 * HOLDINGS CONTROLLER
 */
const getHoldingInput = async(e) => {
    if (!state.holdings) state.holdings = new Holding();
    const newHolding = state.holdings.addHolding(
        elements.holdingType.value,
        elements.holdingSymbol.value,
        parseFloat(elements.holdingQuantity.value),
        parseFloat(elements.holdingCost.value)
    );
    holdingsView.renderHolding(newHolding);
    controlTicker(newHolding);
}

const controlHoldings = () => {
    // 1. Open Add Holding <dialog> window
    holdingsView.openAddHoldingWindow(elements.holdingDialog);
    // 2. Get user input from view
    // Remove previous event listener
    elements.confirmButton.removeEventListener('click', getHoldingInput);
    // Add new event listener
    elements.confirmButton.addEventListener('click', getHoldingInput);
}

document.getElementById('add_holding_button').addEventListener('click', controlHoldings);

// Restore holdings on page load
window.addEventListener('load', () => {
    state.holdings = new Holding();

    // Restore holdings;
    state.holdings.readStorage();

    state.holdings.stocks.forEach(s => {
        // Render existing stock holdings in holdings menu
        holdingsView.renderHolding(s);

        // Add existing stock holdings to ticker
        controlTicker(s);
    });
    state.holdings.cryptocurrencies.forEach(c => {
        // Render existing stock holdings in holdings menu
        holdingsView.renderHolding(c)

        // Add existing stock holdings to ticker
        controlTicker(c);
    });
})



/* 
 * TICKER CONTROLLER
 */
const controlTicker = async(holding) => {
    // Pull stock/crypto data and add to state
    if (holding.type === 'stock') {
        const stock = await tickerStock(holding);
        state.ticker.stocks.push(stock);
        // Add stock to UI ticker
        tickerView.renderTickerItem(stock);
        refreshTicker();

        // Balance
        controlBalance(stock);
    } else {
        const crypto = await tickerCrypto(holding);
        state.ticker.cryptocurrencies.push(crypto);

        // Add crypto to UI ticker
        tickerView.renderTickerItem(crypto);
        refreshTicker();

        // Balance
        controlBalance(crypto);
    }
}

const refreshTicker = () => {
    // Update ticker button
    if (document.querySelectorAll('.stock_container').length > 0) {
        // Determine if button already exists
        if (!document.querySelector('.refresh_button_container')) {
            const lastRefreshed = new Date();
            tickerView.addRefreshButton(lastRefreshed);
            addRefreshListener();

        }
    } else {
        const buttonContainer = document.querySelector('.refresh_button_container');
        buttonContainer.parentElement.removeChild(buttonContainer);
    }
}

const addRefreshListener = () => {
    if (document.querySelector('.refresh_button')) {
        document.querySelector('.refresh_button').addEventListener('click', function() {
            console.log('clicker');
            location.reload();
        });
    }
}


// Cite APIs



/* 
 * BALANCE CONTROLLER
 */
const controlBalance = async(ticker) => {
    // Add each position to state
    const position = await calcPosition(ticker);
    if (position.type === 'stock') {
        state.balance.positions.stocks.push(position);
        state.balance.totals.stocks = await totalBalance(position.type, state.balance.positions.stocks);
        renderArg(position);
        console.log(state);
    } else {
        state.balance.positions.cryptocurrencies.push(position);
        state.balance.totals.cryptocurrencies = await totalBalance(position.type, state.balance.positions.cryptocurrencies);
        renderArg(position);
        console.log(state);
    }
}

const renderArg = async(position) => {
    const sTotalObj = await state.balance.totals.stocks;
    const cTotalObj = await state.balance.totals.cryptocurrencies;
    renderBalance(position, sTotalObj, cTotalObj);
}

const renderBalance = async(position, sTotalObj, cTotalObj) => {
    // Clear balance from UI
    balanceView.clearBalance();
    await balanceView.positionBalance(position);
    if (position.type === 'stock') {
        await balanceView.holdingTypeBalance(sTotalObj);
    } else {
        await balanceView.holdingTypeBalance(cTotalObj);
    }
    await balanceView.renderBalanceSummary(sTotalObj, cTotalObj);
    updateTitleChange();
}



/* 
 * REMOVE
 */

const removeHolding = async(type, id) => {
    // Remove from UI
    const removeList = document.querySelectorAll(`.${id}`);
    Array.from(removeList).forEach(item => {
        item.parentElement.removeChild(item);
    });

    // Remove from state
    const sHoldings = state.holdings.stocks;
    const cHoldings = state.holdings.cryptocurrencies;
    const sTicker = state.ticker.stocks;
    const cTicker = state.ticker.cryptocurrencies;
    const sBalance = state.balance.positions.stocks;
    const cBalance = state.balance.positions.cryptocurrencies;

    if (type === 'stock') {
        // Remove from holdings, ticker, balance
        sHoldings.splice(sHoldings.findIndex(obj => obj.id === id), 1);
        sTicker.splice(sTicker.findIndex(obj => obj.id === id), 1);
        sBalance.splice(sBalance.findIndex(obj => obj.id === id), 1);

        // Update balance
        state.balance.totals.stocks = await totalBalance(type, sBalance);
        updateBalance(type);

        // Update localStorage
        localStorage.setItem('stocks', JSON.stringify(state.holdings.stocks));

        // Determine if Refresh button still needed
        refreshTicker();
    } else {
        // Remove from holdings, ticker, balance
        cHoldings.splice(cHoldings.findIndex(obj => obj.id === id), 1);
        cTicker.splice(cTicker.findIndex(obj => obj.id === id), 1);
        cBalance.splice(cBalance.findIndex(obj => obj.id === id), 1);

        // Update balance
        state.balance.totals.cryptocurrencies = await totalBalance(type, cBalance);
        updateBalance(type);

        // Update localStorage
        localStorage.setItem('cryptocurrencies', JSON.stringify(state.holdings.cryptocurrencies));

        // Determine if Refresh button still needed
        refreshTicker();
    }
}

const updateBalance = async(type) => {
    const sTotalObj = await state.balance.totals.stocks;
    const cTotalObj = await state.balance.totals.cryptocurrencies;
    renderUpdatedBalance(type, sTotalObj, cTotalObj);
}

const renderUpdatedBalance = async(type, sTotalObj, cTotalObj) => {
    balanceView.clearBalance();
    if (type === 'stock') {
        await balanceView.holdingTypeBalance(sTotalObj);
    } else {
        await balanceView.holdingTypeBalance(cTotalObj);
    }
    await balanceView.renderBalanceSummary(sTotalObj, cTotalObj);
}

// Handle remove
const deleteCallback = e => {
    const id = document.querySelector('.individual_holding').dataset.holdingid;
    const type = document.querySelector('.individual_holding').dataset.holdingtype;
    if (e.target.matches('.remove_holding, .remove_holding *')) {
        removeHolding(type, id);
    }
}

document.querySelector('.positions').addEventListener('click', e => {
    deleteCallback(e);
});

document.querySelector('.wallet').addEventListener('click', e => {
    deleteCallback(e);
});



/* 
 * UPDATE TITLE
 */

const updateTitleChange = async() => {
    const percent = await updateTitle(state.balance.totals);
    console.log(percent);
    titleView.titleMarkup(percent);
}