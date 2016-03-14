import { getCurrentDate as now } from "../utils/date-utils";

let initialState = {
    currentDate : now().date,
    currentMonth : now().month,
    currentYear : now().year,
    currentEvent : "football",
    earliestDate : now().date,
    earliestMonth : now().month,
    earliestYear : now().year,
    events : []
};

export default function calendarData(state = initialState, action = {}) {
    switch(action.type) {
        case "NEWYEARLYEVENTDATA" :
            console.log("new data");
            return Object.assign({}, state, {
                events : action.state
            });
        default :
            return state;
    }
}