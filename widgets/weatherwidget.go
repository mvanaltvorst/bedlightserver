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
	"errors"
	"io/ioutil"
)

var (
	COLOR_RAIN   = types.Color{0, 179, 255}
	COLOR_CLOUDY = types.Color{75, 0, 130}
	COLOR_SUNNY  = types.Color{253, 184, 19}
	// COLOR_SUNNY = types.Color{0, 179, 255}
	COLOR_ERROR_WEATHER = types.Color{255, 0, 0}
)

func GetWeatherColor(latitude, longitude string) (types.Color, error) {
	resp, err := http.Get(fmt.Sprintf("https://gpsgadget.buienradar.nl/data/raintext/?lat=%s&lon=%s", latitude, longitude))
	if err != nil {
		return types.Color{}, err
	}
	defer resp.Body.Close()

	accRain := 0.0

	if resp.StatusCode == 200 {
		scanner := bufio.NewScanner(resp.Body)
		for scanner.Scan() {
			rainStrs := strings.Split(scanner.Text(), "|")
			if len(rainStrs) == 0 {
				return types.Color{}, errors.New("Got invalid rain response")
			}
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
	latitude string
	longitude string
}

func NewWeatherWidget(c chan LightMessage, rng types.Range) *WeatherWidget {
	w := new(WeatherWidget)
	w.rng = rng
	w.c = c
	binarycoords, err := ioutil.ReadFile("/run/secrets/weather_coordinates") 
	if err != nil {
		log.Fatal("Couldn't read docker secret", err)
	}
	coords := strings.Split(string(binarycoords), ":")
	if len(coords) != 2 {
		log.Fatal("Didn't get valid coordinates configuration file, be sure to use LATITUDE:LONGITUDE in the `coordinates` file")
	}
	w.latitude = coords[0]
	w.longitude = coords[1]
	return w
}

func (w *WeatherWidget) Update() {
	log.Println("Updating weather...")
	weatherColor, err := GetWeatherColor(w.latitude, w.longitude)
	if err != nil {
		log.Println(err)
		w.c <- LightMessage{COLOR_ERROR_WEATHER, w.rng, false}
	} else {
		w.c <- LightMessage{weatherColor, w.rng, false}
	}
}
