import React, { Component } from 'react';
import axios from 'axios';
import Header from './Header.js';
import DisplayWeather from './DisplayWeather.js';
import Footer from './Footer.js'


import './App.css';

class App extends Component {
	constructor() {
		super();
		this.refToWeather = React.createRef();
		this.state = {
			time1: this.todaysDate(),
			time2: this.todaysDate(),
			parsedweatherData1: {},
			parsedweatherData2: {},
			refToWeather: ""
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
		this.getWeatherData(dateString, weatherName);
	}
	todaysDate = () => {
		let dateObject = new Date();
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
		return new Date(`${year}-${month}-${day}T00:00:00`);
	}

	getWeatherData = (date, weatherName) => {
		axios({
			url: `https://cors-anywhere.herokuapp.com/https://api.darksky.net/forecast/c369d6cf3852faec4a3db6128422f86a/43.6532,-79.3832,${date}?units=si`,

		}).then((response) => {
			console.log(response.data);
			this.setState({
				[weatherName]: response.data.currently,
			})
			this.assignStates(weatherName);
			if (this.refToWeather.current){
				window.scrollTo(0, this.refToWeather.current.offsetTop);
			}
		})
	}

	// we do the filtering of the data and set state to contain a 
	// {weateherIcon1: }
	assignStates = (weatherName) => {
		const objectName = `parsed` + weatherName;
		// let d = new Date(0)
		const newData = {
			humidity: 			this.state[weatherName].humidity,
			icon: 				this.state[weatherName].icon,
			precipIntensity: 	this.state[weatherName].precipIntensity,
			precipProbability: 	this.state[weatherName].precipProbability,
			summary: 			this.state[weatherName].summary,
			temperature: 		this.state[weatherName].temperature,
			apparentTemp: 		this.state[weatherName].apparentTemperature,
			windSpeed: 			this.state[weatherName].windSpeed,
			serverTime: 		this.readableDate(this.state[weatherName].time),
		};
		this.setState({
			[objectName] : newData,
		})
	}
	displayRainMessage = () => {
		if ((this.state.weatherData1.icon === "rain" || this.state.weatherData1.icon==="rain")&&(this.state.weatherData1.precipIntensity !== 0 && this.state.weatherData1.precipIntensity <= 0.4) &&
		(this.state.weatherData2.precipIntensity !== 0 && this.state.weatherData2.precipIntensity < 0.4)){
			return <p className="wrapper message">{`${Math.round(Math.max(this.state.weatherData1.precipIntensity, this.state.weatherData2.precipIntensity)*100)/100} mm/hr is really not a lot of rain you can still bike!`}</p>
		}
	}
	readableDate = (unixTime) => {
		let months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
		let date = new Date(unixTime * 1000);

		let month = months[date.getMonth()];
		let day = date.getDate();
		let suffix;
		if (day.toString().endsWith('11', 2)) {
			suffix = 'th';
		}
		else if (day.toString().endsWith('1', 1)){
			suffix = 'st';
		}
		else if (day.toString().endsWith('2', 1)) {
			suffix = 'nd';
		}
		else if (day.toString().endsWith('3', 1)) {
			suffix = 'rd';
		}
		else{
			suffix = 'th';
		}
		// Hours part from the timestamp
		let hours = date.getHours();
		// Minutes part from the timestamp
		let minutes = "0" + date.getMinutes();
		// Seconds part from the timestamp

		// Will display time in 10:30:23 format
		let formattedTime = `${month} ${day}${suffix}, ${hours}:${minutes.substr(-2)}`;
		return formattedTime;
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
				{this.state.weatherData1 && this.state.weatherData2 ? 
				<main ref={this.refToWeather}>
					<div className="weatherResults wrapper">
							<DisplayWeather
								humidity=			{this.state.parsedweatherData1.humidity}
								icon=				{this.state.parsedweatherData1.icon}
								precipIntensity=	{this.state.parsedweatherData1.precipIntensity}
								precipProbability=	{this.state.parsedweatherData1.precipProbability}
								summary=			{this.state.parsedweatherData1.summary}
								temperature=		{this.state.parsedweatherData1.temperature}
								apparentTemp=		{this.state.parsedweatherData1.apparentTemp}
								windSpeed=				{this.state.parsedweatherData1.windSpeed}
								time=				{this.state.parsedweatherData1.serverTime}
							/>
													
							<DisplayWeather
								humidity=			{this.state.parsedweatherData2.humidity}
								icon=				{this.state.parsedweatherData2.icon}
								precipIntensity=	{this.state.parsedweatherData2.precipIntensity}
								precipProbability=	{this.state.parsedweatherData2.precipProbability}
								summary=			{this.state.parsedweatherData2.summary}
								temperature=		{this.state.parsedweatherData2.temperature}
								apparentTemp=		{this.state.parsedweatherData2.apparentTemp}
								windSpeed=				{this.state.parsedweatherData2.windSpeed}
								time=				{this.state.parsedweatherData2.serverTime}
							/>
					</div>
					{this.displayRainMessage()}
					<div className="buttonContainer">
						<button 
							onClick={()=>{window.location.reload()}}
							className="greenButton">Refresh
						</button>
					</div>
				</main>
				:''}
				<Footer/>
			</div>
		);
	}

}

export default App;
