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
				<p>Card ID/URL:</p>
				<input onChange={this.updateInput} onKeyDown={this.handleKeyDown} placeholder="https://marble.cards/card/1"/>
				<img hidden={!app.isLoading} className="loading-spinner" src="loading.gif"/>
			</div>		    	
	  	);
	}  
}

export default InputSection;