let textCache = null;

class TextCache {
    constructor() {
        if (!textCache) {
            this.idCache = {};
            textCache = this;
        }
        return textCache;
    }
    saveTextById(text) {
        this.idCache = Object.assign({}, this.idCache, text);
    }
    getTextById(id) {
        return this.idCache[id];
    }
}

export default TextCache;
