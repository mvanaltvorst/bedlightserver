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
      alarms: [],
    };

    this.handlePowerChange = this.handlePowerChange.bind(this);
    this.handleColorChange = this.handleColorChange.bind(this);
    this.handleInteractiveChange = this.handleInteractiveChange.bind(this);
    this.updateColor = this.updateColor.bind(this);
    this.handleAlarmToggle = this.handleAlarmToggle.bind(this);

    this.api = new Api(window.location.origin);
  }

  handleAlarmToggle(e) {
    const checked = e.target.checked
    const id = e.target.identifier
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
          onAlarmToggle={ this.handleAlarmToggle }
        />
      </div>
    );
  }
}

export default App;