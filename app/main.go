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
		if lm.Lit {
			err = strip.SetRange(lm.Color, lm.Rng)
			if err != nil {
				log.Panic(err)
			}
			// strip.SetLed(types.Color{lm.Color.R/2 + 5, lm.Color.G/2 + 5, lm.Color.B/2 + 5}, lm.Rng.NStart)
			// strip.SetLed(types.Color{lm.Color.R/30 + 5, lm.Color.G/30 + 5, lm.Color.B/30 + 5}, lm.Rng.NEnd)
		} else {
			err = strip.ClearRange(lm.Rng)
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

	strip.ClearRange(types.Range{0, 149})
	strip.SetBgColor(types.Color{10, 10, 10})
	strip.TurnOn()

	c := make(chan widgets.LightMessage)
	go watch(strip, c)

	widgets := []widgets.Widget{
		widgets.NewWeatherWidget(c, types.Range{2, 10}),
		widgets.NewStockWidget(c, types.Range{0, 2}, "ETH-USD", true),
		widgets.NewStockWidget(c, types.Range{12, 16}, "BTC-USD", true),
		widgets.NewStockWidget(c, types.Range{20, 25}, "TSLA", false),
	}

	for {
		for _, widget := range widgets {
			widget.Update()
		}
		time.Sleep(300 * time.Second)
	}
}
