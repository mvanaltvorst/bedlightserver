package alarms

import (
	"encoding/json"
	"errors"
	"fmt"
	"time"
	"log"
	"os"
	"io/ioutil"
	"github.com/mvanaltvorst/bedlightserver/types"
)

const ALARM_FILE = "/storedAlarms/alarms.json";

func genFileIfNotExists() {
	os.OpenFile(ALARM_FILE, os.O_RDONLY|os.O_CREATE, 0666)
}

func (a *AlarmManager) saveAlarms() {
	js, err := a.GetJson()
	if err != nil {
		log.Println(err)
	}
	ioutil.WriteFile(ALARM_FILE, js, 0644)
}

func (a *AlarmManager) readAlarms() {
	file, err := ioutil.ReadFile(ALARM_FILE)
	if err != nil {
		log.Fatal(err)
	}
	err = json.Unmarshal([]byte(file), &a.alarms)
	if err != nil {
		log.Println(err)
		log.Println("Probably empty file")
	}
}

func NewAlarmManager(d chan Alarm) AlarmManager {
	genFileIfNotExists()
	a := AlarmManager{
		make([]Alarm, 0),
		make(chan struct{}),
		d,
	}
	a.readAlarms()
	return a
}

type AlarmManager struct {
	alarms []Alarm
	newAlarm chan struct{}
	d chan Alarm
}

type Alarm struct {
	Time        Time  `json:"time"`
	Color       types.Color `json:"color"`
	Interactive bool  `json:"interactive"`
	Enabled     bool  `json:"enabled"`
	Id          int   `json:"id"`
}

type Time struct {
	Hour   int `json:"hour"`
	Minute int `json:"minute"`
}

func (a *AlarmManager) HasAlarm(t time.Time) bool {
	for _, alarm := range a.alarms {
		if alarm.Time.Hour == t.Hour() && alarm.Time.Minute == t.Minute() { return true }
	}
	return false
}


func (a *AlarmManager) AddAlarm(hour, minute int, r, g, b byte, interactive, enabled bool) {
	var newID int
	alarms := len(a.alarms)
	if alarms == 0 {
		newID = 1
	} else {
		newID = a.alarms[alarms-1].Id + 1 // Previous ID + 1 (guaranteed to be an unique ID as long as we can't re-order alarms)
	}

	newAlarm := Alarm{
		Time:        Time{hour, minute},
		Color:       types.Color{r, g, b},
		Enabled:     enabled,
		Interactive: interactive,
		Id:          newID,
	}
	a.alarms = append(a.alarms, newAlarm)
	go a.saveAlarms()
	a.newAlarm<-struct{}{}
}

func (a *AlarmManager) UpdateAlarm(hour, minute int, r, g, b byte, interactive, enabled bool, id int) error {
	newAlarm := Alarm{
		Time:        Time{hour, minute},
		Color:       types.Color{r, g, b},
		Enabled:     enabled,
		Interactive: interactive,
		Id:          id,
	}
	nalarms := len(a.alarms)
	for i := 0; i < nalarms; i++ {
		if (a.alarms[i].Id == id) {
			a.alarms[i] = newAlarm
			a.newAlarm<-struct{}{}
			return nil;
		}
	}
	go a.saveAlarms()
	return errors.New(fmt.Sprintf("Trying to update invalid ID: %d", id))
}

func (a *AlarmManager) DeleteAlarm(id int) error {
	nalarms := len(a.alarms)
	for i := 0; i < nalarms; i++ {
		if a.alarms[i].Id == id {
			a.alarms = append(a.alarms[:i], a.alarms[i+1:]...)
			a.newAlarm<-struct{}{}
			return nil
		}
	}
	go a.saveAlarms()
	return errors.New(fmt.Sprintf("Trying to delete invalid ID: %d", id))
}

func (a *AlarmManager) GetJson() ([]byte, error) {
	return json.Marshal(a.alarms)
}

func (a *AlarmManager) FindNextAlarm() (Alarm, time.Duration) {
	t := time.Now();
	smallestDiff := 24 * time.Hour
	var nextAlarm Alarm
	smallestAbsoluteTime := 24 * 60
	var smallestAlarm Alarm
	for _, alarm := range a.alarms {
		// func Date(year int, month Month, day, hour, min, sec, nsec int, loc *Location) Time
		if !alarm.Enabled { continue }
		e := time.Date(t.Year(), t.Month(), t.Day(), alarm.Time.Hour, alarm.Time.Minute, 0, 0, t.Location())
		diff := e.Sub(t)
		if diff > 0 && diff < smallestDiff {
			smallestDiff = diff
			nextAlarm = alarm
		}
		absoluteTime := 60*alarm.Time.Hour + alarm.Time.Minute
		if absoluteTime < smallestAbsoluteTime {
			smallestAbsoluteTime = absoluteTime
			smallestAlarm = alarm
		}
	}

	if smallestDiff == 24*time.Hour {
		endOfDay := time.Date(t.Year(), t.Month(), t.Day(), 24, 0, 0, 0, t.Location())
		smallestDiff := endOfDay.Sub(t) + time.Duration(smallestAlarm.Time.Hour) * time.Hour + time.Duration(smallestAlarm.Time.Minute) * time.Minute
		return smallestAlarm, smallestDiff
	}

	return nextAlarm, smallestDiff
}

func (a *AlarmManager) Watch() {
	for {
		nextAlarm, timeUntil := a.FindNextAlarm()
		if timeUntil == 24*time.Hour {
			log.Println("Waiting forever until newAlarm")
			<-a.newAlarm
			continue
		}
		log.Println("Next alarm: ", nextAlarm.Time.Hour, ":", nextAlarm.Time.Minute)
		timer := time.NewTimer(timeUntil)
		select {
		case <-a.newAlarm:
			timer.Stop()
			continue
		case <-timer.C:
			a.d <- nextAlarm
		}
	}
}
