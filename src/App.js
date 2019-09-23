import './App.css';
import React, { Component } from 'react';
import InputSection from "./components/InputSection"

const BLANK_CARD_OUTLINE_URL = "marble-card-outline.jpg"

var app = null;
var cardData = {
	image : BLANK_CARD_OUTLINE_URL
};

class App extends Component {
	constructor(props) {
		super(props)

		this.currentCardId = 0
		this.isLoading = false;
		this.showClipboardButton = false;

		app = this;
	}

	copyCardDataToClipboard() {
		if (cardData.nft_id === undefined) {
			console.log("No card data found.")
			return;
		}

		var tokens = []
		tokens.push("https://marble.cards/card/" + cardData.nft_id)
		tokens.push(cardData.domain_collection.collection_number)
		tokens.push(cardData.level);
		tokens.push(cardData.domain_collection.is_gold_card ? "Gold" : "")
		tokens.push(cardData.grade == "ORIGIN" ? "Origin" : "")
		tokens.push("\"" + cardData.card_title_multiline + "\"")
		tokens.push(cardData.domain_collection.domain_name)
    	app.copyToClipboard(tokens)		
	}

	copyToClipboard(tokens) {
		var text = tokens.join('\t')

	    var textArea = document.createElement('textarea')

	    textArea.innerHTML = text

	    var parentElement = document.getElementById('root');		

	    parentElement.appendChild(textArea)

    	textArea.select()

	    document.execCommand('copy')

	    parentElement.removeChild(textArea)

    	console.log("'" + text + "' copied to clipboard")
	}

	loadCurrentCard() {		
		// check if we're already loading a request
		if (app.isLoading) {
			console.log("app already loading, wait til previous request returns!")
			return
		}
		
		var cardId = app.currentCardId.trim()

		// parse out any full links if detected
		if (cardId.length > 0) {
			var prefix = "https://marble.cards/card/"

			if (cardId.startsWith(prefix)) {
				cardId = cardId.substring(prefix.length);
			} else {
				prefix = "http://marble.cards/card/"

				if (cardId.startsWith(prefix)) {
					cardId = cardId.substring(prefix.length);
				}
			}
		}

		// parse the id to an int
		var cardIdInt = parseInt(cardId)

		if (Number.isNaN(cardIdInt)) {
			alert(cardId + " is an invalid card id or url. Please provide a number or url like https://marble.cards/card/1.")
			return
		}

		console.log("loading..." + cardIdInt)
		
		cardData.image = BLANK_CARD_OUTLINE_URL
		app.isLoading = true;
		app.showClipboardButton = false;
		app.setState({})

		// create a new XMLHttpRequest
    	var xhr = new XMLHttpRequest()

    	// get a callback when the server responds
	    xhr.addEventListener('load', () => {	    	
	    	console.log(xhr.responseText)
	    	if (xhr.responseText === "null") {
				alert("No card found for " + cardId)
	    	} else {
	    		cardData = JSON.parse(xhr.responseText)
	    	}

	      	app.isLoading = false;
	      	app.showClipboardButton = true;
			app.setState({})
	    })

	    xhr.open('POST', 'https://ws.marble.cards/task/card_index/get_card_detail_task')
	    // send the request
	    xhr.send(JSON.stringify({ 
	    	nft_id: cardIdInt
	    }))
	}
	
	render() {
		return (
		    <div className="App">		    	
		    	<br/>
		    	<p>This page is for collecting card stats used by&nbsp;<b>@Wayfinder</b>'s spreadsheet&nbsp;<a target="_blank" href="https://docs.google.com/spreadsheets/d/1Z7G84XtfYHZxHjdIfM4a5jI7XzSGQH14vHMTGBkMEQY/">here</a>.
		    	<p>Rules for MarbleCards 1vs1 are <a href="https://medium.com/marblecards/rules-for-marblecards-1vs1-card-game-14920bc208d5" target="_blank">here.</a></p>
	        	</p>
		    	<InputSection app={app}/>
		    	<br/>		        
		        <div className="card-div">
		        	<img class="card-image" src={cardData.image}/>
		        	<img hidden={!app.isLoading} className="card-loading" src="loading.gif"/>
	        	</div>
	        	<br/>
	        	<div className="clipboard-div">
		        	<button hidden={!app.showClipboardButton} onClick={this.copyCardDataToClipboard}>Copy details to Clipboard</button>
		        </div>
		        <br/>
		    </div>
		  );
	}  
}

export default App;