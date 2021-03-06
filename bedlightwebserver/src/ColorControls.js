import React from 'react';
import { SketchPicker } from 'react-color';

const PRESET_COLORS = [
    '#000000', 
    '#FFFFFF',
    '#D0021B', 
    '#F5A623', 
    '#F8E71C', 
    '#7ED321', 
    '#93F927',
    '#BD10E0', 
    '#9013FE', 
    '#4A90E2', 
    '#50E3C2'
]

class ColorControls extends React.Component {
    constructor(props) {
        super(props);

        this.handleChangeLiveUpdate = this.handleChangeLiveUpdate.bind(this);
        this.handleColorChange = this.handleColorChange.bind(this);
    }

    handleChangeLiveUpdate(e) {
        this.props.setLiveUpdate(e.target.checked)
    }

    handleColorChange(color) {
        this.props.onColorChange(color);
        if (this.props.liveUpdate) this.props.updateColor();
    }

    render() {
        return (
            <div className="ColorControls">
                <SketchPicker 
                    color={ this.props.bgColor }
                    onChangeComplete={ this.handleColorChange }
                    disableAlpha={ true }
                    width={ "95%" }
                    presetColors={ PRESET_COLORS }
                />
                <br/>
                <div className="ColorControlsButtons">
                    <span><input type="checkbox" defaultChecked={ this.props.liveUpdate } onChange={ this.handleChangeLiveUpdate }/> Live update </span>
                    <button onClick={ this.props.updateColor }>Refresh</button>
                </div>
            </div>
        );
    }
}

export default ColorControls;