import React, { Component } from 'react';
import './InputSection.css';

var app = null;
var inputField = null;

class InputSection extends Component {	
	constructor (props) {
		super(props)

		app = props.app
	}
	updateInput(event) {
		app.currentCardId = event.target.value;

		inputField = event.target;
	}

	handleKeyDown (event) {
		if (event.key === "Enter") {
			inputField.value = "";

			app.loadCurrentCard();
		}
	}

	render() {
		return (
			<div className="input-section">				
				<input onChange={this.updateInput} onKeyDown={this.handleKeyDown} placeholder="Card ID or URL"/>				
			</div>		    	
	  	);
	}  
}

export default InputSection;