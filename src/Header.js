import React, { Component } from 'react';
import TimePicker from 'react-time-picker';

class Header extends Component{

    render(){
        console.log(this.props.time.time1)
        return (
            <div className="header wrapper">
                <div>
                    <h1>Commuter.Weather</h1>
                    <form action="">
                        <label htmlFor="time1">Commute From Home Start Time</label>
                        <TimePicker
                            onChange={this.props.handleChange1}
                            value={this.props.time.time1}
                            format="HH:mm:a"
                            name="time1"
                            disableClock={true}
                        />
                        <label htmlFor="time2">Commute From Home Start Time</label>
                        <TimePicker
                            onChange={this.props.handleChange2}
                            value={this.props.time.time2}
                            format="HH:mm:a"
                            name="time2"
                            disableClock={true}
                        />
                        <button>Get Weather Data</button>
                    </form>
                </div>
            </div>
        )
    }
}

export default Header;