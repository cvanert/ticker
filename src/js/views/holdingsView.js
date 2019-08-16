import { elements } from './base';

// "Add Holding" button opens <dialog> modally
export const openAddHoldingWindow = (dialogID) => {
    if (typeof dialogID.showModal === "function") {
        dialogID.showModal();
    } else {
        alert('Browser does not support dialog API');
    }
};

// Add holding to UI
export const renderHolding = (holding) => {
    console.log(holding);
    const markup = `
        <tr class="individual_holding ${holding.id}" data-holdingid=${holding.id} data-holdingtype=${holding.type}>
            <td rowspan="2" class="center" id="stock_symbol">${holding.symbol}</td>
            <td class="holding_quantity center">${holding.quantity}</td>
            <td class="per_share_top"><div class="holding_per_share">$${(holding.cost/holding.quantity).toFixed(2)}</div><div class="per_share_text">/Share</div></td>
            <td rowspan="2" class="remove_button_cell center"><button class="remove_holding">✕</button></td>
        </tr>
        <tr class="individual_holding ${holding.id}" data-holdingid=${holding.id} data-holdingtype=${holding.type}>
            <td>&nbsp;</td>
            <td class="per_share_bottom">$${(holding.cost).toFixed(2)}</td>
        </tr>
    `;
    if (holding.type === "stock") {
        elements.holdingsStockBody.insertAdjacentHTML('beforeend', markup);
    } else {
        elements.holdingsCryptoBody.insertAdjacentHTML('beforeend', markup);
    }
};