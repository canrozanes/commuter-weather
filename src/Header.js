import React, { Component } from 'react';
import DateTimePicker from 'react-datetime-picker';

class Header extends Component{


    render(){
        return (
            <div className="header wrapper">
                <div>
                    <h1>Commuter.Weather</h1>
                    <form action="">
                        <label htmlFor="time1">Commute From Home Start Time</label>
                        <DateTimePicker
                            onChange={this.props.handleChange1}
                            value={this.props.time1}
                            format="y-MM-dd h:mm a"
                        
                    />
                        <label htmlFor="time2">Commute From Home Start Time</label>
                        <DateTimePicker
                            onChange={this.props.handleChange2}
                            value={this.props.time2}
                            format="y-MM-dd h:mm a"
                        />
                        <button onClick={this.props.kickOff}
                        >Display Weather Data
                        </button>
                    </form>
                </div>
            </div>
        )
    }
}

export default Header;