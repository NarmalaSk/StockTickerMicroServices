const { setIntervalAsync } = require('set-interval-async/dynamic');
const { fetchStockPriceFromPython } = require('./stockService');
const { sendEmail } = require('./emailService');

const startPeriodicEmails = (email, stockSymbol, interval) => {
    setIntervalAsync(async () => {
        const stockPrice = await fetchStockPriceFromPython(stockSymbol);
        if (stockPrice) {
            const message = `The current price of ${stockSymbol} is: ₹${stockPrice}`;
            await sendEmail(email, `Stock Price Update: ${stockSymbol}`, message);
        }
    }, interval * 60 * 1000); // Convert interval to milliseconds
};

module.exports = { startPeriodicEmails };
