import React from "react";
import { classNames } from "../utils/dom-utils";

export const EventTip = props =>
    <span className={ classNames({ "event-tip" : true, "show" : props.visible }) }>
        <p className="event-date">{ props.date }</p>
        <p className="event-desc">{ props.desc }</p>
        <p className="event-venue">{ props.venue }</p>
        <p className="event-time">{ props.time }</p>
        <button onClick={ props.bookEvent }>Make a booking enquiry</button>
        <p className="close" onClick={ props.closeEventTip }>Close</p>
    </span>;