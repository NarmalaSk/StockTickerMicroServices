const axios = require('axios');

const fetchStockPriceFromPython = async (stockSymbol) => {
    try {
        const response = await axios.get(`http://localhost:5000/get-price?symbol=${stockSymbol}`);
        return response.data;  // Assume it returns stock price
    } catch (error) {
        console.error('Error fetching stock data from Python API:', error);
        return null;
    }
};

module.exports = { fetchStockPriceFromPython };
