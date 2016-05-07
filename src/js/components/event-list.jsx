import React, { Component } from "react";
import { classNames } from "../utils/dom-utils";

export default class EventList extends Component {

	constructor(props) {
		super();
	}

	createEventButtons() {
		return this.props.eventListData.map((event, i) =>
			<a
				className="event-list-item"
				key={ `evt-list-${i}` }
				data-event-index={i}
				onClick={ this.logDetails.bind(this) }>
					{ event.desc }
			</a>
		);
	}

	logDetails(evt) {
		this.props.closeEventList();
	}

	render() {
		return (
			<span className={ classNames({ "event-list" : true, "show-list" : this.props.visible }) }>
				<p className="event-list-title">Available events on <span className="event-list-date">{ this.props.date }</span></p>
				{ this.createEventButtons() }
				<p style={{ display : this.props.visible ? "block" : "none" }} className="close" onClick={ this.props.closeEventList }>Close</p>
			</span>
		);
	}

}