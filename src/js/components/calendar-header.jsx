import React, { Component } from "react";
import CalendarStore from "../store/calendar-store";
import { months } from "../utils/date-utils";
import { currentEventUpdate } from "../actions/calendar-actions";
import { CalendarHeaderIcons } from "./calendar-header-icons";

export default class CalendarHeader extends Component {

    constructor() {
        super();

        let { currentMonth,
            currentYear,
            currentEvent } = CalendarStore.getState().calendarData;

        this.state = {
            currentMonth : currentMonth,
            currentYear : currentYear,
            currentEvent : currentEvent,
            unsubscribe : CalendarStore.subscribe(this.onStoreUpdate.bind(this))
        };
    }

    static getSelectedEventListItem(evt) {
        let target = evt.target || evt.srcElement;
        let tag = target.tagName;

        while(tag !== "SPAN") {
            target = target.parentNode;
            tag = target.tagName;
        }

        return target;
    }

    onStoreUpdate() {
        let { currentMonth,
            currentYear,
            currentEvent } = CalendarStore.getState().calendarData;

        this.setState({
            currentMonth : currentMonth,
            currentYear : currentYear,
            currentEvent : currentEvent
        });
    }

    onIconClick(evt) {
        let target = CalendarHeader.getSelectedEventListItem(evt);
        CalendarStore.dispatch(currentEventUpdate(target));
    }

    render() {
        return(
            <header role="banner">
                <time>{ months()[this.state.currentMonth]}<em>{ this.state.currentYear }</em></time>
                <p className="title">Events</p>
                <CalendarHeaderIcons
                    currentEvent={ this.state.currentEvent }
                    onIconClick={ this.onIconClick.bind(this) }
                />
                <p className="subtitle">Choose an event</p>
            </header>
        );
    }

}