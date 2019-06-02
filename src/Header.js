import React, { Component } from 'react';
import DateTimePicker from 'react-datetime-picker';

class Header extends Component{
    todayOffset = (offset) => {
        let dateObject = new Date();
        let year = dateObject.getFullYear();
        let month = dateObject.getMonth() + 1;
        if (month < 10) {
            month = '0' + month;
        }
        let day = dateObject.getDate()+offset;
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
    render(){
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
                                maxDate={this.todayOffset(7)}
                                minDate={this.todayOffset(-1)}
                            />
                        </div>
                        <div className="formInput">
                            <label className="bold" htmlFor="time2">Commute to Home Start Time:</label>
                            <DateTimePicker
                                className="datePicker"
                                onChange={this.props.handleChange2}
                                value={this.props.time2}
                                format="y-MM-dd HH:mm"
                                maxDate={this.todayOffset(7)}
                                minDate={this.todayOffset(-1)}
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