import React, { Component } from "react";
import CalendarStore from "../store/calendar-store";
import { getDate, getFullDate, getDaysInMonths, getDayIndex } from "../utils/date-utils";

export default class Calendar extends Component {
    constructor() {
        super();
        this.state = {
            currentDate : CalendarStore.getState().calendarData.currentDate,
            currentMonth : CalendarStore.getState().calendarData.currentMonth,
            currentYear : CalendarStore.getState().calendarData.currentYear
        }
    }
    static createHeader() {
        let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"], i = 0, listItems = [];
        for(; i < days.length; i++) {
            listItems.push(<li key={ "day" + i }> { days[i] } </li>)
        }
        return listItems;
    }
    createDates() {
        let { currentDate, currentMonth, currentYear } = this.state;
        let date = getFullDate(currentYear, currentMonth, currentDate), i = 0;
        console.log(getDate(date), date, getDaysInMonths(currentYear, currentMonth), getDayIndex(date));
        for(; i < 0; i++) {

        }
    }
    render() {
        this.createDates();
        return <ul> { Calendar.createHeader() } </ul>
    }
}