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
    selectedEventExtraDetail : "",
    eventInfoVisible : false,
    eventData : []
};

export default function calendarData(state = initialState, action = {}) {
    let currentMonth, currentDate, currentYear, eventData;
    switch(action.type) {
        case "LOADNEWCALENDARDATA" :
            return Object.assign({}, state, {
                eventData : action.state
            });
        case "EVENTSELECTED" :
            return Object.assign({}, state, {
                selectedEventDesc : action.state.getAttribute("data-desc"),
                selectedEventTime : action.state.getAttribute("data-time"),
                selectedEventVenue : action.state.getAttribute("data-venue"),
                selectedEventExtraDetail : action.state.getAttribute("data-extra-detail"),
                selectedEventShortdate : action.state.getAttribute("data-date"),
                eventInfoVisible : true
            });
        case "EVENTCLOSED" :
            return Object.assign({}, state, {
                selectedEventDesc : "",
                selectedEventTime : "",
                selectedEventShortdate : "",
                selectedEventVenue : "",
                selectedEventExtraDetail : "",
                eventInfoVisible : false
            });
        case "CURRENTEVENTUPDATE" :
            return Object.assign({}, state, {
                currentEvent : Array.from(action.state.classList)
                                    .filter(cls => ["football", "cricket", "rugby", "horse-racing", "music", "misc"]
                                    .find(evt => evt === cls))
                                    .pop()
            });
        case "CURRENTMONTHUPDATE" :
            currentMonth = action.state.action === "prev" ? --state.currentMonth : ++state.currentMonth;
            currentYear = currentMonth === -1 ? --state.currentYear : currentMonth === 12 ? ++state.currentYear : state.currentYear;
            currentMonth = currentMonth === -1 ? 11 : currentMonth === 12 ? 0 : currentMonth;
            currentDate = currentMonth === state.earliestMonth && state.currentYear === state.earliestYear ? state.earliestDate : 0;
            return Object.assign({}, state, {
                currentMonth : currentMonth,
                currentYear : currentYear,
                currentDate : currentDate
            });
        default :
            return state;
    }
}