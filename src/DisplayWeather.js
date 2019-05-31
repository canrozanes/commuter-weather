import React, { Component } from 'react';

class DisplayWeather extends Component {

    render(){
        return(
            <div>
                <div className="weather1">
                    <div className="icon">
                        <h3>Icon:</h3>
                        <img src={`./assets/weatherIcons/${this.props.icon}.svg`} alt=""/>
                    </div>
                    <div className="summary">
                        <h3>Summary:</h3>
                        <p>{this.props.summary}</p>
                    </div>
                    <div className="temperature">
                        <h3>Temperature:</h3>
                        <p>{this.props.temperature}</p>
                    </div>
                    <div className="precipProbability">
                        <h3>Chance of Rain: </h3>
                        <p>{this.props.precipProbability}</p>
                    </div>
                    <div className="precipIntensity">
                        <h3>Amount of Rain: </h3>
                        <p>{this.props.precipIntensity}</p>
                    </div>
                    <div className="humidity">
                        <h3>Humiditiy:</h3>
                        <p>{this.props.humidity}</p>
                    </div>
                </div>
            </div>
        )
    }
}

export default DisplayWeather;