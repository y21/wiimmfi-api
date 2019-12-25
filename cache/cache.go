package cache

import (
	"fmt"
	"io/ioutil"
	"net/http"
	"regexp"
	"strconv"
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

// GameData represents data for a game
type GameData struct {
	TotalProfiles int `json:"totalProfiles"`
	Online        int `json:"online"`
	Logins        int `json:"logins"`
}

// Game represents a game
type Game struct {
	Data GameData `json:"data"`
}

// Cache holds cached data
type Cache struct {
	LastCheck string          `json:"lastCheck"`
	Mkw       Mkw             `json:"mkw"`
	Games     map[string]Game `json:"games"`
}

var (
	roomTypeRegex  = regexp.MustCompile(`(Private|Continental|Worldwide) room`)
	regionRegex    = regexp.MustCompile(`(CTGP|Eur/2|Jap/0|Ame/1)`)
	gameStatsRegex = regexp.MustCompile(`<tr class="tr\d+"><td title="[^"]+">(\w+).+\s+.+> *(\d+(?: k)?|—) *<.+> *(\d+(?: k)?|—) *<.+> *(\d+(?: k)?|—) *<`)

	allowedIDs = []string{
		"ADME",
	}
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
	gameStatsResp, err := http.Get("https://wiimmfi.de/stat?m=28")
	if err != nil {
		fmt.Println(err)
		return
	}
	defer gameStatsResp.Body.Close()
	gameStatsBytes, err := ioutil.ReadAll(gameStatsResp.Body)
	if err != nil {
		fmt.Println(err)
		return
	}
	gameStatsBody := string(gameStatsBytes)
	// Game stats
	gameStatsMatches := gameStatsRegex.FindAllStringSubmatch(gameStatsBody, -1)
	//gameStatsMatches := gameStatsRegex.FindAllStringSubmatch(test, -1)
	for _, el := range gameStatsMatches {
		var profiles, online, logins int
		if el[2] == "—" {
			profiles = 0
		} else {
			_profiles, err := strconv.Atoi(el[2])
			profiles = _profiles
			if err != nil {
				fmt.Println(err)
			}
		}
		if el[3] == "—" {
			online = 0
		} else {
			_online, err := strconv.Atoi(el[3])
			online = _online
			if err != nil {
				fmt.Println(err)
			}
		}
		if el[4] == "—" {
			logins = 0
		} else {
			_logins, err := strconv.Atoi(el[4])
			logins = _logins
			if err != nil {
				fmt.Println(err)
			}
		}
		c.Games[el[1]] = Game{
			Data: GameData{
				Logins:        logins,
				Online:        online,
				TotalProfiles: profiles,
			},
		}
		fmt.Println(profiles, online, logins)
	}
}
