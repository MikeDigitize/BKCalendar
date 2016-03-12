import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import calendarData from "./calendar-reducer";

function Store(state = {}, action = {}) {
    return {
        calendarData : calendarData(state.calendarData, action)
    }
}

let CalendarStore = applyMiddleware(thunk)(createStore)(Store);
export default CalendarStore;