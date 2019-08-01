package widgets

import (
	"log"
	"github.com/mvanaltvorst/bedlightserver/types"
)

type DummyWidget struct {
	rng   types.Range
	c     chan LightMessage
}

func NewDummyWidget(c chan LightMessage, rng types.Range) *DummyWidget {
	d := new(DummyWidget)
	d.rng = rng
	d.c = c
	return d
}

func (d *DummyWidget) Update() {
	log.Println("Updating dummy widget")
	d.c <- LightMessage{types.Color{255, 0, 0}, d.rng, false}
}
