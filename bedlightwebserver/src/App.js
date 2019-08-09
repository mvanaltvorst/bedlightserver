import React from 'react';
import './App.css';
import View from './View.js';
import Api from './Api.js';

class App extends React.Component {
  constructor(props) {
    super();
    this.state = {
      bgColor: {r: 255, g: 255, b: 255},
      turnedOn: true,
      interactiveMode: true,
      // alarms: [{time: {hour: 11, minute: 34}, color: {r: 255, g: 0, b: 0}, interactive: true, enabled: true, id: 1}],
      alarms: [],
    };

    this.handlePowerChange = this.handlePowerChange.bind(this);
    this.handleColorChange = this.handleColorChange.bind(this);
    this.handleInteractiveChange = this.handleInteractiveChange.bind(this);
    this.updateColor = this.updateColor.bind(this);
    this.updateAlarm = this.updateAlarm.bind(this);
    this.handleAlarmToggle = this.handleAlarmToggle.bind(this);

    this.api = new Api(window.location.origin);
  }

  handleAlarmInteractiveToggle(e) {
    const checked = e.target.checked;
    const id = e.target.identifier;
    console.log(`Toggling ${id}`)
    console.log(this.state)
    this.api.toggleInteractiveAlarm(id);
    this.setState(state => {
      for (let i = 0; i < state.alarms.length; i++) {
        if (state.alarms[i].id === id) {
          state.alarms[i].enabled = checked;
          return state;
        }
      }
    });
  }

  handleAlarmToggle(e) {
    const checked = e.target.checked;
    const id = e.target.identifier;
    console.log(`Toggling ${id}`)
    console.log(this.state)
    this.api.toggleAlarm(id);
    this.setState(state => {
      for (let i = 0; i < state.alarms.length; i++) {
        if (state.alarms[i].id === id) {
          state.alarms[i].enabled = checked;
          return state;
        }
      }
    });
  }

  handlePowerChange(turnedOn) {
    console.log(`Turning ${turnedOn ? "on" : "off"}`)
    this.setState({ turnedOn: turnedOn });
    turnedOn ? this.api.turnOn() : this.api.turnOff();
  }

  handleColorChange(color) {
    console.log("Setting color to", color);
    this.setState({ bgColor: {r: color.rgb.r, g: color.rgb.g, b: color.rgb.b}});
  }

  handleInteractiveChange(interactive) {
    console.log(`Turning interactive ${interactive ? "on" : "off"}`)
    this.setState({ interactiveMode: interactive });
    interactive ? this.api.setInteractive() : this.api.setReadingLight();
  } 

  updateColor() {
    // push color through to API
    console.log("Pushing color to API");
    this.api.setBgColor(this.state.bgColor);
  }

  updateAlarm(hour, minute, r, g, b, interactive, enabled, index) {
    console.log("Updating alarm")
    let id = this.state.alarms[index].id;
    this.api.updateAlarm(hour, minute, r, g, b, interactive, enabled, id);
    this.setState(state => {
      state.alarms[index] = {time: {hour: hour, minute: minute}, color: {r: r, g: g, b: b}, enabled: enabled, interactive: interactive, id: id};
      return state;
    });
    console.log(this.state.alarms);
  }

  render() {
    return (
      <div className="App">
        <View 
          turnedOn = { this.state.turnedOn }
          bgColor = { this.state.bgColor }
          interactiveMode = { this.state.interactiveMode }
          onPowerChange={ this.handlePowerChange }
          onColorChange={ this.handleColorChange }
          onInteractiveChange={ this.handleInteractiveChange }
          updateColor={ this.updateColor }
          updateAlarm={ this.updateAlarm }
          alarms = { this.state.alarms }
        />
      </div>
    );
  }
}

export default App;