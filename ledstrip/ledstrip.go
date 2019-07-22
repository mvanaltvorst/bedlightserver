package ledstrip

import (
	"fmt"
	"log"
	"net/http"

	"github.com/mvanaltvorst/bedlightserver/types"
)

type Strip struct {
	httpbase string
}

func NewStrip(ipaddr string) *Strip {
	s := new(Strip)
	s.httpbase = "http://" + ipaddr
	return s
}

func (s *Strip) TurnOn() error {
	resp, err := http.Post(
		s.httpbase+"/turnOn",
		"application/x-www-form-urlencoded",
		nil,
	)
	if err != nil {
		return err
	}
	if resp.StatusCode != 201 {
		return fmt.Errorf("didn't get 201 at turnOn(), got %d instread", resp.StatusCode)
	}
	log.Println("turnOn() succeeded")
	return nil
}

func (s *Strip) TurnOff() error {
	resp, err := http.Post(
		s.httpbase+"/turnOff",
		"application/x-www-form-urlencoded",
		nil,
	)
	if err != nil {
		return err
	}
	if resp.StatusCode != 201 {
		return fmt.Errorf("didn't get 201 at turnOff(), got %d instread", resp.StatusCode)
	}
	log.Println("turnOff() succeeded")
	return nil
}

func (s *Strip) Flush() error {
	resp, err := http.Post(
		s.httpbase+"/flush",
		"application/x-www-form-urlencoded",
		nil,
	)
	if err != nil {
		return err
	}
	if resp.StatusCode != 201 {
		return fmt.Errorf("didn't get 201 at Flush(), got %d instread", resp.StatusCode)
	}
	log.Println("Flush() succeeded")
	return nil
}

func (s *Strip) Gradient() error {
	resp, err := http.Post(
		s.httpbase+"/gradient",
		"application/x-www-form-urlencoded",
		nil,
	)
	if err != nil {
		return err
	}
	if resp.StatusCode != 201 {
		return fmt.Errorf("didn't get 201 at Gradient(), got %d instread", resp.StatusCode)
	}
	log.Println("Gradient() succeeded")
	return nil
}

func (s *Strip) SetLed(color types.Color, n int) error {
	resp, err := http.Post(
		fmt.Sprintf("%s/setLed?r=%d&g=%d&b=%d&n=%d", s.httpbase, color.R, color.G, color.B, n),
		"application/x-www-form-urlencoded",
		nil,
	)
	if err != nil {
		return err
	}
	if resp.StatusCode != 201 {
		return fmt.Errorf("didn't get 201 at setLed(), got %d instread", resp.StatusCode)
	}
	log.Printf("setLed(r=%d, g=%d, b=%d, n=%d) succeeded\n", color.R, color.G, color.B, n)
	return nil
}

func (s *Strip) ClearLed(n int) error {
	resp, err := http.Post(
		fmt.Sprintf("%s/clearLed?n=%d", s.httpbase, n),
		"application/x-www-form-urlencoded",
		nil,
	)
	if err != nil {
		return err
	}
	if resp.StatusCode != 201 {
		return fmt.Errorf("didn't get 201 at clearLed(), got %d instread", resp.StatusCode)
	}
	log.Printf("clearLed(n=%d) succeeded\n", n)
	return nil
}

// setBgColor sets the background color of the strip
func (s *Strip) SetBgColor(color types.Color) error {
	resp, err := http.Post(
		fmt.Sprintf("%s/setBgColor?r=%d&g=%d&b=%d", s.httpbase, color.R, color.G, color.B),
		"application/x-www-form-urlencoded",
		nil,
	)
	if err != nil {
		return err
	}
	if resp.StatusCode != 201 {
		return fmt.Errorf("didn't get 201 at setBgColor(), got %d instread", resp.StatusCode)
	}
	log.Printf("setBgColor(r=%d, g=%d, b=%d) succeeded\n", color.R, color.G, color.B)
	return nil
}

func (s *Strip) SetRange(color types.Color, rng types.Range) error {
	resp, err := http.Post(
		fmt.Sprintf("%s/setRange?r=%d&g=%d&b=%d&ns=%d&ne=%d", s.httpbase, color.R, color.G, color.B, rng.NStart, rng.NEnd),
		"application/x-www-form-urlencoded",
		nil,
	)
	if err != nil {
		return err
	}
	if resp.StatusCode != 201 {
		return fmt.Errorf("didn't get 201 at setRange(), got %d instread", resp.StatusCode)
	}
	log.Printf("setRange(r=%d, g=%d, b=%d, nStart=%d, nEnd=%d) succeeded\n", color.R, color.G, color.B, rng.NStart, rng.NEnd)
	return nil
}

func (s *Strip) ClearRange(rng types.Range) error {
	resp, err := http.Post(
		fmt.Sprintf("%s/clearRange?ns=%d&ne=%d", s.httpbase, rng.NStart, rng.NEnd),
		"application/x-www-form-urlencoded",
		nil,
	)
	if err != nil {
		return err
	}
	if resp.StatusCode != 201 {
		return fmt.Errorf("didn't get 201 at clearRange(), got %d instread", resp.StatusCode)
	}
	log.Printf("clearRange(nStart=%d, nEnd=%d) succeeded\n", rng.NStart, rng.NEnd)
	return nil
}
