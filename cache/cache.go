package cache

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

// Update function fetches new data from origin API and updates internal cache
func (cache *Cache) Update() {

}
