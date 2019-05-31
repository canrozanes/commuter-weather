import React, { Component } from 'react';
import axios from 'axios';
import Header from './Header.js';
import DisplayWeather from './DisplayWeather.js';
import Footer from './Footer.js'


import './App.css';

class App extends Component {
	constructor() {
		super();
		this.state = {
			time1: new Date('2019','04','30'),
			time2: new Date('2019','04','30'),
			humidity1: 0,
			icon1: "",
			precipIntensity1: 0,
			precipProbability1: 0,
			summary1: "",
			temperature1: 0,
			humidity2: 0,
			icon2: "",
			precipIntensity2: 0,
			precipProbability2: 0,
			summary2: "",
			temperature2: 0,
		}
	}
	handleChange1 = (time) => {
		this.setState({ time1: time })
	}

	handleChange2 = (time) => {
		this.setState({ time2: time })
	}
	kickOff = (e) => {
		e.preventDefault();
		this.formatDate(this.state.time1, "firstWeather");
		this.formatDate(this.state.time2, "secondWeather");
	}

	formatDate = (dateObject, weatherName) => {
		let year = dateObject.getFullYear();
		let month = dateObject.getMonth() + 1;
		if (month < 10) {
			month = '0' + month;
		}
		let day = dateObject.getDate();
		if (day < 10) {
			day = '0' + day;
		}
		let hours = dateObject.getHours();
		if (hours < 10) {
			hours = '0' + hours;
		}
		let minutes = dateObject.getMinutes();
		if (minutes < 10) {
			minutes = '0' + minutes;
		}
		let dateString = `${year}-${month}-${day}T${hours}:${minutes}:00`;
		console.log(dateString);
		this.getWeatherData(dateString, weatherName);


	}
	getWeatherData = (date, weatherName) => {
		axios({
			url: `https://cors-anywhere.herokuapp.com/https://api.darksky.net/forecast/c369d6cf3852faec4a3db6128422f86a/43.6532,-79.3832,${date}?units=si`,

		}).then((response) => {
			console.log(response);
			this.setState({
				[weatherName]: response.data.currently,
			})
			this.assignStates()
		})
	}
	// we do the filtering of the data and set state to contain a 
	// {weateherIcon1: }
	assignStates = () => {
		this.setState({
			humidity1: 			this.state.firstWeather.humidity,
			icon1:  			this.state.firstWeather.icon,
			precipIntensity1: 	this.state.firstWeather.precipIntensity,
			precipProbability1: this.state.firstWeather.precipProbability,
			summary1: 			this.state.firstWeather.summary,
			temperature1: 		this.state.firstWeather.temperature,
			humidity2: 			this.state.secondWeather.humidity,
			icon2:  			this.state.secondWeather.icon,
			precipIntensity2: 	this.state.secondWeather.precipIntensity,
			precipProbability2: this.state.secondWeather.precipProbability,
			summary2: 			this.state.secondWeather.summary,
			temperature2: 		this.state.secondWeather.temperature,
		})
	}

	render() {
		return (
			<div className="App" >
				<Header 
					time1={this.state.time1}
					time2={this.state.time2}
					handleChange1={this.handleChange1}
					handleChange2={this.handleChange2}
					kickOff={this.kickOff} 
				/>
				{this.state.icon1 && 
					<DisplayWeather
						humidity={this.state.humidity1}
						icon={this.state.icon1}
						precipIntensity={this.state.precipIntensity1}
						precipProbability={this.state.precipProbability1}
						summary={this.state.summary1}
						temperature={this.state.temperature1}
					/>
				}
				{this.state.icon2 && 
					<DisplayWeather
						humidity={this.state.humidity2}
						icon={this.state.icon2}
						precipIntensity={this.state.precipIntensity2}
						precipProbability={this.state.precipProbability2}
						summary={this.state.summary2}
						temperature={this.state.temperature2}
					/>
				}
				<button onClick={()=>{window.location.reload()}}>Refresh</button>
				<Footer />
			</div>
		);
	}

}

export default App;
