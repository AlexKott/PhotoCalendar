import scrollTo from 'scroll-to';

export function scrollToElement(elementId, offsetElementId) {
    const maxScrollPosition = getMaxScrollPosition();
    const targetElement = document.querySelector(elementId);
    const elementPosition = targetElement.getBoundingClientRect().top;

    const offsetElement = document.querySelector(offsetElementId);
    const offset = offsetElement.offsetHeight + 8; // @normalGap

    const scrollPosition = Math.min(elementPosition - offset + window.pageYOffset, maxScrollPosition);

    scrollTo(0, scrollPosition, { duration: 1000 });
}

function getMaxScrollPosition() {
    const body = document.body;
    const html = document.documentElement;
    const clientHeight = html.clientHeight;
    const documentHeight = Math.max(
        body.scrollHeight,
        body.offsetHeight,
        html.clientHeight,
        html.scrollHeight,
        html.offsetHeight
    );
    return documentHeight - clientHeight;
}
