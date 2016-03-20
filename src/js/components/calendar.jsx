import React, { Component } from "react";
import CalendarHeader from "./calendar-header";
import CalendarBody from "./calendar-body";

export default class Calendar extends Component {
    render() {
        return (
            <div>
                <CalendarHeader />
                <CalendarBody />
            </div>
        );
    }
}