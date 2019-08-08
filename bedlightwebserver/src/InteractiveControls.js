import React from 'react';

class InteractiveControls extends React.Component {
    render() {
        return (
            <div className="InteractiveControls">
                <button onClick={ () => this.props.onInteractiveChange(true) }>Interactive</button>
                <button onClick={ () => this.props.onInteractiveChange(false) }>Non-interactive</button>

            </div>
        );
    }
}

export default InteractiveControls;