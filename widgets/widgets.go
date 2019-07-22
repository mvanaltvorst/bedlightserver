package widgets

import (
	"github.com/mvanaltvorst/bedlightserver/types"
)

type Widget interface {
	Update()
}

type LightMessage struct {
	Color  types.Color
	Rng    types.Range
	Clear  bool
	Smooth bool
}
