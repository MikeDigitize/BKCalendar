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
        return <ul className="weeks"> { listItems } </ul>;
    }

    static getDateListItemClass(index, currentDate, firstDayOfMonthIndex) {
        let noClass;
        if(index < (currentDate - 1) + firstDayOfMonthIndex) {
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
        let daysInMonth = getDaysInMonths(currentYear, currentMonth);
        let firstDayOfMonthIndex = getDayIndex(getFullDate(currentYear, currentMonth, 1));
        let listItems = [];
        let lists = [];
        let totalDays = daysInMonth + firstDayOfMonthIndex;

        for(let i = 0; i < totalDays; i++) {
            listItems.push(<li
                key={ "date" + i }
                className={ Calendar.getDateListItemClass(i, currentDate, firstDayOfMonthIndex)}>
                    { Calendar.getDateListContent(i, firstDayOfMonthIndex) }
            </li>);
        }

        for (let i = 0, len = listItems.length; i < len; i += 7) {
            lists.push(<ul className="dates" key={ "dates" + i * 7 }> { listItems.slice(i, i + 7) } </ul>);
        }

        return lists;
    }

    render() {
        return (
            <div> { Calendar.createHeader() } { this.createDates() } </div>
        );
    }

}