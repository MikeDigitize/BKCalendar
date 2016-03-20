import { getCurrentDate as now } from "../utils/date-utils";
import "../utils/array-find-polyfill";
import "../utils/array-from-polyfill";
import "../utils/object-assign-polyfill";

let initialState = {
    currentDate : now().date,
    currentMonth : now().month,
    currentYear : now().year,
    currentEvent : "football",
    earliestDate : now().date,
    earliestMonth : now().month,
    earliestYear : now().year,
    selectedEventTime : "",
    selectedEventDesc : "",
    selectedEventShortdate : "",
    selectedEventVenue : "",
    eventInfoVisible : false,
    eventData : []
};

export default function calendarData(state = initialState, action = {}) {
    let currentMonth, currentDate, currentYear, eventData;
    switch(action.type) {
        case "NEWYEARLYEVENTDATA" :
            eventData = action.state === "file not found" ? state.eventData : action.state;
            currentYear = state.currentYear;
            currentMonth = state.currentMonth;
            if(action.state !== "file not found") {
                currentYear = currentMonth === 0 ? ++state.currentYear : currentMonth === 11 ? --state.currentYear : state.currentYear;
            }
            else {
                currentMonth = currentMonth === 0 ? 11 : 0;
            }
            return Object.assign({}, state, {
                eventData : eventData,
                currentYear : currentYear,
                currentMonth : currentMonth
            });
        case "EVENTSELECTED" :
            return Object.assign({}, state, {
                selectedEventDesc : action.state.getAttribute("data-desc"),
                selectedEventTime : action.state.getAttribute("data-time"),
                selectedEventVenue : action.state.getAttribute("data-venue"),
                selectedEventShortdate : action.state.getAttribute("data-date"),
                eventInfoVisible : true
            });
        case "EVENTCLOSED" :
            return Object.assign({}, state, {
                selectedEventDesc : "",
                selectedEventTime : "",
                selectedEventShortdate : "",
                selectedEventVenue : "",
                eventInfoVisible : false
            });
        case "CURRENTEVENTUPDATE" :
            return Object.assign({}, state, {
                currentEvent : Array.from(action.state.classList)
                                    .filter(cls => ["football", "cricket", "rugby", "horse-racing"]
                                    .find(evt => evt === cls))
                                    .pop()
            });
        case "CURRENTMONTHUPDATE" :
            currentMonth = action.state.action === "prev" ? --state.currentMonth : ++state.currentMonth;
            currentMonth = currentMonth === -1 ? 11 : currentMonth === 12 ? 0 : currentMonth;
            currentDate = currentMonth === state.earliestMonth && state.currentYear === state.earliestYear ? state.earliestDate : 0;
            return Object.assign({}, state, {
                currentMonth : currentMonth,
                currentDate : currentDate
            });
        default :
            return state;
    }
}