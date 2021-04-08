import axios from 'axios';

const getCurrencyRates = async (baseCurrency: string, symbols: string) => {
    let url = `https://api.ratesapi.io/api/latest?base=${baseCurrency}`;

    if (symbols && symbols !== '*') {
        url = `${url}&symbols=${symbols}`;
    }
    const { data } = await axios.get(url);

    return data;
};

export { getCurrencyRates };
