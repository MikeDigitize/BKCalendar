import "whatwg-fetch/fetch";

export function getFullDate(y, m, d = 1) {
    return new Date(y, m, d, 12, 0);
}

export function getDayOfWeek(date) {
    return ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"][getDayIndex(date)];
}
export function getDate(date) {
    return date.getDate();
}

export function getDayIndex(date) {
    return date.getUTCDay();
}

export function getMonth(date) {
    return date.getMonth();
}

export function getYear(date) {
    return date.getFullYear();
}

export function getDaysInMonths(y, m) {
    return /8|3|5|10/.test(m) ? 30 : m == 1 ? (!(y % 4) && y % 100) || !(y % 400) ? 29 : 28 : 31;
}

export function logDays(y, m) {
    let daysInMonth = getDaysInMonths(y, m) + 1;
    for(let i = 1; i < daysInMonth; i++) {
        console.log(getDayOfWeek(getFullDate(y, m, i)), i);
    }
}

export function getCurrentDate() {
    let currentDate = new Date();
    let month = getMonth(currentDate);
    let year = getYear(currentDate);
    let date = getDate(currentDate);
    return { date, month, year };
}

export function getEvents(year) {
    return fetch(`/js/events/event-config-${year}.json`)
        .then(response => {
            return response.json()
        });
}