import React from 'react';
import Switch from 'react-switch';

function findAlarmIndexById(alarms, id) {
    let nalarms = alarms.length
    for (let i = 0; i < nalarms; i++) {
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
            <td align="left" className="TimeView">
                { `${('0' + row.time.hour).slice(-2)}:${('0' + row.time.minute).slice(-2)}` }
            </td>
            <td align="middle">
                <div 
                    className="ColorBox" 
                    style={{
                        backgroundColor: `rgb(${row.color.r}, ${row.color.g}, ${row.color.b})`,
                    }}
                    onClick={ () => props.setSelectedColorAndUpdate({rgb: {r: row.color.r, g: row.color.g, b: row.color.b}}) }
                />
            </td>
            <td align="middle">
                {/* <input type="checkbox" data-id={ row.id } checked={row.interactive} onChange={ props.onAlarmInteractiveToggle }/> */}
                <Switch 
                    id={ row.id } 
                    checked={ row.interactive } 
                    onChange={ props.onAlarmInteractiveToggle }
                    onColor="#86d3ff"
                    onHandleColor="#2693e6"
                    handleDiameter={25}
                    uncheckedIcon={false}
                    checkedIcon={true}
                    boxShadow="0px 1px 5px rgba(0, 0, 0, 0.5)"
                    activeBoxShadow="0px 0px 1px 10px rgba(0, 0, 0, 0.2)"
                    height={18}
                    width={42}
                />
            </td>
            <td align="middle">
                {/* <input type="checkbox" data-id={ row.id } checked={row.enabled} onChange={ props.onAlarmEnabledToggle }/> */}
                <Switch 
                    id={ row.id } 
                    checked={ row.enabled } 
                    onChange={ props.onAlarmEnabledToggle } 
                    onColor="#86d3ff"
                    onHandleColor="#2693e6"
                    handleDiameter={25}
                    uncheckedIcon={false}
                    checkedIcon={true}
                    boxShadow="0px 1px 5px rgba(0, 0, 0, 0.5)"
                    activeBoxShadow="0px 0px 1px 10px rgba(0, 0, 0, 0.2)"
                    height={18}
                    width={42}
                />
            </td>
            <td align="right">
                <button onClick={ () => props.deleteAlarm(row.id) }>Remove</button>
            </td>
        </tr>
    );
}

// class Alarm extends React.Component {
//     render() {
//         return (
//             <div className="Alarm">

//             </div>
//         );
//     }
// }

class NewAlarmInput extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            newTime: "",
            newInteractive: false,
            newEnabled: true,
            newAlarmError: "",
        }

        this.updateNewInteractive = this.updateNewInteractive.bind(this);
        this.updateNewEnabled = this.updateNewEnabled.bind(this);
        this.updateNewTime = this.updateNewTime.bind(this);
        this.addAlarm = this.addAlarm.bind(this);
    }

    async addAlarm() {
        let splittedTime = this.state.newTime.split(":");
        if (splittedTime.length < 2) { // time wasn't filled out
            this.props.setNewAlarmError("Time wasn't filled in");
            return;
        }
        let hour = parseInt(splittedTime[0]);
        let minute = parseInt(splittedTime[1]);
        await this.props.addAlarm(
            hour, 
            minute, 
            this.props.selectedColor.r, 
            this.props.selectedColor.g, 
            this.props.selectedColor.b, 
            this.state.newInteractive,
            this.state.newEnabled
        )
    }

    updateNewInteractive(checked) {
        this.setState({newInteractive: checked});
    }

    updateNewEnabled(checked) {
        this.setState({newEnabled: checked});
    }

    updateNewTime(e) {
        this.setState({newTime: e.target.value });
    }

    render() {
        return (
            <tr>
                <td>
                    <input type="time" id="newAlarmTime" onChange={ this.updateNewTime } />
                </td>
                <td align="middle">
                    <div 
                        className="ColorBox" 
                        style={{
                            backgroundColor: `rgb(${this.props.selectedColor.r}, ${this.props.selectedColor.g}, ${this.props.selectedColor.b})`
                        }}
                    />
                </td>
                <td align="middle">
                    <Switch 
                        checked={ this.state.newInteractive } 
                        onChange={ this.updateNewInteractive } 
                        onColor="#86d3ff"
                        onHandleColor="#2693e6"
                        handleDiameter={25}
                        uncheckedIcon={false}
                        checkedIcon={true}
                        boxShadow="0px 1px 5px rgba(0, 0, 0, 0.5)"
                        activeBoxShadow="0px 0px 1px 10px rgba(0, 0, 0, 0.2)"
                        height={18}
                        width={42}
                    />
                </td>
                <td align="middle">
                    <Switch 
                        checked={ this.state.newEnabled } 
                        onChange={ this.updateNewEnabled } 
                        onColor="#86d3ff"
                        onHandleColor="#2693e6"
                        handleDiameter={25}
                        uncheckedIcon={false}
                        checkedIcon={true}
                        boxShadow="0px 1px 5px rgba(0, 0, 0, 0.5)"
                        activeBoxShadow="0px 0px 1px 10px rgba(0, 0, 0, 0.2)"
                        height={18}
                        width={42}
                    />
                </td>
                <td align="right">
                    <button onClick={ this.addAlarm }>Add new alarm</button>
                </td>
            </tr>
        );
    }
}

class Alarms extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            // alarms: [],
            alarms: [{"time":{"hour":9,"minute":0},"color":{"r":80,"g":227,"b":194},"interactive":false,"enabled":true,"id":1},{"time":{"hour":9,"minute":30},"color":{"r":255,"g":147,"b":89},"interactive":true,"enabled":true,"id":3},{"time":{"hour":20,"minute":0},"color":{"r":255,"g":74,"b":0},"interactive":false,"enabled":true,"id":4},{"time":{"hour":21,"minute":0},"color":{"r":255,"g":65,"b":0},"interactive":false,"enabled":true,"id":5},{"time":{"hour":23,"minute":0},"color":{"r":255,"g":50,"b":0},"interactive":false,"enabled":true,"id":6},{"time":{"hour":12,"minute":59},"color":{"r":229,"g":79,"b":79},"interactive":true,"enabled":true,"id":7},{"time":{"hour":12,"minute":52},"color":{"r":255,"g":255,"b":255},"interactive":false,"enabled":true,"id":8},{"time":{"hour":4,"minute":1},"color":{"r":76,"g":27,"b":27},"interactive":false,"enabled":true,"id":9},{"time":{"hour":4,"minute":1},"color":{"r":76,"g":27,"b":27},"interactive":false,"enabled":true,"id":10}],
            newAlarmError: ""
        }

        this.addAlarm = this.addAlarm.bind(this);
        this.updateAlarm = this.updateAlarm.bind(this);
        this.onAlarmEnabledToggle = this.onAlarmEnabledToggle.bind(this);
        this.onAlarmInteractiveToggle = this.onAlarmInteractiveToggle.bind(this);
        this.deleteAlarm = this.deleteAlarm.bind(this);
        this.setNewAlarmError = this.setNewAlarmError.bind(this);
    }

    setNewAlarmError(message) {
        this.setState({newAlarmError: message});
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

    async addAlarm(hour, minute, r, g, b, interactive, enabled) {
        await this.props.api.addAlarm(
            hour, 
            minute, 
            r,
            g,
            b,
            interactive,
            enabled
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
    }

    onAlarmEnabledToggle(checked, _, id) {
        // let id = parseInt(e.target.getAttribute("data-id"));
        // let checked = e.target.checked;
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

    onAlarmInteractiveToggle(checked, _, id) {
        // let id = parseInt(e.target.getAttribute("data-id"));
        // let checked= e.target.checked;
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

    render() {
        let rows = [];
        console.log("Sorting!");
        this.state
            .alarms
            .sort((a, b) => {
                if (a.time.hour > b.time.hour) return true;
                if (a.time.hour === b.time.hour) {
                    return a.time.minute >= b.time.minute;
                }
                return false;
            })
            .forEach(row => {
                rows.push(
                    <AlarmRow 
                        key={ row.id } 
                        row={ row } 
                        onAlarmEnabledToggle={ this.onAlarmEnabledToggle } 
                        onAlarmInteractiveToggle={ this.onAlarmInteractiveToggle } 
                        deleteAlarm={ this.deleteAlarm }
                        setSelectedColorAndUpdate={ this.props.setSelectedColorAndUpdate }
                    />
                    // <li>
                    //     <Alarm
                    //         key={ row.id } 
                    //         row={ row } 
                    //         onAlarmEnabledToggle={ this.onAlarmEnabledToggle } 
                    //         onAlarmInteractiveToggle={ this.onAlarmInteractiveToggle } 
                    //         deleteAlarm={ this.deleteAlarm }
                    //         setSelectedColorAndUpdate={ this.props.setSelectedColorAndUpdate }
                    //     />
                    // </li>
                )
            });

        return (
            <div className="Alarms">
                <table>
                    <thead>
                        <tr>
                            <th align="left">Time</th>
                            <th>Color</th>
                            <th>Interactive</th>
                            <th>Enabled</th> 
                        </tr>
                    </thead>
                    <tbody>
                        { rows }
                        <NewAlarmInput 
                            selectedColor={ this.props.selectedColor }
                            addAlarm={ this.addAlarm }
                            setNewAlarmError={ this.setNewAlarmError }    
                        />
                    </tbody>
                </table>
                <Error value={ this.state.newAlarmError } />
            </div>
        );
    }
}

export default Alarms;