package main

import (
	"fmt"
	"net/http"
	"log"
)

var BASE string


func turnOn() error {
	resp, err := http.Post(
		BASE + "/turnOn", 
		"application/x-www-form-urlencoded",
		nil,
	)
	if (err != nil) {
		return err
	}
	if (resp.StatusCode != 201) {
		return fmt.Errorf("didn't get 201 at turnOn(), got %d instread", resp.StatusCode)
	}
	log.Println("turnOn() succeeded")
	return nil
}

func turnOff() error {
	resp, err := http.Post(
		BASE + "/turnOff", 
		"application/x-www-form-urlencoded",
		nil,
	)
	if (err != nil) {
		return err
	}
	if (resp.StatusCode != 201) {
		return fmt.Errorf("didn't get 201 at turnOff(), got %d instread", resp.StatusCode)
	}
	log.Println("turnOff() succeeded")
	return nil
}

func setLed(r, g, b, n int) error {
	resp, err := http.Post(
		fmt.Sprintf("%s/setLed?r=%d&g=%d&b=%d&n=%d", BASE, r, g, b, n), 
		"application/x-www-form-urlencoded",
		nil,
	)
	if (err != nil) {
		return err
	}
	if (resp.StatusCode != 201) {
		return fmt.Errorf("didn't get 201 at setLed(), got %d instread", resp.StatusCode)
	}
	log.Printf("setLed(r=%d, g=%d, b=%d, n=%d) succeeded\n", r, g, b, n)
	return nil
}

func clearLed(n int) error {
	resp, err := http.Post(
		fmt.Sprintf("%s/clearLed?n=%d", BASE, n), 
		"application/x-www-form-urlencoded",
		nil,
	)
	if (err != nil) {
		return err
	}
	if (resp.StatusCode != 201) {
		return fmt.Errorf("didn't get 201 at clearLed(), got %d instread", resp.StatusCode)
	}
	log.Printf("clearLed(n=%d) succeeded\n", n)
	return nil
}

// setBgColor sets the background color of the strip
func setBgColor(r, g, b int) error {
	resp, err := http.Post(
		fmt.Sprintf("%s/setBgColor?r=%d&g=%d&b=%d", BASE, r, g, b), 
		"application/x-www-form-urlencoded",
		nil,
	)
	if (err != nil) {
		return err
	}
	if (resp.StatusCode != 201) {
		return fmt.Errorf("didn't get 201 at setBgColor(), got %d instread", resp.StatusCode)
	}
	log.Printf("setBgColor(r=%d, g=%d, b=%d) succeeded\n", r, g, b)
	return nil
}

func setRange(r, g, b, nStart, nEnd int) error {
	resp, err := http.Post(
		fmt.Sprintf("%s/setRange?r=%d&g=%d&b=%d&ns=%d&ne=%d", BASE, r, g, b, nStart, nEnd), 
		"application/x-www-form-urlencoded",
		nil,
	)
	if (err != nil) {
		return err
	}
	if (resp.StatusCode != 201) {
		return fmt.Errorf("didn't get 201 at setRange(), got %d instread", resp.StatusCode)
	}
	log.Printf("setRange(r=%d, g=%d, b=%d, nStart=%d, nEnd=%d) succeeded\n", r, g, b, nStart, nEnd)
	return nil
}

func clearRange(nStart, nEnd int) error {
	resp, err := http.Post(
		fmt.Sprintf("%s/setRange?ns=%d&ne=%d", BASE, nStart, nEnd), 
		"application/x-www-form-urlencoded",
		nil,
	)
	if (err != nil) {
		return err
	}
	if (resp.StatusCode != 201) {
		return fmt.Errorf("didn't get 201 at clearRange(), got %d instread", resp.StatusCode)
	}
	log.Printf("clearRange(nStart=%d, nEnd=%d) succeeded\n", nStart, nEnd)
	return nil
}