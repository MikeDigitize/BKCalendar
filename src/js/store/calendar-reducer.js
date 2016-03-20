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
    switch(action.type) {
        case "NEWYEARLYEVENTDATA" :
            return Object.assign({}, state, {
                eventData : action.state
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
            let currentMonth = action.state === "prev" ? --state.currentMonth : ++state.currentMonth;
            let currentYear = currentMonth === -1 ? --state.currentYear : currentMonth === 12 ? ++state.currentYear : state.currentYear;
            currentMonth = currentMonth === -1 ? 11 : currentMonth === 12 ? 0 : currentMonth;
            let currentDay = currentMonth === state.earliestMonth && currentYear === state.earliestYear ? state.earliestDate : 0;
            return Object.assign({}, state, {
                currentMonth : currentMonth,
                currentYear : currentYear,
                currentDay : currentDay
            });
        default :
            return state;
    }
}