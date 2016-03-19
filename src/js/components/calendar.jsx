import React, { Component } from "react";
import CalendarStore from "../store/calendar-store";
import { getDate, getFullDate, getDaysInMonths, getDayIndex, getEvents, days, months } from "../utils/date-utils";
import { yearlyEventData, eventSelected, eventClosed } from "../actions/calendar-actions";
import { classNames, getElementPositionToContainer } from "../utils/dom-utils";
import { EventTip } from "./event-tip";

export default class Calendar extends Component {

    constructor() {
        super();

        let { currentDate,
            currentMonth,
            currentYear,
            eventData,
            currentEvent,
            selectedEventTime,
            selectedEventDesc,
            selectedEventVenue,
            selectedEventShortdate,
            eventInfoVisible } = CalendarStore.getState().calendarData;

        this.state = {
            currentDate : currentDate,
            currentMonth : currentMonth,
            currentYear : currentYear,
            events : eventData,
            currentEvent : currentEvent,
            selectedEventTime : selectedEventTime,
            selectedEventDesc : selectedEventDesc,
            selectedEventVenue : selectedEventVenue,
            selectedEventShortdate : selectedEventShortdate,
            eventInfoVisible : eventInfoVisible,
            unsubscribe : CalendarStore.subscribe(this.onStoreUpdate.bind(this))
        };

        getEvents(this.state.currentYear).then(data => CalendarStore.dispatch(yearlyEventData(data)));
    }

    componentWillUnmount() {
        this.state.unsubscribe();
    }

    static getSelectedEventListItem(evt) {
        let target = evt.target || evt.srcElement;
        let data = target.getAttribute("data-time");

        while(!data) {
            target = target.parentNode;
            data = target.getAttribute("data-time");
        }

        return target;
    }

    static getDateListItemClass(index, currentDate, firstDayOfMonthIndex) {
        return index < (currentDate - 1) + firstDayOfMonthIndex;
    }

    static getDateListContent(index, firstDayOfMonthIndex) {
        return index < firstDayOfMonthIndex ? false : (index + 1) - firstDayOfMonthIndex;
    }

    onStoreUpdate() {
        let { currentDate,
            currentMonth,
            currentYear,
            eventData,
            currentEvent,
            selectedEventTime,
            selectedEventDesc,
            selectedEventVenue,
            selectedEventShortdate,
            eventInfoVisible} = CalendarStore.getState().calendarData;

        this.setState({
            currentDate : currentDate,
            currentMonth : currentMonth,
            currentYear : currentYear,
            events : eventData[currentMonth].events[currentEvent],
            currentEvent : currentEvent,
            selectedEventTime : selectedEventTime,
            selectedEventDesc : selectedEventDesc,
            selectedEventShortdate : selectedEventShortdate,
            selectedEventVenue : selectedEventVenue,
            eventInfoVisible : eventInfoVisible,
        });
    }

    onDateClick(evt) {
        if(!this.state.eventInfoVisible){
            let target = Calendar.getSelectedEventListItem(evt);
            CalendarStore.dispatch(eventSelected(target));
        }
    }

    createHeader() {
        let daysOfWeek = days(), i = 0, listItems = [];

        for(; i < daysOfWeek.length; i++) {
            listItems.push(<li key={ "day" + i }> { daysOfWeek[i] } </li>)
        }

        return <ul className="weeks"> { listItems } </ul>;
    }

    createListItem(index, currentDate, firstDayOfMonthIndex) {
        let time, desc, iconClass, eventClass, eventHandler, venue, monthsOfYear = months();

        if(this.state.events.length) {
            let event = this.hasEvent(index);
            if(event.length && currentDate <= index - 1) {
                let details = event.pop();
                time = details.time;
                desc = details.desc;
                venue = details.venue;
                iconClass = "bullet-event";
                eventClass = "date-event";
                eventHandler = this.onDateClick.bind(this);
            }
        }

        let classes = classNames({
            "date-passed" : Calendar.getDateListItemClass(index, currentDate, firstDayOfMonthIndex),
            "date-event" : !!eventClass
        });

        return (<li
            key={ "date" + index }
            data-time={ time }
            data-desc={ desc }
            data-venue={ venue }
            data-date={ `${index - 1} ${monthsOfYear[this.state.currentMonth]} ${this.state.currentYear}` }
            className={ classes }
            onClick={ eventHandler }>
            <i className={ iconClass }></i> { Calendar.getDateListContent(index, firstDayOfMonthIndex) }
        </li>);
    }

    hasEvent(index) {
        return this.state.events.filter(event => index === parseInt(event.date) + 1);
    }

    bookEvent() {
        window.location = `http://google.co.uk?event=${this.state.selectedEventDesc}&month=${this.state.currentMonth}&year=${this.state.currentYear}`;
    }

    closeEventTip() {
        CalendarStore.dispatch(eventClosed());
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
        if(!this.state.events.length) {
            return false;
        }

        return (
            <div>
                { this.createHeader() }
                { this.createDates() }
                <EventTip
                    time={ this.state.selectedEventTime }
                    desc={ this.state.selectedEventDesc }
                    date={ this.state.selectedEventShortdate }
                    venue={ this.state.selectedEventVenue }
                    visible={ this.state.eventInfoVisible }
                    bookEvent={ this.bookEvent.bind(this) }
                    closeEventTip={ this.closeEventTip.bind(this) }
                />
            </div>
        );
    }

}