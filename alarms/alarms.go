package alarms

struct AlarmHandler {
	alarms Alarm[]
}

struct Alarm {
	time Time
	color Color
	enabled bool
}

struct Time {
	hour int
	minute int
}

struct Color {
	r int
	g int
	b int
}

func (a *AlarmHandler) addAlarm(hour, minute, r, g, b int, enabled bool) {
	newAlarm := Alarm{
		time: Time{hour, minute},
		color: Color{r, g, b},
		enabled: enabled
	}
	a.alarms = append(a.alarms, newAlarm)
}