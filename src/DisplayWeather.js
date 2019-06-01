import React, { Component } from 'react';

class DisplayWeather extends Component {

    render(){
        return(
            <div className="weather">
                <h3>Weather forecast for {this.props.time}</h3>
                <div className="icon stats">
                    <img src={`./assets/weatherIcons/${this.props.icon}.svg`} alt=""/>
                </div>
                <div className="summary stats">
                    <h3>{this.props.summary}</h3>
                </div>
                <div className="temperature stats">
                    <h3>Temperature:</h3>
                    <p>{Math.round(this.props.temperature)} {'\u00b0'} C</p>
                </div>
                <div className="apparentTemp stats">
                    <h3>Feels like:</h3>
                    <p>{Math.round(this.props.apparentTemp)} {'\u00b0'} C</p>
                </div>
                <div className="precipProbability stats">
                    <h3>Chance of Rain: </h3>
                    <p>{`${this.props.precipProbability*100} %`}</p>
                </div>
                <div className="precipIntensity stats">
                    <h3>Amount of Rain: </h3>
                    <p>{`${Math.round(this.props.precipIntensity*100)/100} mm/hr`}</p>
                </div>
                <div className="humidity stats">
                    <h3>Humiditiy:</h3>
                    <p>{`${this.props.humidity * 100} %`}</p>
                </div>
            </div>
        )
    }
}

export default DisplayWeather;