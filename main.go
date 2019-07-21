package main

import (
	"os"
	"log"
	"time"
)


func main() {
	BASE = "http://" + os.Getenv("ESP8266IP")
	err := setBgColor(5, 5, 5)
	if (err != nil) {
		log.Panic(err)
	}
	err = setRange(50, 0, 0, 1, 148)
	if (err != nil) {
		log.Panic(err)
	}
	err = turnOn()
	if (err != nil) {
		log.Panic(err)
	}
	time.Sleep(5 * time.Second)
	err = clearRange(1, 148)
	if (err != nil) {
		log.Panic(err)
	}
	err = setLed(50, 0, 0, 0)
	if (err != nil) {
		log.Panic(err)
	}
}
