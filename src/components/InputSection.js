import React, { Component } from 'react';
import './InputSection.css';

var app = null;

class InputSection extends Component {	
	constructor (props) {
		super(props)

		app = props.app
	}
	updateInput(event) {
		// this.setState({username : event.target.value})
		app.currentCardId = event.target.value

		// TODO parse out the id if we used a marble url
	}

	handleKeyDown (event) {
		if (event.key === "Enter") {
			app.loadCurrentCard()
		}
	}

	render() {
		return (
			<div className="input-section">
				<p>Card ID:</p>
				<input onChange={this.updateInput} onKeyDown={this.handleKeyDown}/>
				<img hidden={!app.isLoading} className="loading-spinner" src="loading.gif"/>
			</div>		    	
	  	);
	}  
}

export default InputSection;