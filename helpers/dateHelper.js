module.exports = {
    isDateString(str) {
        const dateRegExp = /^\d{4}(-\d{2}){2}$/;
        return dateRegExp.test(str);
    },
    isMonthString(str) {
        const dateRegExp = /^\d{4}-\d{2}$/;
        return dateRegExp.test(str);
    },
    getDateString(date) {
        const year = date.getFullYear();
        const month = date.getMonth();
        const displayMonth = (month + 1) < 10 ? '0' + (month + 1) : (month + 1);
        const day = date.getDate();
        const displayDay = day < 10 ? '0' + day : day;
        return `${year}-${displayMonth}-${displayDay}`;
    },
    getMonthBounds(month, inclusiveUpper = true) {
        const startDate = new Date(month);
        const endDate = new Date(month);
        endDate.setMonth(endDate.getMonth() + 1);

        if (inclusiveUpper) {
            endDate.setDate(endDate.getDate() - 1);
        }
        return { startDate, endDate };
    },
    getDayBounds(day, inclusiveUpper = true) {
        const startDate = new Date(day);
        const endDate = new Date(day);
        if (inclusiveUpper) {
            endDate.setHours(23, 59, 59);
        } else {
            endDate.setDate(endDate.getDate() + 1);
        }

        return { startDate, endDate };
    }
};
