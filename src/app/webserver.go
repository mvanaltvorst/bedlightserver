package main

import (
	"log"
	"net/http"
	"strconv"

	"github.com/mvanaltvorst/bedlightserver/alarms"
	"github.com/mvanaltvorst/bedlightserver/types"
)

var alarmManager *alarms.AlarmManager

func webserverManager(a *alarms.AlarmManager) {
	alarmManager = a
	fs := http.FileServer(http.Dir("/static"))
	http.Handle("/static/", http.StripPrefix("/static/", fs))
	http.HandleFunc("/", redirect)
	http.HandleFunc("/turnOn", turnOnHandler)
	http.HandleFunc("/turnOff", turnOffHandler)
	http.HandleFunc("/readingLight", readingLightHandler)
	http.HandleFunc("/interactiveLight", interactiveLightHandler)
	http.HandleFunc("/bgColor", bgColorHandler)
	http.HandleFunc("/addAlarm", addAlarmHandler)
	http.HandleFunc("/deleteAlarm", deleteAlarmHandler)
	http.HandleFunc("/getAlarms", getAlarmsHandler)
	http.HandleFunc("/updateAlarm", updateAlarmHandler)

	log.Fatal(http.ListenAndServe("0.0.0.0:8080", nil))
}

func redirect(w http.ResponseWriter, r *http.Request) {

    http.Redirect(w, r, "http://www.google.com", 301)
}

func addAlarmHandler(w http.ResponseWriter, r *http.Request) {
	log.Println("Adding alarm")
	reds, ok := r.URL.Query()["r"]
	if !ok || len(reds[0]) < 1 {
		http.Error(w, "Didn't get red param", http.StatusInternalServerError)
		return
	}
	greens, ok := r.URL.Query()["g"]
	if !ok || len(greens[0]) < 1 {
		http.Error(w, "Didn't get green param", http.StatusInternalServerError)
		return
	}
	blues, ok := r.URL.Query()["b"]
	if !ok || len(blues[0]) < 1 {
		http.Error(w, "Didn't get blue param", http.StatusInternalServerError)
		return
	}

	hours, ok := r.URL.Query()["hour"]
	if !ok || len(hours[0]) < 1 {
		http.Error(w, "Didn't get hour param", http.StatusInternalServerError)
		return
	}
	minutes, ok := r.URL.Query()["minute"]
	if !ok || len(minutes[0]) < 1 {
		http.Error(w, "Didn't get minute param", http.StatusInternalServerError)
		return
	}
	interactives, ok := r.URL.Query()["interactive"]
	if !ok || len(interactives[0]) < 1 {
		http.Error(w, "Didn't get interactive param", http.StatusInternalServerError)
		return
	}
	enableds, ok := r.URL.Query()["enabled"]
	if !ok || len(enableds[0]) < 1 {
		http.Error(w, "Didn't get enabled param", http.StatusInternalServerError)
		return
	}

	red, err := strconv.Atoi(reds[0])
	if err != nil {
		http.Error(w, "Red is not an integer", http.StatusInternalServerError)
		return
	}
	green, err := strconv.Atoi(greens[0])
	if err != nil {
		http.Error(w, "Green is not an integer", http.StatusInternalServerError)
		return
	}
	blue, err := strconv.Atoi(blues[0])
	if err != nil {
		http.Error(w, "Blue is not an integer", http.StatusInternalServerError)
		return
	}
	hour, err := strconv.Atoi(hours[0])
	if err != nil {
		http.Error(w, "Hour is not an integer", http.StatusInternalServerError)
		return
	}
	minute, err := strconv.Atoi(minutes[0])
	if err != nil {
		http.Error(w, "Minute is not an integer", http.StatusInternalServerError)
		return
	}
	interactive, err := strconv.Atoi(interactives[0])
	if err != nil {
		http.Error(w, "Interactive is not an integer", http.StatusInternalServerError)
		return
	}
	enabled, err := strconv.Atoi(enableds[0])
	if err != nil {
		http.Error(w, "Enabled is not an integer", http.StatusInternalServerError)
		return
	}

	if red < 0 || red > 255 {
		http.Error(w, "Red is not in range 0-255", http.StatusInternalServerError)
		return
	}
	if green < 0 || green > 255 {
		http.Error(w, "Green is not in range 0-255", http.StatusInternalServerError)
		return
	}
	if blue < 0 || blue > 255 {
		http.Error(w, "Blue is not in range 0-255", http.StatusInternalServerError)
		return
	}
	if hour < 0 || hour > 24 {
		http.Error(w, "Hour is not in range 0-24", http.StatusInternalServerError)
		return
	}
	if minute < 0 || minute > 60 {
		http.Error(w, "Minute is not in range 0-60", http.StatusInternalServerError)
		return
	}
	if interactive < 0 || interactive > 1 {
		http.Error(w, "Interactive is not in 0, 1", http.StatusInternalServerError)
		return
	}
	if enabled < 0 || enabled > 1 {
		http.Error(w, "Hour is not in 0, 1", http.StatusInternalServerError)
		return
	}

	alarmManager.AddAlarm(hour, minute, byte(red), byte(green), byte(blue), interactive != 0, enabled != 0)
}

func updateAlarmHandler(w http.ResponseWriter, r *http.Request) {
	log.Println("Adding alarm")
	reds, ok := r.URL.Query()["r"]
	if !ok || len(reds[0]) < 1 {
		http.Error(w, "Didn't get red param", http.StatusInternalServerError)
		return
	}
	greens, ok := r.URL.Query()["g"]
	if !ok || len(greens[0]) < 1 {
		http.Error(w, "Didn't get green param", http.StatusInternalServerError)
		return
	}
	blues, ok := r.URL.Query()["b"]
	if !ok || len(blues[0]) < 1 {
		http.Error(w, "Didn't get blue param", http.StatusInternalServerError)
		return
	}

	hours, ok := r.URL.Query()["hour"]
	if !ok || len(hours[0]) < 1 {
		http.Error(w, "Didn't get hour param", http.StatusInternalServerError)
		return
	}
	minutes, ok := r.URL.Query()["minute"]
	if !ok || len(minutes[0]) < 1 {
		http.Error(w, "Didn't get minute param", http.StatusInternalServerError)
		return
	}
	interactives, ok := r.URL.Query()["interactive"]
	if !ok || len(interactives[0]) < 1 {
		http.Error(w, "Didn't get interactive param", http.StatusInternalServerError)
		return
	}
	enableds, ok := r.URL.Query()["enabled"]
	if !ok || len(enableds[0]) < 1 {
		http.Error(w, "Didn't get enabled param", http.StatusInternalServerError)
		return
	}
	ids, ok := r.URL.Query()["id"]
	if !ok || len(enableds[0]) < 1 {
		http.Error(w, "Didn't get id param", http.StatusInternalServerError)
		return
	}

	red, err := strconv.Atoi(reds[0])
	if err != nil {
		http.Error(w, "Red is not an integer", http.StatusInternalServerError)
		return
	}
	green, err := strconv.Atoi(greens[0])
	if err != nil {
		http.Error(w, "Green is not an integer", http.StatusInternalServerError)
		return
	}
	blue, err := strconv.Atoi(blues[0])
	if err != nil {
		http.Error(w, "Blue is not an integer", http.StatusInternalServerError)
		return
	}
	hour, err := strconv.Atoi(hours[0])
	if err != nil {
		http.Error(w, "Hour is not an integer", http.StatusInternalServerError)
		return
	}
	minute, err := strconv.Atoi(minutes[0])
	if err != nil {
		http.Error(w, "Minute is not an integer", http.StatusInternalServerError)
		return
	}
	interactive, err := strconv.Atoi(interactives[0])
	if err != nil {
		http.Error(w, "Interactive is not an integer", http.StatusInternalServerError)
		return
	}
	enabled, err := strconv.Atoi(enableds[0])
	if err != nil {
		http.Error(w, "Enabled is not an integer", http.StatusInternalServerError)
		return
	}
	id, err := strconv.Atoi(ids[0])
	if err != nil {
		http.Error(w, "ID is not an integer", http.StatusInternalServerError)
		return
	}

	if red < 0 || red > 255 {
		http.Error(w, "Red is not in range 0-255", http.StatusInternalServerError)
		return
	}
	if green < 0 || green > 255 {
		http.Error(w, "Green is not in range 0-255", http.StatusInternalServerError)
		return
	}
	if blue < 0 || blue > 255 {
		http.Error(w, "Blue is not in range 0-255", http.StatusInternalServerError)
		return
	}
	if hour < 0 || hour > 24 {
		http.Error(w, "Hour is not in range 0-24", http.StatusInternalServerError)
		return
	}
	if minute < 0 || minute > 60 {
		http.Error(w, "Minute is not in range 0-60", http.StatusInternalServerError)
		return
	}
	if interactive < 0 || interactive > 1 {
		http.Error(w, "Interactive is not in 0, 1", http.StatusInternalServerError)
		return
	}
	if enabled < 0 || enabled > 1 {
		http.Error(w, "Hour is not in 0, 1", http.StatusInternalServerError)
		return
	}
	if id < 1 {
		http.Error(w, "ID is smaller than 1, should be equal to or greater than", http.StatusInternalServerError)
		return
	}

	err = alarmManager.UpdateAlarm(hour, minute, byte(red), byte(green), byte(blue), interactive != 0, enabled != 0, id)
	if err != nil {
		http.Error(w, "Couldn't find ID", http.StatusInternalServerError)
		return
	}
}

func deleteAlarmHandler(w http.ResponseWriter, r *http.Request) {
	log.Println("Deleting alarm")
	ids, ok := r.URL.Query()["id"]
	if !ok || len(ids[0]) < 1 {
		http.Error(w, "Didn't get ID param", http.StatusInternalServerError)
		return
	}

	id, err := strconv.Atoi(ids[0])
	if err != nil {
		http.Error(w, "ID wasn't an integer", http.StatusInternalServerError)
		return
	}

	err = alarmManager.DeleteAlarm(id)
	if err != nil {
		http.Error(w, "Couldn't find ID", http.StatusInternalServerError)
		return
	}
}


func getAlarmsHandler(w http.ResponseWriter, r *http.Request) {
	js, err := alarmManager.GetJson()
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	w.Header().Set("Content-Type", "application/json")
	w.Write(js)
}

func turnOffHandler(w http.ResponseWriter, r *http.Request) {
	log.Println("Turning on")
	turnedOn = false
	strip.TurnOff()
}

func turnOnHandler(w http.ResponseWriter, r *http.Request) {
	log.Println("Turning off")
	turnedOn = true
	strip.TurnOn()
	updateStripInteractive()
	if globalState == CLEARLIGHT {
		strip.ClearRange(types.Range{0, NUM_LEDS - 1})
		strip.Flush()
	}
}

func readingLightHandler(w http.ResponseWriter, r *http.Request) {
	log.Println("Reading light")
	globalState = CLEARLIGHT
	strip.ClearRange(types.Range{0, NUM_LEDS - 1})
	strip.Flush()
}

func interactiveLightHandler(w http.ResponseWriter, r *http.Request) {
	log.Println("Interactive light")
	globalState = INTERACTIVELIGHT
	updateStripInteractive()
}

func bgColorHandler(w http.ResponseWriter, r *http.Request) {
	log.Println("Setting bg color")

	reds, ok := r.URL.Query()["r"]
	if !ok || len(reds[0]) < 1 {
		http.Error(w, "Didn't get red param", http.StatusInternalServerError)
		return
	}
	greens, ok := r.URL.Query()["g"]
	if !ok || len(greens[0]) < 1 {
		http.Error(w, "Didn't get green param", http.StatusInternalServerError)
		return
	}
	blues, ok := r.URL.Query()["b"]
	if !ok || len(blues[0]) < 1 {
		http.Error(w, "Didn't get blue param", http.StatusInternalServerError)
		return
	}

	red, err := strconv.Atoi(reds[0])
	if err != nil {
		http.Error(w, "Red is not an integer", http.StatusInternalServerError)
		return
	}
	green, err := strconv.Atoi(greens[0])
	if err != nil {
		http.Error(w, "Green is not an integer", http.StatusInternalServerError)
		return
	}
	blue, err := strconv.Atoi(blues[0])
	if err != nil {
		http.Error(w, "Blue is not an integer", http.StatusInternalServerError)
		return
	}

	if red < 0 || red > 255 {
		http.Error(w, "Red is not in range 0-255", http.StatusInternalServerError)
		return
	}
	if green < 0 || green > 255 {
		http.Error(w, "Green is not in range 0-255", http.StatusInternalServerError)
		return
	}
	if blue < 0 || blue > 255 {
		http.Error(w, "Blue is not in range 0-255", http.StatusInternalServerError)
		return
	}

	log.Println("Setting to ", red, green, blue)
	strip.SetBgColor(types.Color{byte(red), byte(green), byte(blue)})
	strip.Gradient()
}
