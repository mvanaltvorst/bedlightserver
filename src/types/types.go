package types

type Color struct {
	R byte `json:"r"`
	G byte `json:"g"`
	B byte `json:"b"`
}

type Range struct {
	NStart int
	NEnd   int
}
