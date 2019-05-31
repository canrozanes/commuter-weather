import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSun, faMoon } from '@fortawesome/free-solid-svg-icons';

class DisplayWeather extends Component{
    constructor(){
        super();
    }

    displayIcon = (icon) => {
        let iconToDisplay;
        console.log("hi")
        switch (icon){
            case "clear-day":
                iconToDisplay = <FontAwesomeIcon icon={faSun} />
                return iconToDisplay;
            case "clear-night":
                iconToDisplay = <FontAwesomeIcon icon={faMoon} />
                return iconToDisplay;
            case "rain":
                iconToDisplay = <FontAwesomeIcon icon={faSun} />
                return iconToDisplay;
            case "snow":
                iconToDisplay = <FontAwesomeIcon icon={faSun} />
                return iconToDisplay;
            case "sleet":
                iconToDisplay = <FontAwesomeIcon icon={faSun} />
                return iconToDisplay;
            case "wind":
                iconToDisplay = <FontAwesomeIcon icon={faSun} />
                return iconToDisplay;
            case "fog":
                iconToDisplay = <FontAwesomeIcon icon={faSun} />
                return iconToDisplay;
            case "cloudy":
                iconToDisplay = <FontAwesomeIcon icon={faSun} />
                return iconToDisplay;
            case "partly-cloudy-day":
                iconToDisplay = <FontAwesomeIcon icon={faSun} />
                return iconToDisplay;
            case  "partly-cloudy-night":
                iconToDisplay = <FontAwesomeIcon icon={faSun} />
                return iconToDisplay;
            
        } 
    }

    render(){
        return(
            <div>
                <div className="weather1">
                    <div className="icon">
                        <h3>Icon:</h3>
                        <p>{()=>{this.iconToDisplay(this.props.icon)}}</p>
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