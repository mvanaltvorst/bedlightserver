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
    };

    this.handlePowerChange = this.handlePowerChange.bind(this);
    this.handleColorChange = this.handleColorChange.bind(this);
    this.handleInteractiveChange = this.handleInteractiveChange.bind(this);
    this.updateColor = this.updateColor.bind(this);

    this.api = new Api(window.location.href);
  }

  handlePowerChange(turnedOn) {
    console.log(`Turning ${turnedOn ? "on" : "off"}`)
    this.setState({ turnedOn: turnedOn });
  }

  handleColorChange(color) {
    console.log("Setting color to", color);
    this.setState({ bgColor: {r: color.rgb.r, g: color.rgb.g, b: color.rgb.b}});
  }

  handleInteractiveChange(interactive) {
    console.log(`Turning interactive ${interactive ? "on" : "off"}`)
    this.setState({ interactiveMode: interactive });
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
        />
      </div>
    );
  }
}

export default App;