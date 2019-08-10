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
	// increasingTime == true  --> time goes from small to large led indices
	// increasingTime == false --> time goes from large to small led indices
	w := new(CalendarWidget)
	w.rng = rng
	w.c = c
	w.increasingTime = increasingTime
	if rng.NEnd-rng.NStart+1 != 52 {
		// 52 lights: 48 lights for every hour + 2 buffer lights on either side
		log.Panic("Calendar range size isn't 52")
	}
	return w
}

func (w *CalendarWidget) Update() {
	log.Println("Updating calendar...")
	w.c <- LightMessage{types.Color{}, w.rng, true} // clear

	currentTime := time.Now()
	lightOffset := currentTime.Hour()*2 + currentTime.Minute()/30
	log.Println("Current time light offset: ", lightOffset)

	var currentTimeLight int
	if w.increasingTime {
		currentTimeLight = w.rng.NStart + lightOffset + 2
	} else {
		currentTimeLight = w.rng.NEnd - lightOffset - 2
	}

	//TODO: draw calendar events

	w.c <- LightMessage{COLOR_CUR_TIME, types.Range{currentTimeLight - 2, currentTimeLight + 2}, false}
}
