package main

import (
	"html/template"
	"log"
	"net/http"
	"strconv"

	"github.com/mvanaltvorst/bedlightserver/types"
)

var templates = template.Must(template.ParseFiles("index.html"))

func webserverManager() {
	http.HandleFunc("/", indexHandler)
	http.HandleFunc("/turnOn", turnOnHandler)
	http.HandleFunc("/turnOff", turnOffHandler)
	http.HandleFunc("/readingLight", readingLightHandler)
	http.HandleFunc("/interactiveLight", interactiveLightHandler)
	http.HandleFunc("/bgColor", bgColorHandler)

	log.Fatal(http.ListenAndServe("0.0.0.0:8080", nil))
}

func turnOffHandler(w http.ResponseWriter, r *http.Request) {
	log.Println("Turning on")
	turnedOn = false
	strip.TurnOff()
}

func turnOnHandler(w http.ResponseWriter, r *http.Request) {
	log.Println("Turning off")
	turnedOn = true
	strip.TurnOn()
	updateStripInteractive()
	if globalState == CLEARLIGHT {
		strip.ClearRange(types.Range{0, NUM_LEDS - 1})
		strip.Flush()
	}
}

func readingLightHandler(w http.ResponseWriter, r *http.Request) {
	log.Println("Reading light")
	globalState = CLEARLIGHT
	strip.ClearRange(types.Range{0, NUM_LEDS - 1})
	strip.Flush()
}

func interactiveLightHandler(w http.ResponseWriter, r *http.Request) {
	log.Println("Interactive light")
	globalState = INTERACTIVELIGHT
	updateStripInteractive()
}

func indexHandler(w http.ResponseWriter, r *http.Request) {
	log.Println("Got index hit")
	err := templates.ExecuteTemplate(w, "index.html", nil)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
}

func bgColorHandler(w http.ResponseWriter, r *http.Request) {
	log.Println("Setting bg color")

	reds, ok := r.URL.Query()["r"]
	if !ok || len(reds[0]) < 1 {
		http.Error(w, "Didn't get red param", http.StatusInternalServerError)
		return
	}
	greens, ok := r.URL.Query()["g"]
	if !ok || len(greens[0]) < 1 {
		http.Error(w, "Didn't get green param", http.StatusInternalServerError)
		return
	}
	blues, ok := r.URL.Query()["b"]
	if !ok || len(blues[0]) < 1 {
		http.Error(w, "Didn't get blue param", http.StatusInternalServerError)
		return
	}

	red, err := strconv.Atoi(reds[0])
	if err != nil {
		http.Error(w, "Red is not an integer", http.StatusInternalServerError)
		return
	}
	green, err := strconv.Atoi(greens[0])
	if err != nil {
		http.Error(w, "Green is not an integer", http.StatusInternalServerError)
		return
	}
	blue, err := strconv.Atoi(blues[0])
	if err != nil {
		http.Error(w, "Blue is not an integer", http.StatusInternalServerError)
		return
	}

	if red < 0 || red > 255 {
		http.Error(w, "Red is not in range 0-255", http.StatusInternalServerError)
		return
	}
	if green < 0 || green > 255 {
		http.Error(w, "Green is not in range 0-255", http.StatusInternalServerError)
		return
	}
	if blue < 0 || blue > 255 {
		http.Error(w, "Blue is not in range 0-255", http.StatusInternalServerError)
		return
	}

	log.Println("Setting to ", red, green, blue)
	strip.SetBgColor(types.Color{byte(red), byte(green), byte(blue)})
	strip.Gradient()
}
