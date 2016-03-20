import { getEvents } from "../utils/date-utils";

const NEWYEARLYEVENTDATA = "NEWYEARLYEVENTDATA";

export function yearlyEventData(year) {
    return dispatch => {
        getEvents(year)
            .then(data => dispatch({ state : data.status ? "file not found" : data, type : NEWYEARLYEVENTDATA }));
    }
}

const EVENTSELECTED = "EVENTSELECTED";

export function eventSelected(data) {
    return { state : data, type : EVENTSELECTED };
}

const EVENTCLOSED = "EVENTCLOSED";

export function eventClosed() {
    return { type: EVENTCLOSED }
}

const CURRENTEVENTUPDATE = "CURRENTEVENTUPDATE";

export function currentEventUpdate(data) {
    return { state : data, type : CURRENTEVENTUPDATE };
}

const CURRENTMONTHUPDATE = "CURRENTMONTHUPDATE";

export function currentMonthUpdate(data) {
    return dispatch => {
        if(data.action === "next" && data.month === 11) {
            dispatch(yearlyEventData(++data.year));
        }
        else if(data.action === "prev" && data.month === 0) {
            dispatch(yearlyEventData(--data.year));
        }
        dispatch({ state : data, type : CURRENTMONTHUPDATE });
    };
}