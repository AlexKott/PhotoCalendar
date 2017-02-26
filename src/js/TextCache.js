let textCache = null;

class TextCache {
    constructor() {
        if (!textCache) {
            this.monthCache = {};
            this.eventCache = {};
            textCache = this;
        }
        return textCache;
    }
    saveTextsByMonth(month, texts) {
        this.monthCache = Object.assign({}, this.monthCache, { [month]: texts });
    }
    getTextsByMonth(month) {
        return this.monthCache[month];
    }
    getTextByDay(day) {
        const month = day.substring(0, 7);
        return this.monthCache[month].find(m => m.date === day);
    }
    saveTextById(text) {
        this.eventCache = Object.assign({}, this.eventCache, text);
    }
    getTextById(id) {
        return this.eventCache[id];
    }
    doesMonthExist(month) {
        return {}.hasOwnProperty.call(this.monthCache, month);
    }
}

export default TextCache;
