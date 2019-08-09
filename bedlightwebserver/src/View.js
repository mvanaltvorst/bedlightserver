import React from 'react';
import OnOffControls from './OnOffControls.js';
import ColorControls from './ColorControls.js';
import InteractiveControls from './InteractiveControls.js';
import Alarms from './Alarms.js';

class View extends React.Component {
    render() {
        return (
            <div className="View">
                <h1>Controls</h1>
                <OnOffControls onPowerChange={ this.props.onPowerChange }/>
                <InteractiveControls onInteractiveChange={ this.props.onInteractiveChange } />
                <ColorControls bgColor={ this.props.bgColor } onColorChange={ this.props.onColorChange } updateColor={ this.props.updateColor }/>
                <h1>Alarms</h1>
                <Alarms 
                    alarms={ this.props.alarms }
                    updateAlarm={ this.props.updateAlarm }
                    selectedColor={ this.props.bgColor }
                />
            </div>
        );
    }
}

export default View;