package cache

import (
	"fmt"
	"io/ioutil"
	"net/http"
	"regexp"
)

// MkwGameData represents game data
type MkwGameData struct {
	Worldwides   int `json:"worldwides"`
	Continentals int `json:"continentals"`
	Privates     int `json:"privates"`
	Players      int `json:"players"`
}

// MkwRegionData represents regions
type MkwRegionData struct {
	CTGP int `json:"ctgp"`
	Ame  int `json:"ame"`
	Jap  int `json:"jap"`
	Eur  int `json:"eur"`
}

// Mkw represents game data for game MKW
type Mkw struct {
	FullName string `json:"fullName"`
	Data     struct {
		Rooms   MkwGameData   `json:"rooms"`
		Regions MkwRegionData `json:"regions"`
	} `json:"data"`
}

// LoginData represents login data for a game
type LoginData struct {
	ThirtyMinutes   int `json:"thirty_minutes"`
	FourHours       int `json:"four_hours"`
	TwentyfourHours int `json:"twentyfour_hours"`
}

// GameData represents data for a game
type GameData struct {
	TotalProfiles int       `json:"totalProfiles"`
	Online        int       `json:"online"`
	Logins        LoginData `json:"logins"`
}

// Game represents a game
type Game struct {
	FullName string   `json:"fullName"`
	Data     GameData `json:"data"`
}

// Cache holds cached data
type Cache struct {
	LastCheck string `json:"lastCheck"`
	Mkw       Mkw    `json:"mkw"`
	Games     []Game `json:"games"`
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
