import { elements } from './base';

const twoDecimals = (num) => {
    const int = num.toString.indexOf('.');
    return Number(Math.round(num + 'e2') + 'e-2');
};

export const clearBalance = () => {
    elements.balanceOuterTitle.innerHTML = '';
};

const colorChange = (change) => {
    if (change.toString()[0] === '-') {
        return ['▼', 'decrease'];
    } else {
        return ['▲', 'increase'];
    }
};

export const holdingTypeBalance = (obj) => {
    const markup = `
        <tr >
            <td>Total:</td>
            <td class="${colorChange(obj.change)[1]}">${(obj.change).toFixed(2)}</td>
            <td>$${(obj.value).toFixed(2)}</td>
        </tr>
    `;
    if (obj.type === 'stocks') {
        elements.stockSummary.innerHTML = '';
        elements.stockSummary.insertAdjacentHTML('beforeend', markup);
    } else {
        elements.cryptoSummary.innerHTML = '';
        elements.cryptoSummary.insertAdjacentHTML('beforeend', markup);
    }
};

export const positionBalance = (position) => {
    const markup = `
        <tr class="${position.id}">
            <td id="stock_symbol">${position.symbol}</td>
            <td class="${colorChange(position.change)[1]}">${(position.change).toFixed(2)}</td>
            <td>$${(position.currentValue).toFixed(2)}</td>
        </tr>
    `;
    if (position.type === 'stock') {
        elements.stockBalance.insertAdjacentHTML('beforeend', markup);
    } else {
        elements.cryptoBalance.insertAdjacentHTML('beforeend', markup);
    }
};

export const renderBalanceSummary = (sBalance, cBalance) => {
    let sChange = 0;
    let sValue = 0;
    let cChange = 0;
    let cValue = 0;

    if (Object.keys(sBalance).length > 0) {
        sChange = sBalance.change;
        sValue = sBalance.value;
    }
    if (Object.keys(cBalance).length > 0) {
        cChange = cBalance.change;
        cValue = cBalance.value;
    }

    elements.balanceOuterTitle.innerHTML = '';
    const totalValue = (sValue + cValue).toFixed(2);
    const totalChange = (sChange + cChange).toFixed(2);
    const changeText = totalChange[0] === '-' ? `-$${totalChange.slice(1)}` : `$${totalChange}`;
    const markup = `
        <div></div>
        <div class="balance_box">
            <h2 id="balance_title">BALANCE</h2>
            <div class="account_summary account_summary_${colorChange(totalChange)[1]}">
                <div class="total_balance_container">
                    <p></p>
                    <p class="balance_value" id="account_balance">$${totalValue}</p>
                    <p></p>
                </div>
                <div class="total_change_container">
                    <p></p>
                    <p class="balance_value" id="account_change">${colorChange(totalChange)[0]} ${changeText}</p>
                    <p></p>
                </div>
            </div>
        </div>
        <div></div>
    `;
    elements.balanceOuterTitle.insertAdjacentHTML('beforeend', markup);
}

export const deleteBalanceItem = id => {
    const item = document.querySelector(`[data-holdingid="${id}]`);
    item.parentElement.removeChild(item);
}