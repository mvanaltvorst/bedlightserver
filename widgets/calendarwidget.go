package widgets

import (
	"log"

	"time"

	"github.com/mvanaltvorst/bedlightserver/types"
)

var (
	COLOR_CUR_TIME = types.Color{0, 0, 255}
)

type CalendarWidget struct {
	rng            types.Range
	increasingTime bool
	c              chan LightMessage
}

func NewCalendarWidget(c chan LightMessage, rng types.Range, increasingTime bool) *CalendarWidget {
	// increasingTime: true => time goes from small to large led indices
	w := new(CalendarWidget)
	w.rng = rng
	w.c = c
	w.increasingTime = increasingTime
	if rng.NEnd-rng.NStart+1 != 52 {
		// log.Println(rng.NEnd - rng.NStart + 1)
		log.Panic("Calendar range size isn't 52")
	}
	return w
}

func (w *CalendarWidget) Update() {
	log.Println("Updating calendar...")
	w.c <- LightMessage{types.Color{}, w.rng, true, false} // clear

	// 48 lights, every light = 30 minutes + 2 buffer lights
	currentTime := time.Now()
	lightOffset := currentTime.Hour()*2 + currentTime.Minute()/30
	log.Println("Current time light offset: ", lightOffset)

	var currentTimeLight int
	if w.increasingTime {
		currentTimeLight = w.rng.NStart + lightOffset + 2
	} else {
		currentTimeLight = w.rng.NEnd - lightOffset - 2
	}

	// draw calendar events

	w.c <- LightMessage{COLOR_CUR_TIME, types.Range{currentTimeLight - 2, currentTimeLight + 2}, false, false}
}
