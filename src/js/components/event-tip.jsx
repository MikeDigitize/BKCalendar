import React from "react";

export const EventTip = props =>
    <span style={ props.position } className="event-tip">
        <p className="event-time">{ props.time }</p>
        <p className="event-desc">{ props.desc }</p>
        <p>Hi kids!!!!</p>
    </span>;