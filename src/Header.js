import React, { Component } from 'react';
import DateTimePicker from 'react-datetime-picker';

class Header extends Component{


    render(){
        return (
            <div className="header">
                <div className="wrapper formBox">
                    <h1>Commuter.Weather</h1>
                    <p>Tell us when your commute is, we'll tell you how the weather will be!</p>
                    <form action="">
                        <div>
                            <label htmlFor="time1">Commute to Work Start Time</label>
                            <DateTimePicker
                                className="datePicker"
                                onChange={this.props.handleChange1}
                                value={this.props.time1}
                                format="y-MM-dd h:mm a"
                            />
                        </div>
                        <div>
                            <label htmlFor="time2">Commute to Home Start Time</label>
                            <DateTimePicker
                                className="datePicker"
                                onChange={this.props.handleChange2}
                                value={this.props.time2}
                                format="y-MM-dd h:mm a"
                            />
                        </div>
                        <button onClick={this.props.kickOff}
                            className="greenButton"
                        >Display Weather
                        </button>
                    </form>
                </div>
            </div>
        )
    }
}

export default Header;