package cache

import (
	"fmt"
	"io/ioutil"
	"net/http"
	"regexp"
)

type mkwGameData struct {
	Worldwides   int `json:"worldwides"`
	Continentals int `json:"continentals"`
	Privates     int `json:"privates"`
	Players      int `json:"players"`
}

type mkw struct {
	FullName string      `json:"fullName"`
	Data     mkwGameData `json:"data"`
}

type loginData struct {
	ThirtyMinutes   int `json:"thirty_minutes"`
	FourHours       int `json:"four_hours"`
	TwentyfourHours int `json:"twentyfour_hours"`
}

type gameData struct {
	TotalProfiles int       `json:"totalProfiles"`
	Online        int       `json:"online"`
	Logins        loginData `json:"logins"`
}

type game struct {
	FullName string   `json:"fullName"`
	Data     gameData `json:"data"`
}

// Cache holds cached data
type Cache struct {
	LastCheck string `json:"lastCheck"`
	Mkw       mkw    `json:"mkw"`
	Games     []game `json:"games"`
}

var roomTypeRegex = regexp.MustCompile(`(Private|Continental|Worldwide) room`)

// Update function fetches new data from origin API and updates internal cache
func (c *Cache) Update() {
	resp, err := http.Get("https://wiimmfi.de/mkw")
	if err != nil {
		fmt.Printf("error while requesting wiimmfi.de/mkw: %v", err)
		return
	}
	defer resp.Body.Close()
	bytes, err := ioutil.ReadAll(resp.Body)
	if err != nil {
		fmt.Printf("error while reading body: %v", err)
		return
	}
	bodyStr := string(bytes)
	roomTypes := roomTypeRegex.FindAllStringSubmatch(bodyStr, -1)
	for _, el := range roomTypes {
		switch el[1] {
		case "Worldwide":
			c.Mkw.Data.Worldwides++
		case "Private":
			c.Mkw.Data.Privates++
		case "Continental":
			c.Mkw.Data.Continentals++
		}
	}
	
}
