package main

import (
	"log"
	"os"
	"time"

	"github.com/mvanaltvorst/bedlightserver/alarms"
	"github.com/mvanaltvorst/bedlightserver/ledstrip"
	"github.com/mvanaltvorst/bedlightserver/types"
	"github.com/mvanaltvorst/bedlightserver/widgets"
)

const NUM_LEDS = 91

const (
	CLEARLIGHT       = iota
	INTERACTIVELIGHT = iota
)

var turnedOn bool

var globalState int
var c = make(chan widgets.LightMessage)
var d = make(chan alarms.Alarm)
var strip *ledstrip.Strip

var widgetsList = []widgets.Widget{
	widgets.NewWeatherWidget(c, types.Range{70, 90}),
	widgets.NewCalendarWidget(c, types.Range{18, 69}, false),
	widgets.NewStockWidget(c, types.Range{0, 17}, "GOOG", false),
}

func watchLightMessage() {
	var err error
	for lm := range c {
		// We try to push a request through 3 times maximum, then we panic()
		if lm.Clear {
			nTries := 0
			for {
				err = strip.ClearRange(lm.Rng)
				if err != nil {
					log.Println(err)
					nTries++
					if nTries == 3 {
						log.Fatal("Tried 3 times, still got error")
					}
				} else {
					break
				}
			}
		} else {
			nTries := 0
			for {
				err = strip.SetRange(lm.Color, lm.Rng)
				if err != nil {
					log.Println(err)
					nTries++
					if nTries == 3 {
						log.Fatal("Tried 3 times, still got error")
					}
				} else {
					break
				}
			}
		}
	}
}

func watchAlarms() {
	for alarm := range d {
		log.Println("Executing alarm...")
		strip.SetBgColor(alarm.Color)
		if alarm.Interactive {
			log.Println("Doing interactive update")
			updateStripInteractive()
			globalState = INTERACTIVELIGHT
		} else {
			log.Println("Doing non-interactive update")
			strip.ClearRange(types.Range{0, NUM_LEDS - 1})
			strip.Gradient()
			globalState = CLEARLIGHT
		}
	}
}

func updateStripInteractive() {
	for _, widget := range widgetsList {
		widget.Update()
	}
	time.Sleep(10 * time.Millisecond) // TODO: use waitgroup
	if turnedOn && globalState == INTERACTIVELIGHT {
		nTries := 0
		for {
			err := strip.Gradient()
			if err != nil {
				log.Println(err)
				nTries++
				if nTries == 3 {
					log.Fatal("Tried 3 times, still got error")
				}
			} else {
				break
			}
		}
	}
}

func main() {
	turnedOn = true
	globalState = INTERACTIVELIGHT
	esp8266ip := os.Getenv("ESP8266IP")
	if esp8266ip == "" {
		log.Fatal("Didn't get ESP8266 IP")
	}
	strip = ledstrip.NewStrip(esp8266ip)

	d = make(chan alarms.Alarm)
	alarmManager := alarms.NewAlarmManager(d)

	go webserverManager(&alarmManager)

	strip.SetBgColor(types.Color{255, 147, 41}) // warm white, default
	strip.SetRange(types.Color{0, 0, 0}, types.Range{0, NUM_LEDS - 1})
	strip.TurnOn()

	go watchLightMessage()
	go watchAlarms()
	go alarmManager.Watch()

	for {
		if !alarmManager.HasAlarm(time.Now()) {
			updateStripInteractive()
		}
		t := time.Now()
		roundedMinute := ((t.Minute() + 1) / 15) * 15
		nextTick := time.Date(t.Year(), t.Month(), t.Day(), t.Hour(), roundedMinute, 0, 0, t.Location())
		nextTick = nextTick.Add(15 * time.Minute)

		toWait := nextTick.Sub(t)
		log.Println("Sleeping for ", toWait)
		time.Sleep(toWait)
	}
}
