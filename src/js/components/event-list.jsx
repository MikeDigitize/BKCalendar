import React, { Component } from "react";
import { classNames } from "../utils/dom-utils";

export default class EventList extends Component {

	constructor(props) {
		super();
	}

	createEventButtons() {
		return this.props.eventListData.map((event, i) =>
			<button key={ `evt-list-${i}` } data-event-index={i} onClick={ this.logDetails.bind(this) }>{ event.desc }</button>
		);
	}

	logDetails() {
		console.log(evt.target.getAttribute("data-event-index"));
	}

	render() {
		return (
			<span className={ classNames({ "event-list" : true, "show-list" : this.props.visible }) }>
				<p>Available events on { this.props.date }</p>
				{ this.createEventButtons() }
				<p style={{ display : this.props.visible ? "block" : "none" }} className="close" onClick={ this.props.closeEventList }>Close</p>
			</span>
		);
	}

}