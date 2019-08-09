package alarms

import (
	"encoding/json"
	"errors"
	"fmt"
	"log"
)

type AlarmManager struct {
	alarms []Alarm
}

type Alarm struct {
	Time        Time  `json:"time"`
	Color       Color `json:"color"`
	Interactive bool  `json:"interactive"`
	Enabled     bool  `json:"enabled"`
	Id          int   `json:"id"`
}

type Time struct {
	Hour   int `json:"hour"`
	Minute int `json:"minute"`
}

type Color struct {
	R int `json:"r"`
	G int `json:"g"`
	B int `json:"b"`
}

func (a *AlarmManager) AddAlarm(hour, minute, r, g, b int, interactive, enabled bool) {
	var newID int
	alarms := len(a.alarms)
	if alarms == 0 {
		newID = 1
	} else {
		newID = a.alarms[alarms-1].Id + 1 // Previous ID + 1 (guaranteed to be an unique ID as long as we can't re-order alarms)
	}

	newAlarm := Alarm{
		Time:        Time{hour, minute},
		Color:       Color{r, g, b},
		Enabled:     enabled,
		Interactive: interactive,
		Id:          newID,
	}
	a.alarms = append(a.alarms, newAlarm)
}

func (a *AlarmManager) UpdateAlarm(hour, minute, r, g, b int, interactive, enabled bool, id int) {
	newAlarm := Alarm{
		Time:        Time{hour, minute},
		Color:       Color{r, g, b},
		Enabled:     enabled,
		Interactive: interactive,
		Id:          id,
	}
	nalarms := len(a.alarms)
	for (i := 0; i < nalarms; i++) {
		if (a.alarms[i].Id == id) {
			a.alarms[i] = newAlarm
			return;
		}
	}
	return errors.New(fmt.Sprintf("Trying to update invalid ID: %d", id))
}

func (a *AlarmManager) DeleteAlarm(id int) error {
	nalarms := len(a.alarms)
	for i := 0; i < nalarms; i++ {
		if a.alarms[i].Id == id {
			a.alarms = append(a.alarms[:i], a.alarms[i+1:]...)
			return nil
		}
	}
	return errors.New(fmt.Sprintf("Trying to delete invalid ID: %d", id))
}

func (a *AlarmManager) GetJson() ([]byte, error) {
	return json.Marshal(a.alarms)
}
