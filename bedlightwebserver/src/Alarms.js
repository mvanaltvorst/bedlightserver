import React from 'react';


function AlarmRow(props) {
    let row = props.row;
    return (
        <tr>
            <td>
                { `${row.time.hour}:${row.time.minute}` }
            </td>
            <td>
                <div 
                    className="ColorBox" 
                    style={{
                        backgroundColor: `rgb(${row.color.r}, ${row.color.g}, ${row.color.b})`,
                        width: '30px',
                        height: '12px',
                        display: 'inline-block',
                    }}
                />
            </td>
            <td>
                <input type="checkbox" data-id={ row.id } checked={row.interactive} onChange={ props.onAlarmInteractiveToggle }/>
            </td>
            <td>
                <input type="checkbox" data-id={ row.id } checked={row.enabled} onChange={ props.onAlarmEnabledToggle }/>
            </td>
            <td>
                <button>Remove</button>
            </td>
        </tr>
    );
}

class Alarms extends React.Component {
    constructor(props) {
        super(props)

        this.addAlarm = this.addAlarm.bind(this);
        this.onAlarmEnabledToggle = this.onAlarmEnabledToggle.bind(this);
        this.onAlarmInteractiveToggle = this.onAlarmInteractiveToggle.bind(this);
    }

    findAlarmIndexById(id) {
        let nalarms = this.props.alarms.length
        for (let i = 0; i < nalarms; i++) {
            console.log(this.props.alarms[i].id, " ", id);
            if (this.props.alarms[i].id == id) {
                return i;
            }
        }
    }

    addAlarm() {
        // this.props.alarms
    }

    onAlarmEnabledToggle(e) {
        let id = parseInt(e.target.getAttribute("data-id"));
        let checked = e.target.checked;
        let oldAlarmIndex = this.findAlarmIndexById(id);
        let oldAlarm = this.props.alarms[oldAlarmIndex];
        this.props.updateAlarm(
            oldAlarm.time.hour, 
            oldAlarm.time.minute, 
            oldAlarm.color.r,
            oldAlarm.color.g,
            oldAlarm.color.b,
            oldAlarm.interactive,
            checked,
            oldAlarmIndex
        );
    }

    onAlarmInteractiveToggle(e) {
        let id = parseInt(e.target.getAttribute("data-id"));
        let checked= e.target.checked;
        let oldAlarmIndex = this.findAlarmIndexById(id);
        let oldAlarm = this.props.alarms[oldAlarmIndex];
        this.props.updateAlarm(
            oldAlarm.time.hour, 
            oldAlarm.time.minute, 
            oldAlarm.color.r,
            oldAlarm.color.g,
            oldAlarm.color.b,
            checked,
            oldAlarm.enabled,
            oldAlarmIndex
        );
    }

    render() {
        let rows = [];
        this.props.alarms.forEach(row => {
            console.log(`rgb(${row.color.r}, ${row.color.g}, ${row.color.b})`);
            rows.push(
                <AlarmRow key={ row.id } row={ row } onAlarmEnabledToggle={ this.onAlarmEnabledToggle } onAlarmInteractiveToggle={ this.onAlarmInteractiveToggle } />
            )
        });

        return (
            <div className="Alarms">
                <table>
                    <thead>
                        <tr>
                            <th>Time</th>
                            <th>Color</th>
                            <th>Interactive</th>
                            <th>Enabled</th> 
                            <th>Remove</th>
                        </tr>
                    </thead>
                    <tbody>
                        { rows }
                    </tbody>
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