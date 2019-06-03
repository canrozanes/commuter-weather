import React, { Component } from 'react';
import DateTimePicker from 'react-datetime-picker';

class Header extends Component {

    //add or subtract days from today to use on maxDate and minDate props of DateTimePicker component.
    todayOffset = (offset) => {
        //create a new weather object with todays date
        let dateObject = new Date();
        let year = dateObject.getFullYear();
        let month = dateObject.getMonth() + 1;
        if (month < 10) {
            month = '0' + month;
        }
        //let the output day be today's date + offset 
        let day = dateObject.getDate() + offset;
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
    render() {
        return (
            <div className="header">
                <div className="wrapper formBox">
                    <h1>Toronto Commuter</h1>
                    <p>Tell us when your commute is, we'll tell you how the weather will be.</p>
                    <form action="">
                        <div className="formInput">
                            <label className="bold" htmlFor="time1">Commute to Work Start Time:</label>
                            <DateTimePicker
                                className="datePicker"
                                onChange={this.props.handleChange1}
                                value={this.props.time1}
                                format="y-MM-dd HH:mm"
                                // make sure user can only select yesterday to a week out
                                maxDate={this.todayOffset(7)}
                                minDate={this.todayOffset(-1)}
                                required={true}
                            />
                        </div>
                        <div className="formInput">
                            <label className="bold" htmlFor="time2">Commute to Home Start Time:</label>
                            <DateTimePicker
                                className="datePicker"
                                onChange={this.props.handleChange2}
                                value={this.props.time2}
                                format="y-MM-dd HH:mm"
                                // make sure user can only select yesterday to a week out
                                maxDate={this.todayOffset(7)}
                                minDate={this.todayOffset(-1)}
                                required={true}
                            />
                        </div>
                        {/* error handling: check if the user has values for both dates */}
                        <button onClick={(this.props.time1 && this.props.time1) ? this.props.kickOff : ""}
                            className="greenButton"
                        >Display Weather
                        </button>
                    </form>
                </div>
            </div >
        )
    }
}

export default Header;