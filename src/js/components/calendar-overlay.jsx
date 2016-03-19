import React from "react";
import { classNames } from "../utils/dom-utils";

export const Overlay = props =>
    <div onClick={ props.closeEventTip } style={ props.style } className={ classNames({ "overlay" : true, "show-overlay" : props.visible }) }></div>;
