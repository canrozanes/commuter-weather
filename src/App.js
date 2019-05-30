import React, { Component } from 'react';
import axios from 'axios';
import Header from './Header.js';
import Footer from './Footer.js'


import './App.css';

class App extends Component {
	constructor() {
		super();
		this.state = {
			time1: '10:00',
			time2: '10:00',
			// time: '10:00',
			currently: {},
			minutely: {},
			hourly: {},
		}
	}
	handleChange1 = (time) => {
		this.setState({ time1: time })}
	handleChange2 = (time) => {
		this.setState({ time2: time })
	}


		// this.setState({

		// })
		
	componentDidMount(){

		// axios({
		// 	url: `https://cors-anywhere.herokuapp.com/https://api.darksky.net/forecast/c369d6cf3852faec4a3db6128422f86a/43.6532,-79.3832`,
		// }).then((response) => {
		// 	response = response.data
		// 	this.setState({
		// 		weather: response
		// 	})
		// 	console.log(this.state.weather)

		// })
		const getWeatherData = () =>{
			return axios({
				url: `https://cors-anywhere.herokuapp.com/https://api.darksky.net/forecast/c369d6cf3852faec4a3db6128422f86a/43.6532,-79.3832?units=si`,
				
			})
		}

		const getAllData = async () => {
			const response = await getWeatherData();
			const weatherData = response.data;
			// console.log(weatherData)
			this.setState({
				currently: weatherData.currently,
				minutely: weatherData.minutely,
				hourly: weatherData.hourly
			})
			console.log(weatherData)
			console.log("currently", this.state.currently)
			console.log("minutely", this.state.minutely)
			console.log("hourly", this.state.hourly)
		}
		// getAllData();
		// console.log(this.state.time)


	}

	render(){
		return (
			<div className="App" >
				<Header time={this.state} handleChange1={this.handleChange1} handleChange2={this.handleChange2}  />


				
				<Footer />
			</div>
		);
	}

}

export default App;
