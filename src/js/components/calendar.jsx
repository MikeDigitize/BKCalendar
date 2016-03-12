import React, { Component } from "react";
import CalendarStore from "../store/calendar-store";

export default class Calendar extends Component {
    constructor() {
        super();
    }
    static createHeader() {
        let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"], i = 0, listItems = [];
        for(; i < days.length; i++) {
            listItems.push(<li key={ "day" + i }> { days[i] } </li>)
        }
        return listItems;
    }
    createDates() {

    }
    render() {
        return <ul> { Calendar.createHeader() } </ul>
    }
}