import React, { Component } from 'react';
import './App.css';
import InputSection from "./components/InputSection"

var app = null;

class App extends Component {
	constructor(props) {
		super(props)

		this.cardTitle = "Card"
		this.cardImageURL = "https://cdn.marble.cards/images/cards/34/34802/34802-share.png?version=2"
		this.currentCardId = 0
		this.isLoading = false;

		app = this;
	}

	componentWillMount() {
	}

	loadCurrentCard() {
		console.log("loading..." + app.currentCardId)
		app.isLoading = true;
		app.setState({})
	}
	
	render() {
		return (
		    <div className="App">
		    	<InputSection app={app}/>

		        <div className="clipboard-div">
		        	<button onClick={this.loadCurrentCard}>Copy to Clipboard</button>
		        </div>
		        <br/>

		        <div className="card-div">
		        	<img src={this.cardImageURL}/>
	        	</div>
		    </div>
		  );
	}  
}

export default App;