import React from 'react';
import { SketchPicker } from 'react-color';

class ColorControls extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            liveUpdate: false
        }

        this.handleChangeLiveUpdate = this.handleChangeLiveUpdate.bind(this);
        this.handleColorChange = this.handleColorChange.bind(this);
    }

    handleChangeLiveUpdate(e) {
        console.log("Setting live update to", e.target.checked);
        this.setState({ liveUpdate: e.target.checked })
    }

    handleColorChange(color) {
        this.props.onColorChange(color);
        if (this.state.liveUpdate) this.props.updateColor();
    }

    render() {
        return (
            <div className="ColorControls">
                <SketchPicker 
                    color={ this.props.bgColor }
                    onChangeComplete={ this.handleColorChange }
                    disableAlpha={ true }
                    width={ "95%" }
                    // styles={
                    //     {
                    //         "width": "100%"
                    //     }
                    // }
                />
                <br/>
                <div className="ColorControlsButtons">
                    <span><input type="checkbox" defaultChecked={ this.state.liveUpdate } onChange={ this.handleChangeLiveUpdate }/> Live update </span>
                    <button onClick={ this.props.updateColor }>Refresh</button>
                </div>
            </div>
        );
    }
}

export default ColorControls;