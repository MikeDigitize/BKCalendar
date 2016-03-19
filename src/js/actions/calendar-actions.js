const NEWYEARLYEVENTDATA = "NEWYEARLYEVENTDATA";

export function yearlyEventData(data) {
    return { state : data, type : NEWYEARLYEVENTDATA };
}

const EVENTSELECTED = "EVENTSELECTED";

export function eventSelected(data) {
    return { state : data, type : EVENTSELECTED };
}

const EVENTCLOSED = "EVENTCLOSED";

export function eventClosed() {
    return { type: EVENTCLOSED }
}
