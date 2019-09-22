import React, { Component } from 'react';
import './InputSection.css';

var app = null;

class InputSection extends Component {	
	constructor (props) {
		super(props)

		app = props.app
	}
	updateInput(event) {
		app.currentCardId = event.target.value
	}

	handleKeyDown (event) {
		if (event.key === "Enter") {
			app.loadCurrentCard()
		}
	}

	render() {
		return (
			<div className="input-section">
				<p>Card ID/URL:</p>
				<input onChange={this.updateInput} onKeyDown={this.handleKeyDown}/>
				<img hidden={!app.isLoading} className="loading-spinner" src="loading.gif"/>
			</div>		    	
	  	);
	}  
}

export default InputSection;