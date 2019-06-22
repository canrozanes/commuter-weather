import React, { Component } from 'react';

class DisplayWeather extends Component {
    getTimefromDate = (dateTime) => {
        let hours = dateTime.getHours();
        if (hours < 10) {
            hours = '0' + hours;
        }
        let minutes = dateTime.getMinutes();
        if (minutes < 10) {
            minutes = '0' + minutes;
        }
        let timeString = `${hours}:${minutes}`;
        return timeString
    }
    

    render(){
        return(
            <div className="weatherResult">
                <h2>Weather forecast for <span className="bold">{this.getTimefromDate(this.props.time)}</span></h2>
                <div className="weatherData">
                    <div className="importantData">
                        <div className="iconContainer">
                            <img src={`./assets/weatherIcons/${this.props.icon}.svg`} alt={`${this.props.icon} icon`}/>
                        </div>
                        <h3>{this.props.summary}</h3>
                        <div className="temperature">
                        <h3>{Math.round(this.props.temperature)} {'\u00b0'} C</h3>
                        </div>
                    </div>
                    <div className="extraData">
                        <div className="apparentTemp numberItem">
                            <h4>Feels like:</h4>
                            <p>{Math.round(this.props.apparentTemp)} {'\u00b0'} C</p>
                        </div>
                        <div className="precipProbability numberItem">
                            <h4>Chance of Precipitation: </h4>
                            <p>{`${Math.round(this.props.precipProbability*100)}%`}</p>
                        </div>
                        <div className="precipIntensity numberItem">
                            <h4>Precipitation: </h4>
                            <p>{`${Math.round(this.props.precipIntensity*100)/100} mm/hr`}</p>
                        </div>
                        <div className="humidity numberItem">
                            <h4>Humiditiy:</h4>
                            <p>{`${Math.round(this.props.humidity * 100)} %`}</p>
                        </div>
                        <div className="windSpeed numberItem">
                            <h4>Wind:</h4>
                            <p>{`${Math.round(this.props.windSpeed * 3600/1000)} km/hr`}</p>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default DisplayWeather;