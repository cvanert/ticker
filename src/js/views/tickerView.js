import { elements } from './base';

const changeSymbol = (change) => {
    let tickerChange;
    typeof change === 'string' ? tickerChange = change : tickerChange = change.toString()
    if (tickerChange[0] === '-') {
        return ['▼', 'decrease'];
    } else {
        return ['▲', 'increase'];
    }
};

export const clearTicker = () => {
    elements.tickerContainer.innerHTML = '';
};

const percent = (p) => {
    if (typeof p === 'string') {
        return parseFloat(p.slice(0, -1)).toFixed(3);
    } else {
        return p.toFixed(3);
    }
}

export const renderTickerItem = (tickerHolding) => {
    let markupBottom;
    const markupTop = `
            <div class="top_border stock_container stock_container_${changeSymbol(tickerHolding.change)[1]} ${tickerHolding.id} stock_container_${tickerHolding.type}">
                <div class="stock_top">
                    <div class="stock_top_left">
                        <div class="stock_symbol">${tickerHolding.symbol}</div>
                        <div class="company">${tickerHolding.name}</div>
                    </div>
                    <div class="stock_top_right">
                        <div class="stock_current_value">${(tickerHolding.price).toFixed(3)}</div>
                        <div class="change_container ${changeSymbol(tickerHolding.change)[1]}">
                            <div class="change_indicator">${changeSymbol(tickerHolding.change)[0]}</div>
                            <div class="dollar_change">${(tickerHolding.change).toFixed(3)}</div>
                            <div class="percent_change">${percent(tickerHolding.changePercent)}%</div>
                        </div>
                    </div>
                </div>
    `;
    if (tickerHolding.type === 'stock') {
        markupBottom = `
                    <div class="stock_bottom bottom_border">
                        <div class="stock_open_container">
                            <div class="open_value">${tickerHolding.open}</div>
                            <div class="open_label label"> OPEN </div>
                        </div>
                        <div class="stock_previous_close_container">
                            <div class="previous_close_value">${tickerHolding.close}</div>
                            <div class="previous_close_label label"> PREVIOUS CLOSE </div>
                        </div>
                        <div class="day_low_container">
                            <div class="day_low_value">${tickerHolding.low}</div>
                            <div class="day_low_label label"> DAY LOW </div>
                        </div>
                        <div class="day_high_container">
                            <div class="day_high_value">${tickerHolding.high}</div>
                            <div class="day_high_label label"> DAY HIGH </div>
                        </div>
                        <div class="volume_container">
                            <div class="volume_value">${tickerHolding.volume}</div>
                            <div class="volume_label label"> VOLUME </div>
                        </div>
                        <div class="market_cap_container">
                            <div class="market_cap_value">${tickerHolding.marketCap}</div>
                            <div class="day_high_label label"> MARKET CAP </div>
                        </div>
                        <div></div>
                    </div>
                </div>
        `;
    } else {
        markupBottom = `
                <div class="stock_bottom">
                    <div class="stock_open_container">
                        <div class="open_value">${(tickerHolding.open).toFixed(2)}</div>
                        <div class="open_label label"> OPEN </div>
                    </div>
                    <div class="stock_previous_close_container">
                        <div class="previous_close_value">${(tickerHolding.close).toFixed(2)}</div>
                        <div class="previous_close_label label"> PREVIOUS CLOSE </div>
                    </div>
                    <div class="day_low_container">
                        <div class="day_low_value">${(tickerHolding.low).toFixed(2)}</div>
                        <div class="day_low_label label"> DAY LOW </div>
                    </div>
                    <div class="day_high_container">
                        <div class="day_high_value">${(tickerHolding.high).toFixed(2)}</div>
                        <div class="day_high_label label"> DAY HIGH </div>
                    </div>
                    <div class="volume_container">
                        <div class="volume_value">${(tickerHolding.volume).toFixed(2)}</div>
                        <div class="volume_label label"> VOLUME </div>
                    </div>
                    <div class="market_cap_container">
                        <div class="market_cap_value">${(tickerHolding.marketCap).toFixed(2)}</div>
                        <div class="day_high_label label"> MARKET CAP </div>
                    </div>
                    <div></div>
                </div>
                <div class="crypto_bottom_1">
                    <div class="stock_open_container">
                        <div class="open_value">${(tickerHolding.open24).toFixed(2)}</div>
                        <div class="open_label label"> OPEN 24H </div>
                    </div>
                    <div class="stock_previous_close_container">
                        <div class="previous_close_value"></div>
                        <div class="previous_close_label label">  </div>
                    </div>
                    <div class="day_low_container">
                        <div class="day_low_value">${(tickerHolding.low24).toFixed(2)}</div>
                        <div class="day_low_label label"> LOW 24H </div>
                    </div>
                    <div class="day_high_container">
                        <div class="day_high_value">${(tickerHolding.high24).toFixed(2)}</div>
                        <div class="day_high_label label"> HIGH 24H </div>
                    </div>
                    <div class="volume_container">
                        <div class="volume_value">${(tickerHolding.volume24).toFixed(2)}</div>
                        <div class="volume_label label"> VOLUME 24 </div>
                    </div>
                    <div class="market_cap_container_col">
                        <div class="market_cap_value"></div>
                        <div class="day_high_label label">  </div>
                    </div>
                    <div></div>
                </div>
                <div class="crypto_bottom_2 bottom_border">
                    <div class="stock_open_container">
                        <div class="open_value">${(tickerHolding.openHour).toFixed(2)}</div>
                        <div class="open_label label"> OPEN HOUR </div>
                    </div>
                    <div class="stock_previous_close_container">
                        <div class="previous_close_value"></div>
                        <div class="previous_close_label label">  </div>
                    </div>
                    <div class="day_low_container">
                        <div class="day_low_value">${(tickerHolding.lowHour).toFixed(2)}</div>
                        <div class="day_low_label label"> LOW HOUR </div>
                    </div>
                    <div class="day_high_container">
                        <div class="day_high_value">${(tickerHolding.highHour).toFixed(2)}</div>
                        <div class="day_high_label label"> HIGH HOUR </div>
                    </div>
                    <div class="volume_container">
                        <div class="volume_value">${(tickerHolding.volumeHour).toFixed(2)}</div>
                        <div class="volume_label label"> VOLUME HOUR </div>
                    </div>
                    <div class="market_cap_container_col">
                        <div class="market_cap_value"></div>
                        <div class="day_high_label label">  </div>
                    </div>
                    <div></div>
                </div>
                </div>
        `;
    }
    elements.tickerContainer.insertAdjacentHTML('beforeend', markupTop + markupBottom);
};

export const addRefreshButton = (lastUpdated) => {
    console.log(lastUpdated);
    console.log(lastUpdated.toLocaleString());
    const buttonMarkup = `
        <div class="refresh_button_container">
            <div class="button_container">
                <button class="refresh_button">Refresh</button>
            </div>
            <div class="last_updated_container">
                <p class="last_updated_text">Last updated: ${lastUpdated}</p>
            </div>
        </div>
    `;
    elements.middleContainer.insertAdjacentHTML('beforeend', buttonMarkup);
};