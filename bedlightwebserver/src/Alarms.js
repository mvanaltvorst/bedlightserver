import React from 'react';

class Alarms extends React.Component {
    constructor(props) {
        super(props)

        this.addAlarm = this.addAlarm.bind(this);
    }

    addAlarm() {

    }

    render() {
        const DATA = [
            [{hour: 11, minute: 34}, {r: 255, g: 0, b: 0}, true],
            [{hour: 13, minute: 54}, {r: 0, g: 255, b: 0}, false],
        ]

        let rows = [];
        DATA.forEach(row => {
            console.log(`rgb(${row[1].r}, ${row[1].g}, ${row[1].b});`);
            rows.push(
                <tr>
                    <td>
                        { `${row[0].hour}:${row[0].minute}` }
                    </td>
                    <td>
                        <div 
                            className="ColorBox" 
                            style={{
                                backgroundColor: `rgb(${row[1].r}, ${row[1].g}, ${row[1].b})`,
                                width: '30px',
                                height: '12px',
                                display: 'inline-block',
                            }}
                        />
                    </td>
                    <td>
                        <input type="checkbox" checked={row[2]} onClick={ this.props.onAlarmToggle }/>
                    </td>
                    <td>
                        <button>Remove</button>
                    </td>
                </tr>
            )
        });

        return (
            <div className="Alarms">
                <table>
                    <tr>
                        <th>Time</th>
                        <th>Color</th>
                        <th>Enabled</th> 
                        <th>Remove</th>
                    </tr>
                    { rows }
                </table>
                <br />
                <div className="addAlarm">
                    <input type="time" id="newAlarmTime" />
                    <div 
                        className="ColorBox" 
                        style={ {
                            backgroundColor: `rgb(${this.props.selectedColor.r}, ${this.props.selectedColor.g}, ${this.props.selectedColor.b})`,
                            width: '30px',
                            height: '12px',
                            display: 'inline-block',
                        } }
                    />
                    <input type="checkbox" id="newAlarmEnabled" />
                    <button onClick={ this.addAlarm }>Add new alarm</button>
                </div>
            </div>
        );
    }
}

export default Alarms;