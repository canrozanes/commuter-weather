import React, { Component } from 'react';
import axios from 'axios';
import Header from './Header.js';
import Footer from './Footer.js'


import './App.css';

class App extends Component {
	constructor() {
		super();
		this.state = {
			time1: '',
			time2: '',
			// time: '10:00',
			currently: {},
			minutely: {},
			hourly: {},
		}
	}
	handleChange1 = (time) => {
		console.log(time);
		

		
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

	formatDate = (dateThingy, weatherName) => {
		let year = dateThingy.getFullYear();
		let month = dateThingy.getMonth() + 1;
		if (month <10){
			month = '0' + month;
		}
		let day = dateThingy.getDate();
		if (day < 10) {
			day = '0' + day;
		}
		let hours = dateThingy.getHours();
		if (hours < 10) {
			hours = '0' + hours;
		}
		let minutes = dateThingy.getMinutes();
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

		}).then((response)=>{
			console.log(response);
			this.setState({
				[weatherName]: response.data.currently
			})
		})
	}
	formatToUTC = (date) => {
		let toUTC = new Date(date).toUTCString()
		return toUTC;
	}

	offsetGMTtoToronto = (time) => {
		return time -14400;
	}
		
		// we do the filtering of the data and set state to contain a 
		// {weateherIcon1: }


	render(){
		return (
			<div className="App" >
				<Header time1={this.state.time1} 
						time2={this.state.time2} 
						handleChange1={this.handleChange1} 
						handleChange2={this.handleChange2}
						kickOff={this.kickOff}  />
				<Footer />
			</div>
		);
	}

}

export default App;
