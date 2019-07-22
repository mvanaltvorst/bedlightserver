package widgets

import (
	"bufio"
	"fmt"
	"log"
	"math"
	"net/http"
	"strconv"
	"strings"

	"github.com/mvanaltvorst/bedlightserver/types"
)

var (
	COLOR_RAIN   = types.Color{0, 179, 255}
	COLOR_CLOUDY = types.Color{75, 0, 130}
	COLOR_SUNNY  = types.Color{255, 255, 0}
)

func GetWeatherColor() (types.Color, error) {
	resp, err := http.Get("https://gpsgadget.buienradar.nl/data/raintext/?lat=52.26&lon=5.23")
	if err != nil {
		return types.Color{}, err
	}
	defer resp.Body.Close()

	accRain := 0.0

	if resp.StatusCode == 200 {
		scanner := bufio.NewScanner(resp.Body)
		for scanner.Scan() {
			rainStrs := strings.Split(scanner.Text(), "|")
			// if err != nil {
			// 	return types.Color{}, err
			// }
			rain, err := strconv.Atoi(rainStrs[0])
			if err != nil {
				return types.Color{}, err
			}
			accRain += math.Pow(10, float64(rain-109)/32)
		}

		log.Println("accumulated rain: ", accRain)
		if accRain > 0.1 {
			return COLOR_RAIN, nil
		} else {
			return COLOR_SUNNY, nil
		}
	} else {
		return types.Color{}, fmt.Errorf("Didn't get status ok: %d", resp.StatusCode)
	}
}

type WeatherWidget struct {
	rng types.Range
	c   chan LightMessage
	// lastChecked time.
}

func NewWeatherWidget(c chan LightMessage, rng types.Range) *WeatherWidget {
	w := new(WeatherWidget)
	w.rng = rng
	w.c = c
	return w
}

func (w *WeatherWidget) Update() {
	log.Println("Updating weather...")
	weatherColor, err := GetWeatherColor()
	if err != nil {
		log.Panic(err)
	}
	w.c <- LightMessage{weatherColor, w.rng, false, false}
}
