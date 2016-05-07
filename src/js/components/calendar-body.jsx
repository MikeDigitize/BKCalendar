import React, { Component } from "react";
import CalendarStore from "../store/calendar-store";
import { getDate, getFullDate, getDaysInMonths, getDayIndex, getEvents, days, months } from "../utils/date-utils";
import { loadInitialEventData, eventSelected, eventClosed, displayEventList } from "../actions/calendar-actions";
import { classNames, getElementPositionToContainer } from "../utils/dom-utils";
import { EventTip } from "./event-tip";
import { Overlay } from "./calendar-overlay";

export default class CalendarBody extends Component {

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
            selectedEventExtraDetail,
            eventInfoVisible,
            eventListVisible,
            eventListData } = CalendarStore.getState().calendarData;

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
            selectedEventExtraDetail : selectedEventExtraDetail,
            eventInfoVisible : eventInfoVisible,
            eventListVisible : eventListVisible,
            eventListData : eventListData,
            unsubscribe : CalendarStore.subscribe(this.onStoreUpdate.bind(this))
        };

        CalendarStore.dispatch(loadInitialEventData(this.state.currentYear));
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
            selectedEventExtraDetail,
            eventInfoVisible,
            eventListVisible,
            eventListData } = CalendarStore.getState().calendarData;

        let events = eventData[currentMonth] ? eventData[currentMonth].events[currentEvent] : [];

        this.setState({
            currentDate : currentDate,
            currentMonth : currentMonth,
            currentYear : currentYear,
            events : events,
            currentEvent : currentEvent,
            selectedEventTime : selectedEventTime,
            selectedEventDesc : selectedEventDesc,
            selectedEventShortdate : selectedEventShortdate,
            selectedEventVenue : selectedEventVenue,
            selectedEventExtraDetail : selectedEventExtraDetail,
            eventInfoVisible : eventInfoVisible,
            eventListVisible : eventListVisible,
            eventListData : eventListData
        });
    }

    onDateClick(evt) {
        if(!this.state.eventInfoVisible){
            let target = CalendarBody.getSelectedEventListItem(evt);
            if(target.hasAttribute("data-multiple-events")) {
                CalendarStore.dispatch(displayEventList(target));
            }
            else {
                CalendarStore.dispatch(eventSelected(target));
            }

        }
    }

    createHeader() {
        let daysOfWeek = days(), i = 0, listItems = [];

        for(; i < daysOfWeek.length; i++) {
            listItems.push(<li key={ "day" + i }> { daysOfWeek[i] } </li>)
        }

        return <ul className="weeks"> { listItems } </ul>;
    }

    createListItem(index, currentDate, firstDayOfMonthIndex, eventIndex = 0) {
        let time, desc, multipleEvents, multipleEventDetails, iconClass, eventClass, eventHandler, extra, venue, monthsOfYear = months();
        let date = CalendarBody.getDateListContent(index, firstDayOfMonthIndex);

        if(this.state.events.length && index >= firstDayOfMonthIndex) {
            let event = this.hasEvent(date);
            if(event.length && currentDate <= date) {
                if(event.length > 1) {
                    multipleEvents = true;
                    multipleEventDetails = JSON.stringify(event);
                }
                let details = event.slice(eventIndex, ++eventIndex).pop();
                time = details.time;
                desc = details.desc;
                venue = details.venue;
                extra = details.extra;
                iconClass = "bullet-event";
                eventClass = "date-event";
                eventHandler = this.onDateClick.bind(this);
            }
        }

        let classes = classNames({
            "date-passed" : CalendarBody.getDateListItemClass(index, currentDate, firstDayOfMonthIndex),
            "date-event" : !!eventClass
        });

        return (<li
            key={ "date" + index }
            data-time={ time }
            data-multiple-events= { multipleEvents }
            data-multiple-event-details= { multipleEventDetails }
            data-desc={ desc }
            data-venue={ venue }
            data-extra-detail={ extra }
            data-date={ `${ date } ${monthsOfYear[this.state.currentMonth]} ${this.state.currentYear}` }
            className={ classes }
            onClick={ eventHandler }>
            <i className={ iconClass }></i> { date }
        </li>);
    }

    hasEvent(index) {
        return this.state.events.filter(event => index === parseInt(event.date));
    }

    bookEvent() {
        window.location = `http://google.co.uk?event=${this.state.selectedEventDesc}&month=${this.state.currentMonth}&year=${this.state.currentYear}`;
    }

    closeEventTip() {
        CalendarStore.dispatch(eventClosed());
    }

    getCalendarHeight() {
        let container = document.querySelector("#calendar-app"), height;
        height = container ? container.offsetHeight - 30 : 0;
        return { height : `${height}px` };
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
        console.log("render", this.state.eventListData, this.state.eventInfoVisible, this.state.eventListVisible);
        return (
            <section role="main" id="calendar-app">
                { this.createHeader() }
                { this.createDates() }
                <EventTip
                    time={ this.state.selectedEventTime }
                    desc={ this.state.selectedEventDesc }
                    date={ this.state.selectedEventShortdate }
                    extra={ this.state.selectedEventExtraDetail }
                    venue={ this.state.selectedEventVenue }
                    visible={ this.state.eventInfoVisible }
                    bookEvent={ this.bookEvent.bind(this) }
                    closeEventTip={ this.closeEventTip.bind(this) }
                />
                <Overlay
                    visible={ this.state.eventInfoVisible }
                    style={ this.getCalendarHeight() }
                    closeEventTip={ this.closeEventTip.bind(this) }
                />
            </section>
        );
    }

}