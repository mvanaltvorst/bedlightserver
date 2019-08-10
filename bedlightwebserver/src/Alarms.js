import React from 'react';

function findAlarmIndexById(alarms, id) {
    let nalarms = alarms.length
    for (let i = 0; i < nalarms; i++) {
        console.log(alarms[i].id, " ", id);
        if (alarms[i].id === id) {
            return i;
        }
    }
}

function Error(props) {
    if (props.value === "") {
        return null;
    } else {
        return (
            <div class="Error">
                { props.value }
            </div>
        );
    }
}

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
                    }}
                    onClick={ () => props.setSelectedColorAndUpdate({rgb: {r: row.color.r, g: row.color.g, b: row.color.b}}) }
                />
            </td>
            <td>
                <input type="checkbox" data-id={ row.id } checked={row.interactive} onChange={ props.onAlarmInteractiveToggle }/>
            </td>
            <td>
                <input type="checkbox" data-id={ row.id } checked={row.enabled} onChange={ props.onAlarmEnabledToggle }/>
            </td>
            <td>
                <button onClick={ () => props.deleteAlarm(row.id) }>Remove</button>
            </td>
        </tr>
    );
}

class Alarms extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            alarms: [{time: {hour: 11, minute: 34}, color: {r: 255, g: 0, b: 0}, interactive: true, enabled: true, id: 1}],
            newTime: "",
            newInteractive: false,
            newEnabled: true,
            // alarms: [],
            newAlarmError: "",
        }

        this.addAlarm = this.addAlarm.bind(this);
        this.updateAlarm = this.updateAlarm.bind(this);
        this.onAlarmEnabledToggle = this.onAlarmEnabledToggle.bind(this);
        this.onAlarmInteractiveToggle = this.onAlarmInteractiveToggle.bind(this);
        this.deleteAlarm = this.deleteAlarm.bind(this);
        this.updateNewInteractive = this.updateNewInteractive.bind(this);
        this.updateNewEnabled = this.updateNewEnabled.bind(this);
        this.updateNewTime = this.updateNewTime.bind(this);
    }

    async updateAlarmsFromServer() {
        let alarms = await this.props.api.getAlarms();
        console.log(alarms);
        if (alarms == null) {
            this.setState({ alarms: [], newAlarmError: "" });
        } else {
            this.setState({ alarms: alarms, newAlarmError: "" });
        }
    }
    
    async componentWillMount() {
        await this.updateAlarmsFromServer();
    }

    async addAlarm(e) {
        // this.state.alarms
        let splittedTime = this.state.newTime.split(":");
        if (splittedTime.length < 2) { // time wasn't filled out
            this.setState({ newAlarmError: "Time wasn't filled in" });
            return;
        }
        let hour = parseInt(splittedTime[0]);
        let minute = parseInt(splittedTime[1]);
        await this.props.api.addAlarm(
            hour, 
            minute, 
            this.props.selectedColor.r, 
            this.props.selectedColor.g, 
            this.props.selectedColor.b, 
            this.state.newInteractive,
            this.state.newEnabled
        )
        await this.updateAlarmsFromServer();
    }

    updateAlarm(hour, minute, r, g, b, interactive, enabled, id) {
        console.log("Updating alarm")
        this.props.api.updateAlarm(hour, minute, r, g, b, interactive, enabled, id);
        this.setState(state => {
            let index = findAlarmIndexById(state.alarms, id);
            state.alarms[index] = {time: {hour: hour, minute: minute}, color: {r: r, g: g, b: b}, enabled: enabled, interactive: interactive, id: id};
            return state;
        });
        console.log(this.state.alarms);
      }

    onAlarmEnabledToggle(e) {
        let id = parseInt(e.target.getAttribute("data-id"));
        let checked = e.target.checked;
        let oldAlarmIndex = findAlarmIndexById(this.state.alarms, id);
        let oldAlarm = this.state.alarms[oldAlarmIndex];
        this.updateAlarm(
            oldAlarm.time.hour, 
            oldAlarm.time.minute, 
            oldAlarm.color.r,
            oldAlarm.color.g,
            oldAlarm.color.b,
            oldAlarm.interactive,
            checked,
            id
        );
    }

    onAlarmInteractiveToggle(e) {
        let id = parseInt(e.target.getAttribute("data-id"));
        let checked= e.target.checked;
        let oldAlarmIndex = findAlarmIndexById(this.state.alarms, id);
        let oldAlarm = this.state.alarms[oldAlarmIndex];
        this.updateAlarm(
            oldAlarm.time.hour, 
            oldAlarm.time.minute, 
            oldAlarm.color.r,
            oldAlarm.color.g,
            oldAlarm.color.b,
            checked,
            oldAlarm.enabled,
            id
        );
    }

    deleteAlarm(id) {
        this.props.api.deleteAlarm(id);
        this.setState(state => {
            let index = findAlarmIndexById(state.alarms, id);
            state.alarms.splice(index, 1)
            return state;
        });
    }

    updateNewInteractive(e) {
        this.setState({newInteractive: e.target.checked});
    }

    updateNewEnabled(e) {
        this.setState({newEnabled: e.target.checked});
    }

    updateNewTime(e) {
        this.setState({newTime: e.target.value });
    }

    render() {
        let rows = [];
        this.state.alarms.forEach(row => {
            console.log(`rgb(${row.color.r}, ${row.color.g}, ${row.color.b})`);
            rows.push(
                <AlarmRow 
                    key={ row.id } 
                    row={ row } 
                    onAlarmEnabledToggle={ this.onAlarmEnabledToggle } 
                    onAlarmInteractiveToggle={ this.onAlarmInteractiveToggle } 
                    deleteAlarm={ this.deleteAlarm }
                    setSelectedColorAndUpdate={ this.props.setSelectedColorAndUpdate }
                />
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
                <br />
                <div className="AddAlarm">
                    <input type="time" id="newAlarmTime" onChange={ this.updateNewTime } />
                    <div 
                        className="ColorBox" 
                        style={{
                            backgroundColor: `rgb(${this.props.selectedColor.r}, ${this.props.selectedColor.g}, ${this.props.selectedColor.b})`
                        }}
                    />
                    <input type="checkbox" checked={ this.state.newInteractive } onChange={ this.updateNewInteractive } />
                    <input type="checkbox" checked={ this.state.newEnabled } onChange={ this.updateNewEnabled } />
                    <button onClick={ this.addAlarm }>Add new alarm</button>
                </div>
                <Error value={ this.state.newAlarmError } />
            </div>
        );
    }
}

export default Alarms;