import React, { Component } from "react";
import DateTimePicker from "react-datetime-picker";

class Header extends Component {
  //add or subtract days from today to use on maxDate and minDate props of DateTimePicker component.
	todayOffset = offset => {
    //create a new weather object with todays date
    let result = new Date();
    result.setDate(result.getDate() + offset);
    return result;
  };
  render() {
    return (
      <div className="header">
        <div className="wrapper formBox">
          <h1>Commuter.Weather</h1>
          <p>
            Tell us when your commute is, we'll tell you how the weather will
            be.
          </p>
          <form action="">
            <div className="formInput">
              <label className="bold" htmlFor="location">
                City:
              </label>
              <input
                className="textInput"
                type="text"
                id="location"
                placeholder={"enter city name"}
                value={this.props.locationName}
                onChange={this.props.handleLocation}
              />
            </div>
            <div className="formInput">
              <label className="bold" htmlFor="time1">
                Commute to Work Start Time:
              </label>
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
              <label className="bold" htmlFor="time2">
                Commute to Home Start Time:
              </label>
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
            <button
              onClick={
                this.props.time1 && this.props.time1 ? this.props.kickOff : ""
              }
              className="greenButton"
            >
              Display Weather
            </button>
          </form>
        </div>
      </div>
    );
  }
}

export default Header;
