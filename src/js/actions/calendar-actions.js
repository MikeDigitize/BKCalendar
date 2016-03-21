import { getEvents } from "../utils/date-utils";

const LOADNEWCALENDARDATA = "LOADNEWCALENDARDATA";

export function loadInitialEventData(year) {
    return dispatch => loadYearlyEventData(year).then(data => dispatch({ state : data, type : LOADNEWCALENDARDATA }));
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
            loadYearlyEventData(++data.year).then(response => {
                if(response.status !== 404) {
                    dispatch({ state : response, type : LOADNEWCALENDARDATA });
                    dispatch({ state : data, type : CURRENTMONTHUPDATE });
                }
            });
        }
        else if(data.action === "prev" && data.month === 0) {
            loadYearlyEventData(--data.year).then(response => {
                if(response.status !== 404) {
                    dispatch({ state : response, type : LOADNEWCALENDARDATA });
                    dispatch({ state : data, type : CURRENTMONTHUPDATE });
                }
            });
        }
        else {
            dispatch({ state : data, type : CURRENTMONTHUPDATE });
        }
    };
}

export function loadYearlyEventData(year) {
    return new Promise(function(res, rej) {
        return getEvents(year).then(data => res(data));
    });
}