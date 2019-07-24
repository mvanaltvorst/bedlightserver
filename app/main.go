package main

import (
	"log"
	"os"
	"time"

	"github.com/mvanaltvorst/bedlightserver/ledstrip"
	"github.com/mvanaltvorst/bedlightserver/types"
	"github.com/mvanaltvorst/bedlightserver/widgets"
)

func watch(strip *ledstrip.Strip, c chan widgets.LightMessage) {
	var err error
	for lm := range c {
		log.Println("Received message: ", lm)
		if lm.Clear {
			err = strip.ClearRange(lm.Rng)
			if err != nil {
				log.Panic(err)
			}
		} else {
			err = strip.SetRange(lm.Color, lm.Rng)
			if err != nil {
				log.Panic(err)
			}
		}
	}
}

func main() {
	if os.Getenv("ESP8266IP") == "" {
		log.Panic("Didn't get ESP8266 IP")
	}
	strip := ledstrip.NewStrip(os.Getenv("ESP8266IP"))

	// strip.SetBgColor(types.Color{255, 255, 255})
	strip.SetBgColor(types.Color{255, 147, 41})
	strip.ClearRange(types.Range{0, 149})
	strip.TurnOn()

	c := make(chan widgets.LightMessage)
	go watch(strip, c)

	widgets := []widgets.Widget{
		// widgets.NewStockWidget(c, types.Range{0, 15}, "ETH-USD", true),
		// widgets.NewStockWidget(c, types.Range{16, 30}, "BTC-USD", true),
		widgets.NewWeatherWidget(c, types.Range{70, 90}),
		widgets.NewStockWidget(c, types.Range{0, 17}, "GOOG", false),
		widgets.NewCalendarWidget(c, types.Range{18, 69}, false),
	}

	for {
		for _, widget := range widgets {
			widget.Update()
		}
		time.Sleep(10 * time.Millisecond) // TODO: use waitgroup
		strip.Gradient()

		t := time.Now()
		roundedMinute := ((t.Minute() + 1) / 15) * 15
		nextTick := time.Date(t.Year(), t.Month(), t.Day(), t.Hour(), roundedMinute, 0, 0, t.Location())
		nextTick = nextTick.Add(15 * time.Minute)

		toWait := nextTick.Sub(t)
		log.Println("Sleeping for ", toWait)
		time.Sleep(toWait)
	}
}
