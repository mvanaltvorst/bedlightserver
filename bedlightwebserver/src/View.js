import React from 'react';
import OnOffControls from './OnOffControls.js';
import ColorControls from './ColorControls.js';
import InteractiveControls from './InteractiveControls.js';

class View extends React.Component {
    render() {
        return (
            <div className="View">
                <h1>Controls</h1>
                <OnOffControls onPowerChange={ this.props.onPowerChange }/>
                <InteractiveControls onInteractiveChange={ this.props.onInteractiveChange } />
                <ColorControls bgColor={ this.props.bgColor } onColorChange={ this.props.onColorChange } updateColor={ this.props.updateColor }/>
            </div>
        );
    }
}

export default View;