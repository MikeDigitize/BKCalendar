import { getCurrentDate as now } from "../utils/date-utils";

let initialState = {
    currentDate : now().date,
    currentMonth : now().month,
    currentYear : now().year,
    earliestDate : now().date,
    earliestMonth : now().month,
    earliestYear : now().year
};

export default function calendarData(state = initialState, action = {}) {
    switch(action.type) {
        case "INCREMENTCLICKCOUNT" :
            return Object.assign({}, state, {
                clickCount : ++state.clickCount
            });
        case "TOGGLEDISPLAY" :
            return Object.assign({}, state, {
                clickCount : ++state.clickCount
            });
        default :
            return state;
    }
}