(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{100:function(e,t,a){},267:function(e,t,a){"use strict";a.r(t);var n=a(0),r=a.n(n),o=a(92),c=a.n(o),l=(a(99),a(4)),i=a(5),s=a(11),d=a(10),u=a(3),h=a(12),p=(a(100),function(e){function t(){return Object(l.a)(this,t),Object(s.a)(this,Object(d.a)(t).apply(this,arguments))}return Object(h.a)(t,e),Object(i.a)(t,[{key:"render",value:function(){var e=this;return r.a.createElement("div",{className:"OnOffControls"},r.a.createElement("button",{onClick:function(){return e.props.onPowerChange(!0)}},"Turn on"),r.a.createElement("button",{onClick:function(){return e.props.onPowerChange(!1)}},"Turn off"))}}]),t}(r.a.Component)),m=a(93),b=["#000000","#FFFFFF","#D0021B","#F5A623","#F8E71C","#7ED321","#93F927","#BD10E0","#9013FE","#4A90E2","#50E3C2"],g=function(e){function t(e){var a;return Object(l.a)(this,t),(a=Object(s.a)(this,Object(d.a)(t).call(this,e))).handleChangeLiveUpdate=a.handleChangeLiveUpdate.bind(Object(u.a)(a)),a.handleColorChange=a.handleColorChange.bind(Object(u.a)(a)),a}return Object(h.a)(t,e),Object(i.a)(t,[{key:"handleChangeLiveUpdate",value:function(e){this.props.setLiveUpdate(e.target.checked)}},{key:"handleColorChange",value:function(e){this.props.onColorChange(e),this.props.liveUpdate&&this.props.updateColor()}},{key:"render",value:function(){return r.a.createElement("div",{className:"ColorControls"},r.a.createElement(m.SketchPicker,{color:this.props.bgColor,onChangeComplete:this.handleColorChange,disableAlpha:!0,width:"95%",presetColors:b}),r.a.createElement("br",null),r.a.createElement("div",{className:"ColorControlsButtons"},r.a.createElement("span",null,r.a.createElement("input",{type:"checkbox",defaultChecked:this.props.liveUpdate,onChange:this.handleChangeLiveUpdate})," Live update "),r.a.createElement("button",{onClick:this.props.updateColor},"Refresh")))}}]),t}(r.a.Component),v=function(e){function t(){return Object(l.a)(this,t),Object(s.a)(this,Object(d.a)(t).apply(this,arguments))}return Object(h.a)(t,e),Object(i.a)(t,[{key:"render",value:function(){var e=this;return r.a.createElement("div",{className:"InteractiveControls"},r.a.createElement("button",{onClick:function(){return e.props.onInteractiveChange(!0)}},"Interactive"),r.a.createElement("button",{onClick:function(){return e.props.onInteractiveChange(!1)}},"Non-interactive"))}}]),t}(r.a.Component),C=a(13),f=a.n(C),E=a(20),w=a(26),k=a.n(w);function A(e,t){for(var a=e.length,n=0;n<a;n++)if(e[n].id===t)return n}function O(e){return""===e.value?null:r.a.createElement("div",{class:"Error"},e.value)}function j(e){var t=e.row;return r.a.createElement("tr",null,r.a.createElement("td",{align:"left"},"".concat(("0"+t.time.hour).slice(-2),":").concat(("0"+t.time.minute).slice(-2))),r.a.createElement("td",{align:"middle"},r.a.createElement("div",{className:"ColorBox",style:{backgroundColor:"rgb(".concat(t.color.r,", ").concat(t.color.g,", ").concat(t.color.b,")")},onClick:function(){return e.setSelectedColorAndUpdate({rgb:{r:t.color.r,g:t.color.g,b:t.color.b}})}})),r.a.createElement("td",{align:"middle"},r.a.createElement(k.a,{id:t.id,checked:t.interactive,onChange:e.onAlarmInteractiveToggle,onColor:"#86d3ff",onHandleColor:"#2693e6",handleDiameter:25,uncheckedIcon:!1,checkedIcon:!0,boxShadow:"0px 1px 5px rgba(0, 0, 0, 0.5)",activeBoxShadow:"0px 0px 1px 10px rgba(0, 0, 0, 0.2)",height:18,width:42})),r.a.createElement("td",{align:"middle"},r.a.createElement(k.a,{id:t.id,checked:t.enabled,onChange:e.onAlarmEnabledToggle,onColor:"#86d3ff",onHandleColor:"#2693e6",handleDiameter:25,uncheckedIcon:!1,checkedIcon:!0,boxShadow:"0px 1px 5px rgba(0, 0, 0, 0.5)",activeBoxShadow:"0px 0px 1px 10px rgba(0, 0, 0, 0.2)",height:18,width:42})),r.a.createElement("td",{align:"right"},r.a.createElement("button",{onClick:function(){return e.deleteAlarm(t.id)}},"Remove")))}var x=function(e){function t(e){var a;return Object(l.a)(this,t),(a=Object(s.a)(this,Object(d.a)(t).call(this,e))).state={alarms:[{time:{hour:9,minute:0},color:{r:80,g:227,b:194},interactive:!1,enabled:!0,id:1},{time:{hour:9,minute:30},color:{r:255,g:147,b:89},interactive:!0,enabled:!0,id:3},{time:{hour:20,minute:0},color:{r:255,g:74,b:0},interactive:!1,enabled:!0,id:4},{time:{hour:21,minute:0},color:{r:255,g:65,b:0},interactive:!1,enabled:!0,id:5},{time:{hour:23,minute:0},color:{r:255,g:50,b:0},interactive:!1,enabled:!0,id:6},{time:{hour:12,minute:59},color:{r:229,g:79,b:79},interactive:!0,enabled:!0,id:7},{time:{hour:12,minute:52},color:{r:255,g:255,b:255},interactive:!1,enabled:!0,id:8},{time:{hour:4,minute:1},color:{r:76,g:27,b:27},interactive:!1,enabled:!0,id:9},{time:{hour:4,minute:1},color:{r:76,g:27,b:27},interactive:!1,enabled:!0,id:10}],newTime:"",newInteractive:!1,newEnabled:!0,newAlarmError:""},a.addAlarm=a.addAlarm.bind(Object(u.a)(a)),a.updateAlarm=a.updateAlarm.bind(Object(u.a)(a)),a.onAlarmEnabledToggle=a.onAlarmEnabledToggle.bind(Object(u.a)(a)),a.onAlarmInteractiveToggle=a.onAlarmInteractiveToggle.bind(Object(u.a)(a)),a.deleteAlarm=a.deleteAlarm.bind(Object(u.a)(a)),a.updateNewInteractive=a.updateNewInteractive.bind(Object(u.a)(a)),a.updateNewEnabled=a.updateNewEnabled.bind(Object(u.a)(a)),a.updateNewTime=a.updateNewTime.bind(Object(u.a)(a)),a}return Object(h.a)(t,e),Object(i.a)(t,[{key:"updateAlarmsFromServer",value:function(){var e=Object(E.a)(f.a.mark(function e(){var t;return f.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,this.props.api.getAlarms();case 2:t=e.sent,console.log(t),null==t?this.setState({alarms:[],newAlarmError:""}):this.setState({alarms:t,newAlarmError:""});case 5:case"end":return e.stop()}},e,this)}));return function(){return e.apply(this,arguments)}}()},{key:"componentWillMount",value:function(){var e=Object(E.a)(f.a.mark(function e(){return f.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,this.updateAlarmsFromServer();case 2:case"end":return e.stop()}},e,this)}));return function(){return e.apply(this,arguments)}}()},{key:"addAlarm",value:function(){var e=Object(E.a)(f.a.mark(function e(t){var a,n,r;return f.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:if(!((a=this.state.newTime.split(":")).length<2)){e.next=4;break}return this.setState({newAlarmError:"Time wasn't filled in"}),e.abrupt("return");case 4:return n=parseInt(a[0]),r=parseInt(a[1]),e.next=8,this.props.api.addAlarm(n,r,this.props.selectedColor.r,this.props.selectedColor.g,this.props.selectedColor.b,this.state.newInteractive,this.state.newEnabled);case 8:return e.next=10,this.updateAlarmsFromServer();case 10:case"end":return e.stop()}},e,this)}));return function(t){return e.apply(this,arguments)}}()},{key:"updateAlarm",value:function(e,t,a,n,r,o,c,l){console.log("Updating alarm"),this.props.api.updateAlarm(e,t,a,n,r,o,c,l),this.setState(function(i){var s=A(i.alarms,l);return i.alarms[s]={time:{hour:e,minute:t},color:{r:a,g:n,b:r},enabled:c,interactive:o,id:l},i})}},{key:"onAlarmEnabledToggle",value:function(e,t,a){var n=A(this.state.alarms,a),r=this.state.alarms[n];this.updateAlarm(r.time.hour,r.time.minute,r.color.r,r.color.g,r.color.b,r.interactive,e,a)}},{key:"onAlarmInteractiveToggle",value:function(e,t,a){var n=A(this.state.alarms,a),r=this.state.alarms[n];this.updateAlarm(r.time.hour,r.time.minute,r.color.r,r.color.g,r.color.b,e,r.enabled,a)}},{key:"deleteAlarm",value:function(e){this.props.api.deleteAlarm(e),this.setState(function(t){var a=A(t.alarms,e);return t.alarms.splice(a,1),t})}},{key:"updateNewInteractive",value:function(e){this.setState({newInteractive:e})}},{key:"updateNewEnabled",value:function(e){this.setState({newEnabled:e})}},{key:"updateNewTime",value:function(e){this.setState({newTime:e.target.value})}},{key:"render",value:function(){var e=this,t=[];return this.state.alarms.forEach(function(a){t.push(r.a.createElement(j,{key:a.id,row:a,onAlarmEnabledToggle:e.onAlarmEnabledToggle,onAlarmInteractiveToggle:e.onAlarmInteractiveToggle,deleteAlarm:e.deleteAlarm,setSelectedColorAndUpdate:e.props.setSelectedColorAndUpdate}))}),r.a.createElement("div",{className:"Alarms"},r.a.createElement("table",null,r.a.createElement("thead",null,r.a.createElement("tr",null,r.a.createElement("th",{align:"left"},"Time"),r.a.createElement("th",null,"Color"),r.a.createElement("th",null,"Interactive"),r.a.createElement("th",null,"Enabled"))),r.a.createElement("tbody",null,t,r.a.createElement("tr",null,r.a.createElement("td",null,r.a.createElement("input",{type:"time",id:"newAlarmTime",onChange:this.updateNewTime})),r.a.createElement("td",{align:"middle"},r.a.createElement("div",{className:"ColorBox",style:{backgroundColor:"rgb(".concat(this.props.selectedColor.r,", ").concat(this.props.selectedColor.g,", ").concat(this.props.selectedColor.b,")")}})),r.a.createElement("td",{align:"middle"},r.a.createElement(k.a,{checked:this.state.newInteractive,onChange:this.updateNewInteractive,onColor:"#86d3ff",onHandleColor:"#2693e6",handleDiameter:25,uncheckedIcon:!1,checkedIcon:!0,boxShadow:"0px 1px 5px rgba(0, 0, 0, 0.5)",activeBoxShadow:"0px 0px 1px 10px rgba(0, 0, 0, 0.2)",height:18,width:42})),r.a.createElement("td",{align:"middle"},r.a.createElement(k.a,{checked:this.state.newEnabled,onChange:this.updateNewEnabled,onColor:"#86d3ff",onHandleColor:"#2693e6",handleDiameter:25,uncheckedIcon:!1,checkedIcon:!0,boxShadow:"0px 1px 5px rgba(0, 0, 0, 0.5)",activeBoxShadow:"0px 0px 1px 10px rgba(0, 0, 0, 0.2)",height:18,width:42})),r.a.createElement("td",{align:"right"},r.a.createElement("button",{onClick:this.addAlarm},"Add new alarm"))))),r.a.createElement(O,{value:this.state.newAlarmError}))}}]),t}(r.a.Component),y=function(e){function t(){return Object(l.a)(this,t),Object(s.a)(this,Object(d.a)(t).apply(this,arguments))}return Object(h.a)(t,e),Object(i.a)(t,[{key:"render",value:function(){return r.a.createElement("div",{className:"View"},r.a.createElement("h1",null,"Controls"),r.a.createElement(p,{onPowerChange:this.props.onPowerChange}),r.a.createElement(v,{onInteractiveChange:this.props.onInteractiveChange}),r.a.createElement(g,{bgColor:this.props.bgColor,onColorChange:this.props.onColorChange,updateColor:this.props.updateColor,liveUpdate:this.props.liveUpdate,setLiveUpdate:this.props.setLiveUpdate}),r.a.createElement("h1",null,"Alarms"),r.a.createElement(x,{selectedColor:this.props.bgColor,api:this.props.api,setSelectedColorAndUpdate:this.props.setSelectedColorAndUpdate,updateColor:this.props.updateColor}))}}]),t}(r.a.Component),U=function(){function e(t){Object(l.a)(this,e),this.baseUrl=t}return Object(i.a)(e,[{key:"turnOn",value:function(){fetch("".concat(this.baseUrl,"/turnOn")).catch(function(e){console.err(e)})}},{key:"turnOff",value:function(){fetch("".concat(this.baseUrl,"/turnOff")).catch(function(e){console.err(e)})}},{key:"setBgColor",value:function(e){fetch("".concat(this.baseUrl,"/bgColor?r=").concat(e.r,"&g=").concat(e.g,"&b=").concat(e.b)).catch(function(e){console.err(e)})}},{key:"setInteractive",value:function(){fetch("".concat(this.baseUrl,"/interactiveLight")).catch(function(e){console.err(e)})}},{key:"setReadingLight",value:function(){fetch("".concat(this.baseUrl,"/readingLight")).catch(function(e){console.err(e)})}},{key:"addAlarm",value:function(){var e=Object(E.a)(f.a.mark(function e(t,a,n,r,o,c,l){return f.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.abrupt("return",fetch("".concat(this.baseUrl,"/addAlarm?hour=").concat(t,"&minute=").concat(a,"&r=").concat(n,"&g=").concat(r,"&b=").concat(o,"&enabled=").concat(l?1:0,"&interactive=").concat(c?1:0)).catch(function(e){console.err(e)}));case 1:case"end":return e.stop()}},e,this)}));return function(t,a,n,r,o,c,l){return e.apply(this,arguments)}}()},{key:"deleteAlarm",value:function(e){fetch("".concat(this.baseUrl,"/deleteAlarm?id=").concat(e)).catch(function(e){console.err(e)})}},{key:"getAlarms",value:function(){var e=Object(E.a)(f.a.mark(function e(){var t,a;return f.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,fetch("".concat(this.baseUrl,"/getAlarms"));case 2:return t=e.sent,e.next=5,t.json();case 5:return a=e.sent,e.abrupt("return",a);case 7:case"end":return e.stop()}},e,this)}));return function(){return e.apply(this,arguments)}}()},{key:"updateAlarm",value:function(e,t,a,n,r,o,c,l){fetch("".concat(this.baseUrl,"/updateAlarm?hour=").concat(e,"&minute=").concat(t,"&r=").concat(a,"&g=").concat(n,"&b=").concat(r,"&enabled=").concat(c?1:0,"&interactive=").concat(o?1:0,"&id=").concat(l)).catch(function(e){console.err(e)})}}]),e}(),I=function(e){function t(e){var a;return Object(l.a)(this,t),(a=Object(s.a)(this,Object(d.a)(t).call(this))).state={bgColor:{r:255,g:255,b:255},turnedOn:!0,interactiveMode:!0,liveUpdate:!1},a.handlePowerChange=a.handlePowerChange.bind(Object(u.a)(a)),a.handleColorChange=a.handleColorChange.bind(Object(u.a)(a)),a.handleInteractiveChange=a.handleInteractiveChange.bind(Object(u.a)(a)),a.updateColor=a.updateColor.bind(Object(u.a)(a)),a.setLiveUpdate=a.setLiveUpdate.bind(Object(u.a)(a)),a.setSelectedColorAndUpdate=a.setSelectedColorAndUpdate.bind(Object(u.a)(a)),a.api=new U(window.location.origin),a}return Object(h.a)(t,e),Object(i.a)(t,[{key:"handlePowerChange",value:function(e){console.log("Turning ".concat(e?"on":"off")),this.setState({turnedOn:e}),e?this.api.turnOn():this.api.turnOff()}},{key:"handleColorChange",value:function(e){console.log("Setting color to",e),this.setState({bgColor:{r:e.rgb.r,g:e.rgb.g,b:e.rgb.b}})}},{key:"setSelectedColorAndUpdate",value:function(e){var t=this;this.setState({bgColor:{r:e.rgb.r,g:e.rgb.g,b:e.rgb.b}},function(){t.state.liveUpdate&&t.updateColor()})}},{key:"handleInteractiveChange",value:function(e){console.log("Turning interactive ".concat(e?"on":"off")),this.setState({interactiveMode:e}),e?this.api.setInteractive():this.api.setReadingLight()}},{key:"updateColor",value:function(){console.log("Pushing color to API",this.state.bgColor),this.api.setBgColor(this.state.bgColor)}},{key:"setLiveUpdate",value:function(e){this.setState({liveUpdate:e})}},{key:"render",value:function(){return r.a.createElement("div",{className:"App"},r.a.createElement(y,{turnedOn:this.state.turnedOn,bgColor:this.state.bgColor,interactiveMode:this.state.interactiveMode,onPowerChange:this.handlePowerChange,onColorChange:this.handleColorChange,onInteractiveChange:this.handleInteractiveChange,updateColor:this.updateColor,api:this.api,liveUpdate:this.state.liveUpdate,setLiveUpdate:this.setLiveUpdate,setSelectedColorAndUpdate:this.setSelectedColorAndUpdate}))}}]),t}(r.a.Component);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));c.a.render(r.a.createElement(I,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(e){e.unregister()})},94:function(e,t,a){e.exports=a(267)},99:function(e,t,a){}},[[94,1,2]]]);
//# sourceMappingURL=main.24141f41.chunk.js.map