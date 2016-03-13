import React, { Component } from "react";
import CalendarStore from "../store/calendar-store";
import { getDate, getFullDate, getDaysInMonths, getDayIndex, getEvents } from "../utils/date-utils";

export default class Calendar extends Component {

    constructor() {
        super();
        this.state = {
            currentDate : CalendarStore.getState().calendarData.currentDate,
            currentMonth : CalendarStore.getState().calendarData.currentMonth,
            currentYear : CalendarStore.getState().calendarData.currentYear
        };
        getEvents(this.state.currentYear).then(data => console.log(data));
    }

    static createHeader() {
        let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"], i = 0, listItems = [];
        for(; i < days.length; i++) {
            listItems.push(<li key={ "day" + i }> { days[i] } </li>)
        }
        return listItems;
    }

    static getDateListItemClass(index, currentDate) {
        let noClass;
        if(index < currentDate - 1) {
            return "date-passed";
        }
        else {
            return noClass;
        }
    }

    static getDateListContent(index, firstDayOfMonthIndex) {
        return index < firstDayOfMonthIndex ? false : (index + 1) - firstDayOfMonthIndex;
    }

    createDates() {
        let { currentDate, currentMonth, currentYear } = this.state;
        let date = getFullDate(currentYear, currentMonth, currentDate);
        let daysInMonth = getDaysInMonths(currentYear, currentMonth);
        let currentDayIndex = getDayIndex(date);
        let firstDayOfMonthIndex = getDayIndex(getFullDate(currentYear, currentMonth, 1));
        let listItems = [];

        for(let i = 0; i < daysInMonth + firstDayOfMonthIndex; i++) {
            listItems.push(<li
                key={ "date" + i }
                className={ Calendar.getDateListItemClass(i, currentDate )}>
                    { Calendar.getDateListContent(i, firstDayOfMonthIndex) }
            </li>);
        }

        return listItems;
    }

    render() {
        this.createDates();
        return <ul> { this.createDates() } </ul>
    }

}