module.exports = {
    format_date: (date) => {
        return date.toLocalDateString();
    },
    format_amount: (amount) => {
        return parseInt(amount).toLocaleString();
    },
};
