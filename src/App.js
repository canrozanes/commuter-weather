import React, { Component } from 'react';
import axios from 'axios';
import Header from './Header.js';
import DisplayWeather from './DisplayWeather.js';
import Footer from './Footer.js'


import './App.css';

class App extends Component {
	constructor() {
		super();
		//create a reference to the weatherData component for automatic scrolling
		this.refToWeather = React.createRef();
		this.state = {
			time1: this.todaysDate(),
			time2: this.todaysDate(),
			formattedTime1: "",
			formattedTime2: "",
			parsedweatherData1: {},
			parsedweatherData2: {},
			locationName: "",
			counter: 0,
			latt: "",
			long: "",
			refToWeather: "",
			error: null,
		}
	}
	//take todays date reformated it and create a new date object to set the initial state of time1 and time2 states to be nice round datetimes. 
	todaysDate = ()       => {
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
		return new Date(`${year}-${month}-${day}T${hours}:00:00`);
	}
	//handle change for the first dateTime picker
	handleChange1 = (time) => {
		this.setState({ time1: time })
	}
	//handle change for the second dateTime picker
	handleChange2 = (time) => {
		this.setState({ time2: time })
	}
	handleLocation = (event) =>{
		this.setState({
			locationName: event.target.value,
		})
		
	}
	//when user presses the "Display Weather" button, call the formatDate function with "weatherData1" and "weatherData2" strings.
	kickOff = (e) => {
		//prevent default behaviour of the button
		e.preventDefault();
		//call format date for two different dates. Also pass in strings that will eventually be the name of the objects that will store the results of the each API call.
		this.setState({
			formattedTime1 : this.formatDate(this.state.time1),
			formattedTime2 : this.formatDate(this.state.time2),
		})
		this.getCityCoordinate(this.state.locationName);
	}
	//format the date from a date object to a string format that is accepted by the API. Once the date format conversion happens, make the API call.
	formatDate = (dateObject) => {
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
		//convert the date to format /YYYY-MM-DDTHH:mm:00
		let dateString = `${year}-${month}-${day}T${hours}:${minutes}:00`;
		//go to the function that makes the API Call
		return dateString
	}
	//make the API Call and pass in the date string {weatherName} first mentioned in the kickoff function.
	getWeatherData = (date, weatherName) => {
		console.log(date);
		axios({
			url: `https://cors-anywhere.herokuapp.com/https://api.darksky.net/forecast/c369d6cf3852faec4a3db6128422f86a/${this.state.latt},${this.state.long},${date}?units=si`,

		}).then((response) => {
			//set state with the result from the API Response
			console.log(response.data)
			this.setState({
				[weatherName]: response.data.currently,
			})
			//call the assignStates function to make state assignments.
			this.assignStates(weatherName);
			if (this.refToWeather.current){
				window.scrollTo(0, this.refToWeather.current.offsetTop);
			}
		})
	}
	getCityCoordinate=(address) =>{
		axios({
			url:`https://nominatim.openstreetmap.org/search`,
			method: 'GET',
			params: {
				q: address,
				format:"json",
				addressdetails: 1,
				limit: 1,
			}
		}).then((response)=>{
			this.setState({
				latt: response.data[0].lat,
				long: response.data[0].lon
			})
			this.getWeatherData(this.state.formattedTime1, "weatherData1")
			this.getWeatherData(this.state.formattedTime2, "weatherData2")
		}).catch((error)=>{
			this.setState({
				error: error.message
			})
		})
	}
	getCityNameFromCoordinates = (latt,long) => {
		axios({
			url: `https://nominatim.openstreetmap.org/reverse?`,
			method: 'GET',
			params: {
				lat: latt,
				lon: long,
				format: "json",
				addressdetails: 1,
				limit: 1,
			}
		}).then((response) => {
			let city=response.data.address.city;
			this.setState({
				locationName: city,
			})
		}).catch((error)=>{
			this.setState({
				error: error.message
			})
		})
	}

	//this function takes the properties inside the object created by the API call and assigns them to another object called parsed+weatherName"\
	assignStates = (weatherName) => {
		//create an object called parsed + weathername to store the parsed data.
		const objectName = `parsed` + weatherName;
		//create an object called new Data with properties assigned to the states.	
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
		//assign the newData as an object to [objectName] 
		this.setState({
			[objectName] : newData,
		})
	}
	//if the status shown is "rain" but the precipitation intensity is less than 0.4 mm/hr tell the user that is very little rain
	displayRainMessage = () => {
		if ((this.state.weatherData1.icon === "rain" || this.state.weatherData1.icon==="rain")&&(this.state.weatherData1.precipIntensity !== 0 && this.state.weatherData1.precipIntensity <= 0.4) &&
		(this.state.weatherData2.precipIntensity !== 0 && this.state.weatherData2.precipIntensity < 0.4)){
			return <p className="wrapper message">{`${Math.round(Math.max(this.state.weatherData1.precipIntensity, this.state.weatherData2.precipIntensity)*100)/100} mm/hr is really not a lot of rain you can still bike!`}</p>
		}
	}
	//convert unix time that comes back from the server to human readable time. 
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
	getLocationInfo = (position) => {
		this.setState({
			long: position.coords.longitude,
			latt: position.coords.latitude
		})
		this.getCityNameFromCoordinates(this.state.latt, this.state.long)
	}
	componentDidMount(){
		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(this.getLocationInfo);
		}
	}
	render() {
		return (
			<div className="App" >
				<Header 
					time1={this.state.time1}
					time2={this.state.time2}
					handleChange1={this.handleChange1}
					handleChange2={this.handleChange2}
					handleLocation={this.handleLocation}
					kickOff={this.kickOff} 
					locationName={this.state.locationName}
					latt={this.state.latt}
					long={this.state.long}
				/>
				{/* if weatherData1 and weatherData2 are defined, render main, else render nothing */}
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
								windSpeed=			{this.state.parsedweatherData1.windSpeed}
								time=				{this.state.time1}
							/>
													
							<DisplayWeather
								humidity=			{this.state.parsedweatherData2.humidity}
								icon=				{this.state.parsedweatherData2.icon}
								precipIntensity=	{this.state.parsedweatherData2.precipIntensity}
								precipProbability=	{this.state.parsedweatherData2.precipProbability}
								summary=			{this.state.parsedweatherData2.summary}
								temperature=		{this.state.parsedweatherData2.temperature}
								apparentTemp=		{this.state.parsedweatherData2.apparentTemp}
								windSpeed=			{this.state.parsedweatherData2.windSpeed}
								time=				{this.state.time2}
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
