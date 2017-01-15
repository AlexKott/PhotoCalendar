module.exports = {
    getDateString(date) {
        const year = date.getFullYear();
        const month = date.getMonth();
        const displayMonth = (month + 1) < 10 ? '0' + (month + 1) : (month + 1);
        const day = date.getDate();
        const displayDay = day < 10 ? '0' + day : day;
        return `${year}-${displayMonth}-${displayDay}`;
    }
};
