import React, { Component } from 'react';

class Footer extends Component {
    render() {
        return (
            <footer>
                <div className="wrapper">
                    <a href="https://darksky.net/poweredby/"> Powered by Dark Sky API </a>
                    <p>  <span className="hideOnMobile">-</span> Built by Can Rozanes <span className="hideOnMobile">-</span> </p>
                    <a href="https://www.iconfinder.com/iconsets/weather-color-2"> Weather Icons by Yun Liu</a>
                </div>
            </footer>
        )
    }
}

export default Footer;