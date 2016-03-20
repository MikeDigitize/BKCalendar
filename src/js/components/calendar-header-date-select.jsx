import React, { Component } from "react";
import { months } from "../utils/date-utils";

export const CalendarHeaderDateSelect = props => <div>
    <span onClick={ props.onArrowClickPrev } className="month-nav-arrow left"><svg  x="0px" y="0px" width="30px" height="30px" viewBox="0 0 199.404 199.404" style={{ "enableBackground" : "new 0 0 199.404 199.404"}}><g><polygon points="135.412,0 35.709,99.702 135.412,199.404 163.695,171.119 92.277,99.702 163.695,28.285 " fill="#FFFFFF"/></g></svg></span>
    <time>{ months()[props.currentMonth]}<em>{ props.currentYear }</em></time>
    <span onClick={ props.onArrowClickNext } className="month-nav-arrow right"><svg x="0px" y="0px" width="30px" height="30px" viewBox="0 0 306 306" style={{ "enableBackground" : "new 0 0 306 306"}}><g><polygon points="94.35,0 58.65,35.7 175.95,153 58.65,270.3 94.35,306 247.35,153" fill="#FFFFFF"/></g></svg></span>
</div>;