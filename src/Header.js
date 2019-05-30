import React, { Component } from 'react';
import TimePicker from 'react-time-picker';

class Header extends Component{

    render(){
        return (
            <div className="header wrapper">
                <div>
                    <h1>Commuter.Weather</h1>
                </div>
            </div>
        )
    }
}

export default Header;