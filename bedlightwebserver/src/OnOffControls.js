import React from 'react';

class OnOffControls extends React.Component {
    render() {
        return (
            <div className="OnOffControls">
                <button onClick={ () => this.props.onPowerChange(true) }>Turn on</button>
                <button onClick={ () => this.props.onPowerChange(false) }>Turn off</button>
            </div>
        );
    }
}

export default OnOffControls;