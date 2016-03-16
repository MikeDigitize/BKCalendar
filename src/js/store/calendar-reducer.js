import { getCurrentDate as now } from "../utils/date-utils";

let initialState = {
    currentDate : now().date,
    currentMonth : now().month,
    currentYear : now().year,
    currentEvent : "football",
    earliestDate : now().date,
    earliestMonth : now().month,
    earliestYear : now().year,
    eventData : []
};

export default function calendarData(state = initialState, action = {}) {
    switch(action.type) {
        case "NEWYEARLYEVENTDATA" :
            return Object.assign({}, state, {
                eventData : action.state
            });
        default :
            return state;
    }
}