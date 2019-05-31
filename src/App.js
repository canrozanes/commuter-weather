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
			time1: new Date(),
			time2: new Date(),
			parsedweatherData1: {},
			parsedweatherData2: {}
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
		this.formatDate(this.state.time1, "weatherData1");
		this.formatDate(this.state.time2, "weatherData2");
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
			// console.log(response);
			this.setState({
				[weatherName]: response.data.currently,
			})
			this.assignStates(weatherName)
		})
	}
	// we do the filtering of the data and set state to contain a 
	// {weateherIcon1: }
	assignStates = (weatherName) => {
		const objectName = `parsed` + weatherName;
		const newData = {
			humidity: 			this.state[weatherName].humidity,
			icon: 				this.state[weatherName].icon,
			precipIntensity: 	this.state[weatherName].precipIntensity,
			precipProbability: 	this.state[weatherName].precipProbability,
			summary: 			this.state[weatherName].summary,
			temperature: 		this.state[weatherName].temperature,
		};
		console.log(newData);
		this.setState({
			[objectName] : newData,
		})
	}
	componentDidMount(){
		// this.assignStates();
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
				{this.state.weatherData1 && 
					<DisplayWeather
						humidity={this.state.parsedweatherData1.humidity}
						icon={this.state.parsedweatherData1.icon}
						precipIntensity={this.state.parsedweatherData1.precipIntensity}
						precipProbability={this.state.parsedweatherData1.precipProbability}
						summary={this.state.parsedweatherData1.summary}
						temperature={this.state.parsedweatherData1.temperature}
					/>
				}
				{this.state.weatherData2 && 
					<DisplayWeather
						humidity={this.state.parsedweatherData2.humidity}
						icon={this.state.parsedweatherData2.icon}
						precipIntensity={this.state.parsedweatherData2.precipIntensity}
						precipProbability={this.state.parsedweatherData2.precipProbability}
						summary={this.state.parsedweatherData2.summary}
						temperature={this.state.parsedweatherData2.temperature}
					/>
				}
				<button onClick={()=>{window.location.reload()}}>Refresh</button>
				<Footer />
			</div>
		);
	}

}

export default App;
