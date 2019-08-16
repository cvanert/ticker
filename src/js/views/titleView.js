import { elements } from './base';

export const titleMarkup = (change) => {
    elements.bodyTop.innerHTML = '';
    const markup = `
        <div class="title_container title_${change > 0 ? 'increase' : 'decrease'}">
            <h1 class="title">PORTFOLIO</h1>
            <h1 class="title_change">${change.toFixed(3)}%</h1>
        </div>
    `;
    elements.bodyTop.insertAdjacentHTML('beforeend', markup);
};