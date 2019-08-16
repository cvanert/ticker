const calcChange = (arr) => {
    console.log(arr);
    return 100 * (arr[1] / arr[0]);
};

export const updateTitle = async(obj) => {
    const c = await obj.cryptocurrencies;
    const s = await obj.stocks;
    if (Object.keys(c).length > 0 && Object.keys(s).length > 0) {
        return calcChange([c.cost + s.cost, c.change + s.change]);
    } else if (Object.keys(c).length > 0 && Object.keys(s).length === 0) {
        return calcChange([c.cost, c.change]);
    } else {
        return calcChange([s.cost, s.change]);
    }
};