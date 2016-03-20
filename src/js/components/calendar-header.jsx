import React, { Component } from "react";
import CalendarStore from "../store/calendar-store";
import { months } from "../utils/date-utils";
import { currentEventUpdate, currentMonthUpdate } from "../actions/calendar-actions";
import { CalendarHeaderIcons, CalendarHeaderArrowsNext, CalendarHeaderArrowsPrev } from "./calendar-header-icons";
import { CalendarHeaderDateSelect } from "./calendar-header-date-select";

export default class CalendarHeader extends Component {

    constructor() {
        super();

        let { currentMonth,
            currentYear,
            currentEvent,
            earliestMonth,
            earliestYear } = CalendarStore.getState().calendarData;

        this.state = {
            currentMonth : currentMonth,
            currentYear : currentYear,
            currentEvent : currentEvent,
            earliestMonth : earliestMonth,
            earliestYear : earliestYear,
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

    static onIconClick(evt) {
        let target = CalendarHeader.getSelectedEventListItem(evt);
        CalendarStore.dispatch(currentEventUpdate(target));
    }
    
    onArrowClickPrev() {
        if(!(this.state.currentMonth === this.state.earliestMonth && this.state.currentYear === this.state.earliestYear)) {
            CalendarStore.dispatch(currentMonthUpdate("prev"));
        }
    }
    
    onArrowClickNext() {
        CalendarStore.dispatch(currentMonthUpdate("next"));
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

    render() {
        return(
            <header role="banner">
                <CalendarHeaderDateSelect
                    currentMonth={ this.state.currentMonth }
                    currentYear={ this.state.currentYear }
                    onArrowClickNext={ this.onArrowClickNext }
                    onArrowClickPrev={ this.onArrowClickPrev.bind(this) }
                />
                <p className="title">Sporting Event Calendar</p>
                <p className="selected-event">{ this.state.currentEvent }</p>
                <CalendarHeaderIcons
                    currentEvent={ this.state.currentEvent }
                    onIconClick={ CalendarHeader.onIconClick }
                />
                <p className="subtitle">Select a sport</p>
            </header>
        );
    }

}