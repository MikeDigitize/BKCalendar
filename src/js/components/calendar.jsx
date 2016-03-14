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

    static createList(listItems) {
        console.log("listitems: ", listItems.length,  Math.round(listItems.length / 7));
    }

    createDates() {
        let { currentDate, currentMonth, currentYear } = this.state;
        let date = getFullDate(currentYear, currentMonth, currentDate);
        let daysInMonth = getDaysInMonths(currentYear, currentMonth);
        let currentDayIndex = getDayIndex(date);
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
            lists.push(<ul className="dates"> { listItems.slice(i, i + 7) } </ul>);
        }

        //if(i > 0 && i % 7 === 0) {
        //    console.log(i);
        //    lists.push(<ul className="dates">{ listItems } </ul>);
        //    listItems = [];
        //}
        //else {
        //    console.log("not", i)
        //}
        //if(i === totalDays - 1 && totalDays % 7 !== 0) {
        //    lists.push(<ul className="dates">{ listItems } </ul>);
        //}

        return lists;
    }

    render() {
        return <div> { this.createDates() } </div>
    }

}