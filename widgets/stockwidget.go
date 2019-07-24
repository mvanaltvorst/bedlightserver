package widgets

import (
	"log"

	"github.com/mvanaltvorst/bedlightserver/types"
	"github.com/piquette/finance-go/crypto"
	"github.com/piquette/finance-go/quote"
)

var (
	COLOR_UP   = types.Color{0, 255, 0}
	COLOR_DOWN = types.Color{255, 0, 0}
)

type StockWidget struct {
	rng    types.Range
	c      chan LightMessage
	symbol string
	crypto bool
}

func NewStockWidget(c chan LightMessage, rng types.Range, symbol string, crypto bool) *StockWidget {
	w := new(StockWidget)
	w.rng = rng
	w.c = c
	w.symbol = symbol
	w.crypto = crypto
	return w
}

func (w *StockWidget) Update() {
	log.Println("Updating stocks...")
	var marketChange float64
	if w.crypto {
		q, err := crypto.Get(w.symbol)
		if err != nil {
			log.Panic(err)
		}
		marketChange = q.RegularMarketChangePercent
	} else {
		q, err := quote.Get(w.symbol)
		if err != nil {
			log.Panic(err)
		}
		marketChange = q.RegularMarketChangePercent
	}
	log.Println(w.symbol, ": ", marketChange)
	if marketChange > 0 {
		w.c <- LightMessage{COLOR_UP, w.rng, false, false}
	} else {
		w.c <- LightMessage{COLOR_DOWN, w.rng, false, false}
	}
}
