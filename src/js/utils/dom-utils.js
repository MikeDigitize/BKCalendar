export function classNames () {
    var hasOwn = {}.hasOwnProperty;
    var classes = [];

    for (var i = 0; i < arguments.length; i++) {
        var arg = arguments[i];
        if (!arg) continue;

        var argType = typeof arg;

        if (argType === 'string' || argType === 'number') {
            classes.push(arg);
        } else if (Array.isArray(arg)) {
            classes.push(classNames.apply(null, arg));
        } else if (argType === 'object') {
            for (var key in arg) {
                if (hasOwn.call(arg, key) && arg[key]) {
                    classes.push(key);
                }
            }
        }
    }

    return classes.join(' ');
}

export function getElementPositionToContainer(container, element) {

    let con = getElement(container);
    let el = getElement(element);

    let conX = getPositionToWindow(con).left;
    let conY = getPositionToWindow(con).top;

    let elX = getPositionToWindow(el).left;
    let elY = getPositionToWindow(el).top;

    let x = elX - conX;
    let y = elY - conY;

    return { x, y}

}

export function getElement(element) {
    return element instanceof HTMLElement ? element : document.querySelector(element);
}

export function getPositionToWindow(element) {

    let pos = element.getBoundingClientRect();
    let winPos = getWindowPosition();
    let top = pos.bottom + winPos.winY;
    let left = pos.left + winPos.winX;

    return { top, left };

}

export function getWindowPosition() {

    let winX = window.scrollX || window.pageXOffset;
    let winY = window.scrollY || window.pageYOffset;

    return { winX, winY };

}

export function getEventDataFromElement(target) {
    let data = target.dataset || target;
    return {
        selectedEventDesc : data.desc,
        selectedEventTime : data.time,
        selectedEventVenue : data.venue,
        selectedEventExtraDetail : data.extraDetail,
        selectedEventShortdate : data.date,
    };
}