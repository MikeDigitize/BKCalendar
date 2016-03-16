import React, { Component } from "react";
import CalendarStore from "../store/calendar-store";
import { getDate, getFullDate, getDaysInMonths, getDayIndex, getEvents } from "../utils/date-utils";
import { yearlyEventData } from "../actions/calendar-actions";
import { classNames } from "../utils/dom-utils";

export default class Calendar extends Component {

    constructor() {
        super();
        this.state = {
            currentDate : CalendarStore.getState().calendarData.currentDate,
            currentMonth : CalendarStore.getState().calendarData.currentMonth,
            currentYear : CalendarStore.getState().calendarData.currentYear,
            currentEvent : CalendarStore.getState().calendarData.currentEvent,
            unsubscribe : CalendarStore.subscribe(this.onStoreUpdate.bind(this)),
            events : []
        };
        getEvents(this.state.currentYear).then(data => CalendarStore.dispatch(yearlyEventData(data)));
    }

    componentWillUnmount() {
        this.state.unsubscribe();
    }

    onStoreUpdate() {
        let { currentDate, currentMonth, currentYear, eventData, currentEvent } = CalendarStore.getState().calendarData;
        this.setState({
            currentDate : currentDate,
            currentMonth : currentMonth,
            currentYear : currentYear,
            currentEvent : currentEvent,
            events : eventData[currentMonth].events[currentEvent]
        });
    }

    static createHeader() {
        let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"], i = 0, listItems = [];
        for(; i < days.length; i++) {
            listItems.push(<li key={ "day" + i }> { days[i] } </li>)
        }
        return <ul className="weeks"> { listItems } </ul>;
    }

    static getDateListItemClass(index, currentDate, firstDayOfMonthIndex) {
        return index < (currentDate - 1) + firstDayOfMonthIndex;
    }

    static getDateListContent(index, firstDayOfMonthIndex) {
        return index < firstDayOfMonthIndex ? false : (index + 1) - firstDayOfMonthIndex;
    }

    createListItem(index, currentDate, firstDayOfMonthIndex) {
        let time, name, iconClass, eventClass;
        if(this.state.events.length) {
            let event = this.hasEvent(index);
            if(event.length && currentDate <= index - 1) {
                let details = event.pop();
                time = details.time;
                name = details.event;
                iconClass = "bullet-event";
                eventClass = "date-event";
            }
        }
        let classes = classNames({
            "date-passed" : Calendar.getDateListItemClass(index, currentDate, firstDayOfMonthIndex),
            "date-event" : !!eventClass
        });

        return (<li
            key={ "date" + index }
            data-time={ time }
            data-event={ name }
            className={ classes }>
            <i className={ iconClass }></i> { Calendar.getDateListContent(index, firstDayOfMonthIndex) }
        </li>);
    }

    hasEvent(index) {
        return this.state.events.filter(event => index === parseInt(event.date) + 1);
    }

    createDates() {
        let { currentDate, currentMonth, currentYear } = this.state;
        let daysInMonth = getDaysInMonths(currentYear, currentMonth);
        let firstDayOfMonthIndex = getDayIndex(getFullDate(currentYear, currentMonth, 1));
        let listItems = [];
        let lists = [];
        let totalDays = daysInMonth + firstDayOfMonthIndex;

        for(let i = 0; i < totalDays; i++) {
            listItems.push(this.createListItem(i, currentDate, firstDayOfMonthIndex));
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