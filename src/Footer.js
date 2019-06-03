import React, { Component } from 'react';

class Footer extends Component {
    render() {
        return (
            <footer>
                <div className="wrapper">
                    <a href="https://darksky.net/poweredby/"> Powered by Dark Sky API </a>
                    <p> Built by Can Rozanes </p>
                    <a href="https://www.iconfinder.com/iconsets/weather-color-2"> Weather Icons by Yun Liu</a>
                </div>
            </footer>
        )
    }
}

export default Footer;