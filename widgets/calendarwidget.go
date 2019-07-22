package widgets

import (
	"log"

	"time"

	"github.com/mvanaltvorst/bedlightserver/types"
)

var (
	COLOR_CUR_TIME = types.Color{255, 0, 0}
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
	if rng.NEnd-rng.NStart+1 != 96 {
		log.Panic("Calendar range size isn't 96")
	}
	return w
}

func (w *CalendarWidget) Update() {
	log.Println("Updating calendar...")
	w.c <- LightMessage{types.Color{}, w.rng, true, false} // clear

	// 96 lights, every light = 15 minutes
	currentTime := time.Now()
	lightOffset := currentTime.Hour()*4 + currentTime.Minute()/15
	log.Println("Current time light offset: ", lightOffset)

	var currentTimeLight int
	if w.increasingTime {
		currentTimeLight = w.rng.NStart + lightOffset
	} else {
		currentTimeLight = w.rng.NEnd - lightOffset
	}

	// draw calendar events

	w.c <- LightMessage{COLOR_CUR_TIME, types.Range{currentTimeLight, currentTimeLight}, false, false}
}
