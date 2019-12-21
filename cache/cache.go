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

type mkwRegionData struct {
	CTGP int `json:"ctgp"`
	Ame  int `json:"ame"`
	Jap  int `json:"jap"`
	Eur  int `json:"eur"`
}

type mkw struct {
	FullName string `json:"fullName"`
	Data     struct {
		Rooms   mkwGameData   `json:"rooms`
		Regions mkwRegionData `json:"regions"`
	} `json:"data"`
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

var (
	roomTypeRegex = regexp.MustCompile(`(Private|Continental|Worldwide) room`)
	regionRegex   = regexp.MustCompile(`(CTGP|Eur/2|Jap/0|Ame/1)`)
)

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
	// Room types
	roomTypes := roomTypeRegex.FindAllStringSubmatch(bodyStr, -1)
	for _, el := range roomTypes {
		switch el[1] {
		case "Worldwide":
			c.Mkw.Data.Rooms.Worldwides++
		case "Private":
			c.Mkw.Data.Rooms.Privates++
		case "Continental":
			c.Mkw.Data.Rooms.Continentals++
		}
	}
	// Regions
	regions := regionRegex.FindAllString(bodyStr, -1)
	for _, el := range regions {
		switch el {
		case "CTGP":
			c.Mkw.Data.Regions.CTGP++
		case "Eur/2":
			c.Mkw.Data.Regions.Eur++
		case "Jap/0":
			c.Mkw.Data.Regions.Jap++
		case "Ame/1":
			c.Mkw.Data.Regions.Ame++ 
		}
	}
	
}
