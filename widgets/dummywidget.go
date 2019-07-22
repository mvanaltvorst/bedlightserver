package widgets

import (
	"log"

	"github.com/mvanaltvorst/bedlightserver/types"
)

type DummyWidget struct {
	lit   bool
	color types.Color
	rng   types.Range
	c     chan LightMessage
}

func NewDummyWidget(c chan LightMessage, color types.Color, rng types.Range) *DummyWidget {
	d := new(DummyWidget)
	d.color = color
	d.rng = rng
	d.lit = false
	d.c = c
	return d
}

func (d *DummyWidget) Update() {
	if d.lit {
		return
	}
	d.c <- LightMessage{d.color, d.rng, false, false}
	log.Println("Sending light message")
	d.lit = true
}
