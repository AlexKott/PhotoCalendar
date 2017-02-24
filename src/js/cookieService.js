function readCookie(name) {
    const cookie = document.cookie;
    const startIndex = cookie.indexOf(`${name}=`);
    if (startIndex === -1) {
        return null;
    }

    let endIndex = cookie.indexOf(';', startIndex);
    endIndex = endIndex === -1 ? cookie.length : endIndex;

    const cookieArray = cookie.substring(startIndex, endIndex).split('=');
    return cookieArray[1];
}

function writeCookie(key, value) {
    document.cookie = `${encodeURIComponent(key)}=${encodeURIComponent(value)}`;
}

export { readCookie, writeCookie };
