import React, { Component } from 'react';
import './App.css';
import InputSection from "./components/InputSection"

var app = null;
var cardData = {
	image : ""	
};

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

	copyCardDataToClipboard() {
		console.log("copied")
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

		console.log("loading..." + cardIdInt)
		
		app.isLoading = true;
		cardData.image = ""		

		app.setState({})

		// create a new XMLHttpRequest
    	var xhr = new XMLHttpRequest()

    	// get a callback when the server responds
	    xhr.addEventListener('load', () => {	      	
	    	console.log(xhr.responseText)

	    	cardData = JSON.parse(xhr.responseText)

	      	app.isLoading = false;
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
		    	<InputSection app={app}/>

		        <div className="clipboard-div">
		        	<button onClick={this.copyCardDataToClipboard}>Copy to Clipboard</button>
		        </div>
		        <br/>

		        <div className="card-div">
		        	<img src={cardData.image}/>
	        	</div>
		    </div>
		  );
	}  
}

export default App;